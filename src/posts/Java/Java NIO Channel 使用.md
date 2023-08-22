---
date: 2022-01-12
permalink: /posts/230849.html
category:
- Java
tag:
- Channel
- NIO
---

# Java NIO Channel 使用

Java NIO 中的 Channel 分类：

- FileChannel
- SocketChannel
- ServerSocketChannel
- DatagramChannel

![channel 分类](/images/230849/channel-category.jpeg)

FileChannel: 主要用于文件的读写，可以从磁盘上读取文件，也可以向磁盘上写入文件。

SocketChannel：用于 Socket 的 TCP 连接的数据读写，既可以从 Channel 读数据，也可以向 Channle 中写入数据

ServerSocketChannel：通过 ServerSocketChannel 可以监听 TCP 连接，服务端监听到连接之后，会为每个请求创建一个 SocketChannel

DatagramChannel：用于 UDP 协议的数据读写

接下来就分别介绍一下。



## FileChannel

主要用于操作文件，废话不多说，直接看例子。

> 准备文件 `test-file.txt` ，内容 `shDEQuanZhanBiJi`

![test-file.txt 文件](/images/230849/prepare-file.jpeg)



### 输入 FileInputStream

用于从 FileChannel 中读取数据，例如将指定文件输入到 FileChannel 中，我们就能获取到文件的内容，接下来编写 FileChannel 的 **输入流** 核心代码：

```java
public static void main(String[] args) throws IOException {
  // 创建一个输入流
  FileInputStream fileInputStream = new FileInputStream("test-file.txt");
  // 通过输入流获取到 channel
  FileChannel fileChannel = fileInputStream.getChannel();

  // 准备好 ByteBuffer
  ByteBuffer buffer = ByteBuffer.allocate(16);
  // 将 输入流 的 channel 的数据读入 buffer 中
  fileChannel.read(buffer);

  // 简单打印 buffer 的内容
  printBuffer(buffer); // shDEQuanZhanBiJi
}
```

这里面的 ByteBuffer 是 channel 进行读、写数据的中间媒介。要从 channel 中读取数据（也就是上面这个例子），需要先将数据读到 ByteBuffer 中；同理，要想向 channel 中写入数据，也需要先将数据写入 ByteBuffer（下面讲输出流的时候会讲）。

