import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{o,c as n,f as t}from"./app-273f7743.js";const i="/images/230851/use-synchronized.jpeg",a="/images/230851/java-object-structure.jpeg",s="/images/230851/java-object-detail.jpeg",e="/images/230851/with-none-lock.jpeg",g="/images/230851/with-biased-lock.jpeg",p="/images/230851/light-weight-lock.jpeg",c="/images/230851/img-1.jpeg",d="/images/230851/img-2.jpeg",l="/images/230851/sychronized-lock.jpeg",h="/images/230851/lock-upgrade-process.jpeg",f={},u=t('<h1 id="详细了解-synchronized-锁升级过程" tabindex="-1"><a class="header-anchor" href="#详细了解-synchronized-锁升级过程" aria-hidden="true">#</a> 详细了解 Synchronized 锁升级过程</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>首先，synchronized 是什么？我们需要明确的给个定义——<strong>同步锁</strong>，没错，它就是把<strong>锁</strong>。</p><p>可以用来干嘛？锁，当然当然是用于线程间的同步，以及保护临界区内的资源。我们知道，锁是个非常笼统的概念，像生活中有指纹锁、密码锁等等多个种类，那 synchronized 代表的锁具体是把什么锁呢？</p><p>答案是—— <strong>Java 内置锁</strong>。在 Java 中，每个<strong>对象中</strong>都隐藏着一把锁，而 synchronized 关键字就是激活这把隐式锁的把手（开关）。</p><p>先来简单了解一下 synchronized，我们知道其共有 <strong>3 种</strong>使用方式：</p><figure><img src="'+i+'" alt="Synchronized 的使用" tabindex="0" loading="lazy"><figcaption>Synchronized 的使用</figcaption></figure><ul><li>修饰静态方法：锁住当前 class，作用于该 class 的所有实例</li><li>修饰非静态方法：只会锁住当前 class 的实例</li><li>修饰代码块：该方法接受一个对象作为参数，锁住的即该对象</li></ul><p>使用方法就不在这里赘述，可自行搜索其详细的用法，这不是本篇文章所关心的内容。</p><p>知道了 synchronized 的概念，回头来看标题，它说的<strong>锁升级</strong>到底是个啥？对于不太熟悉锁升级的人来说，可能会想：</p><blockquote><p>所谓锁，不就是啪一下锁上就完事了吗？升级是个什么玩意？<s>这跟打扑克牌也没关系啊。</s></p></blockquote><p>对于熟悉的人来说，可能会想：</p><blockquote><p>不就是「无锁 ==&gt; 偏向锁 ==&gt; 轻量级锁 ==&gt; 重量级锁 」吗？</p></blockquote><p>你可能在很多地方看到过上面描述的锁升级过程，也能直接背下来。但你真的知道<strong>无锁</strong>、<strong>偏向锁</strong>、<strong>轻量级锁</strong>、<strong>重量级锁</strong>到底代表着什么吗？这些锁存储在哪里？以及什么情况下会使得锁向下一个 level 升级？</p><p>想知道答案，我们似乎必须先搞清楚 Java 内置锁，其内部结构是啥样的？内置锁又存放在哪里？</p><p>答案在开篇提到过——在 <strong>Java 对象</strong>中。</p><p>那么现在的问题就从「内置锁结构是啥」变成了「Java 对象长啥样」。</p><h2 id="对象结构" tabindex="-1"><a class="header-anchor" href="#对象结构" aria-hidden="true">#</a> 对象结构</h2><p>从<strong>宏观</strong>上看，Java 对象的结构很简单，分为三部分：</p><figure><img src="'+a+'" alt="Java 对象结构" tabindex="0" loading="lazy"><figcaption>Java 对象结构</figcaption></figure><p>从<strong>微观</strong>上看，各个部分都还可以深入展开，详见下图：</p><figure><img src="'+s+'" alt="Java 详细对象结构" tabindex="0" loading="lazy"><figcaption>Java 详细对象结构</figcaption></figure><p>接下来分别深入讨论一下这三部分。</p><h3 id="对象头" tabindex="-1"><a class="header-anchor" href="#对象头" aria-hidden="true">#</a> <strong>对象头</strong></h3><p>从脑图中可以看出，其由 Mark Word、Class Pointer、数组长度三个字段组成。简单来说：</p><ul><li><strong>Mark Word</strong>：主要用于存储自身运行时数据</li><li><strong>Class Pointer</strong>：是指针，指向方法区中该 class 的对象，JVM 通过此字段来判断当前对象是哪个类的实例</li><li><strong>数组长度</strong>：当且仅当对象是数组时才会有该字段</li></ul><p>Class Pointer 和数组长度没什么好说的，接下来重点聊聊 Mark Word。</p><p>Mark Word 所代表的「运行时数据」主要用来表示当前 Java 对象的线程锁状态以及 GC 的标志。而<strong>线程锁状态</strong>分别就是无锁、偏向锁、轻量级锁、重量级锁。</p><p>所以前文提到的这 4 个状态，其实就是 Java 内置锁的<strong>不同状态</strong>。</p><p>在 JDK 1.6 之前，内置锁都是<strong>重量级锁</strong>，效率低下。效率低下表现在</p><p>而在 JDK 1.6 之后为了提高 synchronized 的效率，才引入了<strong>偏向锁</strong>、<strong>轻量级锁</strong>。</p><p>随着锁竞争逐渐激烈，其状态会按照「无锁 ==&gt; 偏向锁 ==&gt; 轻量级锁 ==&gt; 重量级锁 」这个方向逐渐升级，并且<strong>不可逆</strong>，只能进行锁升级，而<strong>无法进行锁降级</strong>。</p><p>接下来我们思考一个问题，既然 Mark Word 可以表示 4 种不同的锁状态，其内部到底是怎么区分的呢？（由于目前主流的 JVM 都是 64 位，所以我们只讨论 64 位的 Mark Word）接下来我们通过图片直观的感受一下。</p><h4 id="_1-无锁" tabindex="-1"><a class="header-anchor" href="#_1-无锁" aria-hidden="true">#</a> （1）无锁</h4><figure><img src="'+e+'" alt="无锁" tabindex="0" loading="lazy"><figcaption>无锁</figcaption></figure><p>这个可以理解为单线程很快乐的运行，没有其他的线程来和其竞争。</p><h4 id="_2-偏向锁" tabindex="-1"><a class="header-anchor" href="#_2-偏向锁" aria-hidden="true">#</a> （2）偏向锁</h4><figure><img src="'+g+'" alt="偏向锁" tabindex="0" loading="lazy"><figcaption>偏向锁</figcaption></figure><p>首先，什么叫偏向锁？举个例子，一段同步的代码，一直只被线程 A 访问，既然没有其他的线程来竞争，每次都要获取锁岂不是浪费资源？所以这种情况下线程 A 就会自动进入偏向锁的状态。</p><p>后续线程 A 再次访问同步代码时，不需要做任何的 check，直接执行（对该线程的「偏爱」），这样降低了获取锁的代价，提升了效率。</p><p>看到这里，你会发现无锁、偏向锁的 <strong>lock</strong> 标志位是一样的，即都是 <strong>01</strong>，这是因为无锁、偏向锁是靠字段 <strong>biased_lock</strong> 来区分的，0 代表没有使用偏向锁，1 代表启用了偏向锁。为什么要这么搞？你可以理解为无锁、偏向锁在本质上都可以理解为无锁（参考上面提到的线程 A 的状态），所以 lock 的标志位都是 01 是没毛病的。</p><blockquote><p>PS：这里的线程 ID 是持有当前对象偏向锁的线程</p></blockquote><h4 id="_3-轻量级锁" tabindex="-1"><a class="header-anchor" href="#_3-轻量级锁" aria-hidden="true">#</a> （3）轻量级锁</h4><figure><img src="'+p+'" alt="轻量级锁" tabindex="0" loading="lazy"><figcaption>轻量级锁</figcaption></figure><p>但是，一旦有第二个线程参与竞争，就会立即膨胀为<strong>轻量级锁</strong>。企图抢占的线程一开始会使用<strong>自旋</strong>：</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>的方式去<strong>尝试获取锁</strong>。如果循环几次，其他的线程释放了锁，就不需要进行用户态到内核态的切换。虽然如此，但自旋需要<strong>占用很多 CPU 的资源</strong>（自行理解汽车空档疯狂踩油门）。如果另一个线程 一直不释放锁，难道它就在这一直空转下去吗？</p><p>当然不可能，JDK 1.7 之前是<strong>普通自旋</strong>，会设定一个最大的自旋次数，<strong>默认是 10 次</strong>，超过这个阈值就停止自旋。JDK 1.7 之后，引入了<strong>适应性自旋</strong>。简单来说就是：这次自旋获取到锁了，自旋的次数就会<strong>增加</strong>；这次自旋没拿到锁，自旋的次数就会<strong>减少</strong>。</p><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_4-重量级锁" tabindex="-1"><a class="header-anchor" href="#_4-重量级锁" aria-hidden="true">#</a> （4）重量级锁</h4><figure><img src="'+l+'" alt="重量级锁" tabindex="0" loading="lazy"><figcaption>重量级锁</figcaption></figure><p>上面提到，试图抢占的线程自旋达到阈值，就会<strong>停止自旋</strong>，那么此时锁就会膨胀成<strong>重量级锁</strong>。当其膨胀成重量级锁后，其他竞争的线程进来就不会自旋了，而是直接<strong>阻塞</strong>等待，并且 Mark Word 中的内容会变成一个<strong>监视器（monitor）对象</strong>，用来统一管理排队的线程。</p><p>这个 monitor 对象，每个对象都会关联一个。monitor 对象本质上是一个同步机制，保证了同时只有一个线程能够进入临界区，在 HotSpot 的虚拟机中，是由 C++ 类 ObjectMonitor 实现的。</p><p>那么 monitor 对象具体是如何来管理线程的？接下来我们看几个 ObjectMonitor 类关键的属性：</p><ul><li><strong>ContentionQueue</strong>：是个队列，所有竞争锁的线程都会<strong>先进入</strong>这个队列中，可以理解为线程的统一入口，进入的线程会阻塞。</li><li><strong>EntryList</strong>：ContentionQueue 中有资格的线程会被移动到这里，相当于进行一轮初筛，进入的线程会阻塞。</li><li><strong>Owner</strong>：拥有当前 monitor 对象的线程，即 —— 持有锁的那个线程。</li><li><strong>OnDeck</strong>：与 Owner 线程进行竞争的线程，同一时刻只会有一个 OnDeck 线程在竞争。</li><li><strong>WaitSet</strong>：当 Owner 线程调用 <code>wait() </code> 方法被阻塞之后，会被放到这里。当其被唤醒之后，会重新进入 EntryList 当中，这个集合的线程都会阻塞。</li><li><strong>Count</strong>：用于实现可重入锁，synchronized 是可重入的。</li></ul><h3 id="对象体" tabindex="-1"><a class="header-anchor" href="#对象体" aria-hidden="true">#</a> <strong>对象体</strong></h3><p>对象体包含了当前对象的字段和值，在业务中u l是较为核心的部分。</p><h3 id="对齐字节" tabindex="-1"><a class="header-anchor" href="#对齐字节" aria-hidden="true">#</a> <strong>对齐字节</strong></h3><p>就是单纯用于填充的字节，没有其他的业务含义。其目的是为了保证对象所占用的内存大小为 8 的倍数，因为HotSpot VM 的内存管理要求对象的起始地址必须是 8 的倍数。</p><h2 id="锁升级" tabindex="-1"><a class="header-anchor" href="#锁升级" aria-hidden="true">#</a> 锁升级</h2><p>了解完 4 种锁状态之后，我们就可以整体的来看一下锁升级的过程了。</p><p>线程 A 进入 synchronized 开始抢锁，JVM 会判断当前是否是偏向锁的状态，如果是就会根据 Mark Word 中存储的线程 ID 来判断，当前线程 A 是否就是持有偏向锁的线程。如果是，则忽略 check，线程 A 直接执行临界区内的代码。</p><p>但如果 Mark Word 里的线程不是线程 A，就会通过自旋尝试获取锁，如果获取到了，就将 Mark Word 中的线程 ID 改为自己的；如果竞争失败，就会立马撤销偏向锁，膨胀为轻量级锁。</p><p>后续的竞争线程都会通过自旋来尝试获取锁，如果自旋成功那么锁的状态仍然是轻量级锁。然而如果竞争失败，锁会膨胀为重量级锁，后续等待的竞争的线程都会被阻塞。</p><figure><img src="'+h+'" alt="锁升级过程" tabindex="0" loading="lazy"><figcaption>锁升级过程</figcaption></figure><h2 id="eof" tabindex="-1"><a class="header-anchor" href="#eof" aria-hidden="true">#</a> EOF</h2><p>其实偏向锁还有一个撤销的过程，也是有代价的，但相比于偏向锁带好的好处，是能够接受的。但我们这里重点的还是关注锁升级的具体逻辑和细节，关于锁升级的过程就聊到这里。</p>',67),_=[u];function m(b,k){return o(),n("div",null,_)}const z=r(f,[["render",m],["__file","230851.html.vue"]]);export{z as default};
