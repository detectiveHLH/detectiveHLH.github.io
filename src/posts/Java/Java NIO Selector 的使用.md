---
date: 2022-02-23
permalink: /posts/230850.html
category:
- Java
tag:
- Selector
- NIO
---

# Java NIO Selector 的使用

之前的文章已经把 Java 中 NIO 的 Buffer、Channel 讲解完了，不太了解的可以先回过头去看看。这篇文章我们就来聊聊 Selector —— 选择器。

首先 Selector 是用来干嘛的呢？不熟悉这个概念的话我们其实可以这么理解：

![selector](/images/230850/select-preview.jpeg)

把它当作 SQL 中的 `select` 语句，在 SQL 中无非就是筛选出符合条件的结果集合。而 NIO 中的 Selector 用途类似，只不过它选择出来的是**有就绪 IO 事件的 Channel**。

IO 事件代表了 Channel 对于不同的 IO 操作所处的不同的状态，而不是对 Channel 进行 IO 操作。总共有 4 种 IO 事件的定义：

- `OP_READ` 可读
- `OP_WRITE` 可写
- `OP_CONNECT` 连接
- `OP_ACCEPT` 接收

![IO 事件分类](/images/230850/io-event.jpeg)

比如 `OP_READ`，其就绪是指数据已经在内核态 Ready 了并且已经从内核态复制到了用户态的缓冲区，然后我们的应用程序就可以去读取数据了，这叫**可读**。

再比如 `OP_CONNECT`，当某个 Channel 已经完成了握手连接，则 Channel 就会处于 `OP_CONNECT` 的状态。