> 对 ByteBuffer 不熟悉的可以先看看我之前写的[《玩转 ByteBuffer》](https://mp.weixin.qq.com/s/cCPOlCD_74zqpsOLoBCuCQ)，`printBuffer` 的代码里面也有



### 输出 FileOutputStream

顾名思义，是 FileChannel 要向外输出数据，例如将数据写入到磁盘文件上，接下来通过例子看看效果：

```java
public static void main(String[] args) throws IOException {
  // 指定需要生成的文件名称
  String generateFileName = "generate-file.txt";
  // 创建一个输出流
  FileOutputStream fileOutputStream = new FileOutputStream(generateFileName);
  // 通过输出流获取到 channel
  FileChannel fileChannel = fileOutputStream.getChannel();

  // 准备好 ByteBuffer, 并向里面写入数据
  ByteBuffer buffer = ByteBuffer.allocate(16);
  buffer.put("shDEQuanZhanBiJi".getBytes(StandardCharsets.UTF_8));

  // 将 输入流 的 channel 的数据读入 buffer 中
  fileChannel.write(buffer);
  fileChannel.close();
}
```

相应的注释都已经贴在对应的代码上了，细节在此不再赘述。唯一需要关注的是，调用 `write` 写文件到磁盘上时，也是先传入的 ByteBuffer。

好了，当你运行完代码你会发现，虽然文件是生成的了，但是里面却是空白的...这其实就涉及到对 ByteBuffer 的熟悉程度了，算是埋的一个坑。

![](/images/230849/img-1.gif)

如果不知道为啥文件是空的，可以去看看上面讲 ByteBuffer 的文章，接下来是解答。

这是因为我们创建一个 ByteBuffer 的时候默认是处于**写模式**的，此时如果去通过 **position** 和 **limit** 去读取数据是读不到的。所以在调用 `write` 之前，我们需要先将 ByteBuffer 切换到读模式，完整代码如下：

```java
public static void main(String[] args) throws IOException {
  // 指定需要生成的文件名称
  String generateFileName = "generate-file.txt";
  // 创建一个输出流
  FileOutputStream fileOutputStream = new FileOutputStream(generateFileName);
  // 通过输出流获取到 channel
  FileChannel fileChannel = fileOutputStream.getChannel();

  // 准备好 ByteBuffer, 并向里面写入数据
  ByteBuffer buffer = ByteBuffer.allocate(16);
  buffer.put("shDEQuanZhanBiJi".getBytes(StandardCharsets.UTF_8));

  // 将 ByteBuffer 切换到读模式
  buffer.flip();
  // 将 输入流 的 channel 的数据读入 buffer 中
  fileChannel.write(buffer);
  
  fileChannel.close();
}
```

可以看到，文件生成了，内容也有了：

![](/images/230849/generate-file.jpeg)



但是呢，上面将的两种要么只能写，要么只能读。例如 `FileInputStream` 如果你硬要往 channel 里怼数据，程序最后会抛出 `NonWritableChannelException` 异常，告诉你这玩意儿写不了。

![](/images/230849/img-2.gif)

那有没有一个既能写，又能读~~还能唱跳~~的实现呢？当然有，那就是 `RandomAccessFile`。

> 这里提一嘴，调用完 write 并不是立即就写入磁盘，也可以在操作系统的缓存里。如果需要立即刷盘，则调用 `channel.force(true);` 即可。



### RandomAccessFile

怎么用的呢？其实跟之前两个差不多：

```java
public static void main(String[] args) throws IOException {
  // 指定需要生成的文件名称
  String targetFileName = "target-file.txt";
  // 创建 RandomAccessFile, 赋予可读(r)、可写(w)的权限
  RandomAccessFile accessFile = new RandomAccessFile(targetFileName, "rw");
  FileChannel fileChannel = accessFile.getChannel();

  // 创建 ByteBuffer 并写入数据
  ByteBuffer buffer = ByteBuffer.allocate(16);
  buffer.put("shDEQuanZhanBiJi".getBytes(StandardCharsets.UTF_8));
  // 切换到 buffer 的读模式
  buffer.flip();
  // 调用 write 将 buffer 的数据写入到 channel, channel 再写数据到磁盘文件
  fileChannel.write(buffer);

  // 相当于清空 buffer
  buffer.clear();
  // 将之前写入到 channel 的数据再读入到 buffer
  fileChannel.read(buffer);

  // 打印 buffer 中的内容
  printBuffer(buffer);

  fileChannel.close();
}
```

运行之后的效果就是，会生成一个名为 `target-file.txt` 的文件，内容就是 `shDEQuanZhanBiJi`。并且控制台会将之前写入 channel 的 `shDEQuanZhanBiJi` 打印出来。

老规矩，细节都在注释中。值得注意的是 `new RandomAccessFile(targetFileName, "rw");`  里的 `rw` 。注释里也写了，代表赋予可读、可写的权限。

再值得注意的是，你不能说把 `rw` 改成 `w`。

![](/images/230849/img-3.gif)

不能这么玩，因为它就是一个单纯的字符串匹配，可供选择的就这么些：

![mode 类型](/images/230849/random-access-file.jpeg)

可以看到，`r` 必不可少...：

- `r` 只能读
- `rw` 既能**读**，也能**写**
- `rws` 和 `rwd` 功能和 `rw` 大致是相同的，可读、可写。唯一区别是他们会将每次改动强制刷到磁盘，并且 `rws` 会将操作系统对该文件的元数据也一起刷盘，体现就是文件的更新时间会更新，而 `rwd` 不会将文件的元数据刷盘



## 两个 SocketChannel

由于这俩一个负责连接传输，另一个负责连接的监听，所以就放在一起来讲了。这一小节我们大概要做这件事：

![客户端发送文件到服务器](/images/230849/send-data-through-socket-channel.jpeg)

但是为了能让大家直接运行起来，客户端这侧就不从磁盘文件读取了，直接用 ByteBuffer。大家可以运行起来之后，自己尝试从磁盘上去加载。还是先看代码，首先是服务器的：



### ServerSocketChannel

```java
public static void main(String[] args) throws IOException {
  // 打开一个 ServerSocketChannel
  ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
  // 绑定 8080 端口
  serverSocketChannel.bind(new InetSocketAddress(8080));

  // 开始接受客户端连接
  SocketChannel socketChannel = serverSocketChannel.accept();
  // 获取连接成功
  System.out.printf("socketChannel %s connected\n", socketChannel);
  // 准备 ByteBuffer 以从 socketChannel 中读取数据
  ByteBuffer buffer = ByteBuffer.allocate(16);

  // 开始读取数据
  System.out.println("before read");
  int read = socketChannel.read(buffer);
  System.out.printf("read complete, read bytes length: %s \n", read);

  printBuffer(buffer);
}
```

这里我们使用的是 Java NIO 中默认的阻塞模式，仅仅作为一个掩饰，如果想要 ServerSocketChannel 进入**非阻塞模式**，可在 `open`  之后，调用:

```java
serverSocketChannel.configureBlocking(false);
```

由于我们这里是**阻塞模式**，所以在代码运行到 `serverSocketChannel.accept();` 时，会陷入**阻塞状态**，直到有客户端过来建立连接。同理，`read` 方法也是**阻塞的**，如果客户端一直没有写入数据，那么服务器就会一直阻塞在 `read` 。



### SocketChannel

直接先给代码：

```java
public static void main(String[] args) throws IOException {
  // 打开一个 SocketChannel
  SocketChannel socketChannel = SocketChannel.open();
  // 连接到 localhost 的 8080 端口
  socketChannel.connect(new InetSocketAddress("localhost", 8080));

  // 准备 ByteBuffer
  ByteBuffer buffer = ByteBuffer.allocate(16);
  buffer.put(Charset.defaultCharset().encode("test"));

  // 将 buffer 切换成读模式 & 向 channel 中写入数据
  buffer.flip();
  socketChannel.write(buffer);
}
```

先启动服务器，再启动客户端。可以看到服务器侧的控制台有如下的输出：

```
socketChannel java.nio.channels.SocketChannel[connected local=/127.0.0.1:8080 remote=/127.0.0.1:64373] connected
before read
read complete, read bytes length: 4 
BUFFER VALUE: test
```



## Datagram

这个就比较简单，首先是客户端的代码：

```java
public static void main(String[] args) throws IOException {
  DatagramChannel datagramChannel = DatagramChannel.open();

  // 构建 buffer 数据
  ByteBuffer buffer = ByteBuffer.allocate(16);
  buffer.put(Charset.defaultCharset().encode("test"));

  // 切换到 buffer 的读模式
  buffer.flip();
  datagramChannel.send(buffer, new InetSocketAddress("localhost", 8080));
}
```

然后是服务器：

```java
public static void main(String[] args) throws IOException {
  DatagramChannel datagramChannel = DatagramChannel.open();
  datagramChannel.bind(new InetSocketAddress(8080));

  ByteBuffer buffer = ByteBuffer.allocate(16);
  datagramChannel.receive(buffer);

  printBuffer(buffer);
}
```