> 对用户态和内核态不了解的，可以去看看之前写的 [《用户态和内核态的区别》](https://mp.weixin.qq.com/s/OJRybC7uamkkizPcfPoC7w)

在之前讲 BIO 模型的时候说过，用户态在发起 read 系统调用之后会一直阻塞，直到数据在内核态 Ready 并且复制到用户态的缓冲区内。如果只有一个用户还好，随便你阻塞多久。但要是这时有其他用户发请求进来了，就会一直卡在这里等待。这样串行的处理会导致系统的效率极其低下。

针对这个问题，也是有解决方案的。那就是为每个用户都分配一个线程（即 **Connection Per Thread**），乍一想这个思路可能没问题，但使用线程需要消耗系统的资源，例如在 JVM 中一个线程会占用较多的资源，非常昂贵。系统稍微并发多一些（例如上千），你的系统就会直接 OOM 了。而且，线程频繁的创建、销毁、切换也是一个比较耗时的操作。

而如果用 NIO，虽然不会阻塞了，但是会一直轮询，让 CPU **空转**，也是一个**不环保**的方式。

而如果用 Selector，**只需要一个线程**来监听多个 Channel，而这个**多个**可以上千、上万甚至更多。那这些 Channel 是怎么跟 Selector 关联上的呢？

答案是通过**注册**，因为现在变成了 Selector 决定什么时候处理 Channel 中的事件，而注册操作则相当于将 Channel 的**控制权转交**给了 Selector。一旦注册上了，后续当 Channel 有就绪的 IO 事件，Selector 就会将它们*选择*出来执行对应的操作。

说了这么多，来看个例子吧，客户端的代码相对简单，后续再看，我们先看服务端的：

```java
public static void main(String[] args) throws IOException {
  // 创建 selector, 管理多个 channel
  Selector selector = Selector.open();

  // 创建 ServerSocketChannel 并且绑定端口
  ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
  serverSocketChannel.configureBlocking(false);
  serverSocketChannel.bind(new InetSocketAddress(8080));

  // 将 channel 注册到 selector 上
  SelectionKey serverSocketChannelKey = serverSocketChannel.register(selector, 0);
  // 由于总共有 4 种事件, 分别是 accept、connect、read 和 write,
  // 分别代表有连接请求时触发、客户端建立连接时触发、可读事件、可写事件
  // 我们可以使用 interestOps 来表明只处理有连接请求的事件
  serverSocketChannelKey.interestOps(SelectionKey.OP_ACCEPT);

  System.out.printf("serverSocketChannel %s\n", serverSocketChannelKey);
  while (true) {
    // 没有事件发生, 线程会阻塞; 有事件发生, 就会让线程继续执行
    System.out.println("start to select...");
    selector.select();
    // 换句话说, 有连接过来了, 就会继续往下走

    // 通过 selectedKeys 包含了所有发生的事件, 可能会包含 READ 或者 WRITE
    Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();
    while (iterator.hasNext()) {
      SelectionKey key = iterator.next();
      System.out.printf("selected key %s\n", key);

      // 这里需要进行事件区分
      if (key.isAcceptable()) {
        System.out.println("get acceptable event");

        // 触发此次事件的 channel, 拿到事件一定要处理, 否则会进入非阻塞模式, 空转占用 CPU
        // 例如你可以使用 key.cancel()
        ServerSocketChannel channel = (ServerSocketChannel) key.channel();
        SocketChannel socketChannel = channel.accept();
        socketChannel.configureBlocking(false);

        // 这个 socketChannel 也需要注册到 selector 上, 相当于把控制权交给 selector
        SelectionKey socketChannelKey = socketChannel.register(selector, 0);
        socketChannelKey.interestOps(SelectionKey.OP_READ);
        System.out.printf("get socketChannel %s\n", socketChannel);
      } else if (key.isReadable()) {
        System.out.println("get readable event");

        SocketChannel channel = (SocketChannel) key.channel();
        ByteBuffer buf = ByteBuffer.allocate(16);
        channel.read(buf);
        buf.flip();
        ByteBufferUtil.debugRead(buf);
        key.cancel();
      }
      
      iterator.remove();
    }
  }
}
```

看起来有点多，但相应的注释都写了，可以先看看。其实这里的很多代码跟之前的玩转 Channel 的代码差不多的，这里抽一些我认为值得讲的解释一下。

首先就是 `Selector.open()`，跟 Channel 的 open 方法类似，可以理解为创建一个 selector。

其次就是 `SelectionKey serverSocketChannelKey = serverSocketChannel.register(selector, 0);` 了，我们调用了 serverSocketChannel 的注册方法之后，返回了一个 SelectionKey，这是个什么概念呢？

> 说简单点，你可以把 SelectionKey 理解为你去商场寄存柜存东西，那个机器吐给你的**提取凭证**

换句话说，这个 SelectionKey 就是当前这个 serverSocketChannel 注册到 selector 上的**凭证**。selector 会维护一个 SelectionKey 的集合，用于统一管理。

![selectionkey 集合](/images/230850/selection-key-group.jpeg)



上图中的每个 Key 都代表了一个具体的 Channel。

而至于 register 的第二个参数，我们传入的是 0，代表了当前 Selector 需要关注这个 Channel 的哪些 IO 事件。0 代表**不关注任何事件**，我们这里是通过 `serverSocketChannelKey.interestOps(SelectionKey.OP_ACCEPT);` 来告诉 Selector，对这个 Channel 只关注 OP_ACCEPT 事件。

IO 事件有 4 个，如果你想要同时监听多个 IO 事件怎么办呢？答案是通过或运算符。

```java
serverSocketChannelKey.interestOps(SelectionKey.OP_ACCEPT | SelectionKey.OP_READ);
```

上面说过，NIO 虽然不阻塞，但会一直轮询占用 CPU 的资源，而 Selector 解决了这个问题。在调用完 `selector.select();` 之后，线程会在这里阻塞，而不会像 NIO 一样**疯狂轮询，把 CPU 拉满**。所以 Selector 只会在有事件处理的时候才执行，其余时间都会阻塞，极大的减少了 CPU 资源的占用。

当客户端调用 `connect` 发起连接之后，Channel 就会处于 `OP_CONNECT` 就绪状态，`selector.select();` 就不会再阻塞，会继续往下运行，即：

```java
Iterator<SelectionKey> iterator = selector.selectedKeys().iterator();
```

其中 selectedKeys 这个名字也能看出来，表示被选出来的 SelectionKey。上面我们已经讨论过 Selector 维护的一种集合 —— SelectionKey 集合，接下来我们再讨论另外一种集合 —— SelectedKey 集合。

![selectedkey 集合](/images/230850/server-socket-channel.jpeg)

当 Channel 有就绪 IO 事件之后，对应的 Key 就会被加入到 SelectedKey 集合中，然后这一次 While 循环会依次处理被选择出来的所有 Key。

但被选择出来的 Key 可能触发的是不同的 IO 事件，所以我们需要对 Key 进行区分。代码里区分了 OP_ACCEPT 和 OP_READ，分别讨论一下。

ServerSocketChannel 一开始 register 的时候只设定关注 OP_ACCEPT 事件，所以第一次循环只会进入 IsAcceptable 分支里，所以这里通过 `iterator.next()` 迭代器拿到的 SelectionKey 就是 serverSocketChannel 注册之后返回的 Key，同理拿到的 channel 的就是最开始调用 `ServerSocketChannel.open();` 创建的 channel。

拿到了 ServerSocketChannel 我们就可以调用其 `accept()` 方法来处理建立连接的请求了，这里值得注意的是，建立连接之后，这个 SocketChannel 也需要注册到 Selector 上去，因为这些 SocketChannel 也需要将**控制权交给 Selector**，这样后续有就绪 IO 事件才能通过 Selector 处理。这里我们对这个 SocketChannel 只关注 OP_READ 事件。相当于把后续进来的所有的连接和 Selector 就关联上了。

Accept 事件处理成功之后，服务器这边会继续循环，然后再次在 `selector.select();` 处阻塞住。

客户端这边会继续调用 write 方法向 channel 写入数据，数据 Ready 之后就会触发 OP_READ 事件，然后继续往下走，这次由于事件是 OP_READ 所以会进入 `key.isReadable()` 这个分支。进入这个分支之后会获取到对应的 SocketChannel，并从其中读取客户端发来的数据。

而另一个值得关注的是 `iterator.remove();`，每次迭代都需要把当前处理的 SelectedKey 移除，这是为什么呢？

因为对应的 Key 进入了 SelectedKey 集合之后，不会被 NIO 里的机制给移除。如果我们不去移除，那么下一次调用 `selector.selectedKeys().iterator();` 会发现，上次处理的有 OP_ACCEPT 事件的 SelectionKey 还在，而这会导致上面的服务端程序抛出空指针异常。

> 大家可以自行将 `iterator.remove();` 注释掉再试试

客户端的代码很简单，就直接给出来了：

```java
public static void main(String[] args) throws IOException {
  SocketChannel socketChannel = SocketChannel.open();
  socketChannel.connect(new InetSocketAddress("localhost", 8080));

  ByteBuffer buffer = ByteBuffer.allocate(16);
  buffer.put("test".getBytes(StandardCharsets.UTF_8));

  buffer.flip();
  socketChannel.write(buffer);
}
```

如果不去移除的话，服务端会在下面这行 NPE。

```java
socketChannel.configureBlocking(false);
```

为啥呢？因为此时 SelectionKey 虽然还在，ServerSocketChannel 也能拿到，但调用 `channel.accept();`  的时候，并没有客户端真正在发起连接（上一个循环已经处理过真正的连接请求了，只是没有将这个 Key 从 SelectedKey 中移除）。所以 `channel.accept();`  会返回一个 null，我们再对 null 调用 configureBlocking 方法，自然而然就 NPE 了。


