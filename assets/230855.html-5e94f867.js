import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as n,o as s,c as p,a as e,b as o,d as a,f as t}from"./app-457ab53c.js";const d="/images/230855/zk-file-tree.jpeg",c="/images/230855/create-node.jpeg",g="/images/230855/with-abusolute-path.jpeg",l="/images/230855/create-s-node.jpeg",h="/images/230855/create-e-node.jpeg",u="/images/230855/create-e-s-node.jpeg",f="/images/230855/all-e-s-node.jpeg",m="/images/230855/nodes.jpeg",k="/images/230855/register-watcher.jpeg",_="/images/230855/whole-process.jpeg",b="/images/230855/watch-demo.jpeg",x={},Z=t('<h1 id="zookeeper基础原理-应用场景详解" tabindex="-1"><a class="header-anchor" href="#zookeeper基础原理-应用场景详解" aria-hidden="true">#</a> Zookeeper基础原理&amp;应用场景详解</h1><h2 id="简单了解zookeeper" tabindex="-1"><a class="header-anchor" href="#简单了解zookeeper" aria-hidden="true">#</a> 简单了解Zookeeper</h2><blockquote><p>Tips: 如果之前对Zookeeper不了解的话，这里大概留个印象就好了</p></blockquote><p>Zookeeper是一个分布式协调服务，可以用于元数据管理、分布式锁、分布式协调、发布订阅、服务命名等等。</p><p>例如，<strong>Kafka</strong>中就是用Zookeeper来保存其集群中的相关元数据，例如Broker、Topic以及Partition等等。同时，基于Zookeeper的Watch监听机制，还可以用其实现发布、订阅的功能。</p><p>在平常的常规业务使用场景下，我们几乎只会使用到<strong>分布式锁</strong>这一个用途。</p><h2 id="zookeeper内部运行机制" tabindex="-1"><a class="header-anchor" href="#zookeeper内部运行机制" aria-hidden="true">#</a> Zookeeper内部运行机制</h2><p>Zookeeper的底层存储原理，有点类似于Linux中的文件系统。Zookeeper中的文件系统中的每个文件都是节点（Znode）。根据文件之间的层级关系，Zookeeper内部就会形成这个这样一个文件树。</p><figure><img src="'+d+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在Linux中，文件（节点）其实是分类型的，例如分为文件、目录。在Zookeeper中同理，Znode同样的有类型。在Zookeeper中，所有的节点类型如下：</p><ul><li>持久节点（Persistent）</li><li>持久顺序节点（Persistent Sequential)</li><li>临时节点（Ephemeral）</li><li>临时顺序节点（Ephemeral Sequential）</li></ul><p>所谓<strong>持久节点</strong>，就和我们自己在电脑上新建一个文件一样，除非你主动删除，否则一直存在。</p><p>而<strong>持久顺序节点</strong>除了继承了持久节点的特性之外，还会为其下创建的子节点保证其先后顺序，并且会自动地为节点加上10位<strong>自增序列号</strong>作为节点名，以此来保证节点名的唯一性。这一点上图中的<code>subfiles</code>已经给出了示例。</p><p>而<strong>临时节点</strong>，其生命周期和client的连接是否活跃相关，如果client一旦断开连接，该节点（可以理解为文件）就都会被删除，并且临时节点<strong>无法创建子节点</strong>；</p><blockquote><p>PS：这里的<strong>断开连接</strong>其实不是我们直觉上理解的断开连接，Zookeeper有其Session机制，当某个client的Session<strong>过期</strong>之后，会将对应的client创建的节点全部删除</p></blockquote><h2 id="zookeeper的节点创建方式" tabindex="-1"><a class="header-anchor" href="#zookeeper的节点创建方式" aria-hidden="true">#</a> Zookeeper的节点创建方式</h2><p>接下来我们来分别看看几种节点的创建方式，给出几个简单的示例。</p><h3 id="创建持久节点" tabindex="-1"><a class="header-anchor" href="#创建持久节点" aria-hidden="true">#</a> 创建持久节点</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create /node_name SH的全栈笔记 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里需要注意的是，命令中<strong>所有的节点名称必须要以<code>/</code>开头</strong>，否则会创建失败，因为在Zookeeper中是不能使用相对路径，<strong>必须</strong>要使用绝对路径。</p><figure><img src="'+g+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="创建持久顺序节点" tabindex="-1"><a class="header-anchor" href="#创建持久顺序节点" aria-hidden="true">#</a> 创建持久顺序节点</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create -s /node_name SH的全栈笔记
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+l+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到，Zookeeper为key自动的加上了10位的自增后缀。</p><h3 id="创建临时节点" tabindex="-1"><a class="header-anchor" href="#创建临时节点" aria-hidden="true">#</a> 创建临时节点</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create -e /test SH的全栈笔记
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+h+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="创建临时顺序节点" tabindex="-1"><a class="header-anchor" href="#创建临时顺序节点" aria-hidden="true">#</a> 创建临时顺序节点</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create -e -s /node_name SH的全栈笔记
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="zookeeper的用途" tabindex="-1"><a class="header-anchor" href="#zookeeper的用途" aria-hidden="true">#</a> Zookeeper的用途</h2><p>我们通过一些具体的例子，来了解Zookeeper的详细用途，它不仅仅只是被当作<strong>分布式锁</strong>使用。</p><h3 id="元数据管理" tabindex="-1"><a class="header-anchor" href="#元数据管理" aria-hidden="true">#</a> 元数据管理</h3><p>我们都知道，Kafka在运行时会依赖一个Zookeeper的集群。Kafka通过Zookeeper来管理集群的相关元数据，并通过Zookeeper进行Leader选举。</p><blockquote><p>Tips: 但是即将发布的Kafka 2.8版本中，Zookeeper已经不是一个必需的组件了。这块我暂时还没有时间去细看，不过我估计可能会跟RocketMQ中处理的方式差不多，将其集群的元数据放到Kafka本身来处理。</p></blockquote><h3 id="分布式锁" tabindex="-1"><a class="header-anchor" href="#分布式锁" aria-hidden="true">#</a> 分布式锁</h3><p>基于Zookeeper的分布式锁其实流程很简单。首先我们需要知道加分布式锁的<strong>本质</strong>是什么？</p><blockquote><p>答案是创建临时顺序节点</p></blockquote><p>当某个客户端<code>加锁</code>成功之后，实际上则是成功的在Zookeeper上创建了<strong>临时顺序节点</strong>。我们知道，分布式锁能够使<strong>同一时间</strong>只能有一个能够访问某种资源。那这就必然会涉及到分布式锁的竞争，那问题来了，当前这个客户端是如何感知抢到了锁呢？</p><p>其实在客户端侧会有一定的逻辑，假设加锁的key为<code>/locks/modify_users</code>。</p><p>首先，客户端会发起加锁请求，然后会在Zookeeper上创建<strong>持久节点</strong><code>locks</code>，然后会在该节点下创建临时顺序节点。临时顺序节点的创建示例，如下图所示。</p><figure><img src="'+f+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当客户端成功创建了节点之后，还会获取其同级的所有节点。也就是上图中的所有<code>modify_users000000000x</code>的节点。</p><p>此时客户端会根据<strong>10位的自增序号</strong>去判断，当前自己创建的节点是否是所有的节点中最小的那个，如果是<strong>最小的</strong>则自己获取到了<strong>分布式锁</strong>。</p><p>你可能会问，那如果我不是最小的怎么办呢？而且我的节点都已经创建了。如果不是最小的，说明当前客户端<strong>并没有抢到锁</strong>。按照我们的认知，如果没有竞争到分布式锁，则会等待。<strong>等待</strong>的底层都做了什么？我们用实际例子来捋一遍。</p><p>假设Zookeeper中已经有了如下的节点。</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>例如<strong>当前客户端是B</strong>创建的节点是<code>modify_users0000000002</code>，那么很明显B<strong>没有抢到锁</strong>，因为已经有比它还要小的由<strong>客户端A</strong>创建的节点<code>modify_users0000000001</code>。</p><p>此时客户端B会对节点<code>modify_users0000000001</code>注册一个<strong>监听器</strong>，对于该节点的任意更新都将触发对应的操作。</p><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当其被删除之后，就会唤醒客户端B的线程，此时客户端B会再次进行判断自己是否是序号最小的一个节点，此时<code>modify_users0000000002</code>明显是最小的节点，故客户端B<strong>加锁成功</strong>。</p><p>为了让你更加直观的了解这个过程，我把流程浓缩成了下面这幅流程图。</p><figure><img src="'+_+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="分布式协调" tabindex="-1"><a class="header-anchor" href="#分布式协调" aria-hidden="true">#</a> 分布式协调</h3>',56),v={href:"https://mp.weixin.qq.com/s/sDhgznRSA5wWduvG156mBw",target:"_blank",rel:"noopener noreferrer"},z=t('<p>在2PC中存在两种角色，分别是<strong>参与者（Participant）<strong>和</strong>协调者（Coordinator）</strong>，协调者负责统一的调度所有分布式节点的执行逻辑。具体协调啥呢？举个例子。</p><p>例如在2PC的Commit阶段，两个参与者A、B，A的commit操作成功了，但不幸的是B失败了。此时协调者就需要向A发送Rollback操作。Zookeeper大概就是这样一个角色。其实从Zookeeper的名称也能看出来，Zookeeper的翻译是<strong>动物园管理员</strong>，很多的框架都依靠Zookeeper来实现协调的操作。</p><h3 id="发布订阅" tabindex="-1"><a class="header-anchor" href="#发布订阅" aria-hidden="true">#</a> 发布订阅</h3><p>由于Zookeeper自带了<strong>监听器（Watch）<strong>的功能，所以</strong>发布订阅</strong>也顺理成章的成为了Zookeeper的应用之一。例如在某个配置节点上注册了监听器，那么该配置一旦发布变更，对应的服务就能实时的感知到配置更改，从而达到配置的动态更新的目的。</p><p>给个简单的Watch使用示例。</p><figure><img src="'+b+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="命名服务" tabindex="-1"><a class="header-anchor" href="#命名服务" aria-hidden="true">#</a> 命名服务</h3><p>用大白话来说，命名服务主要有两种。</p><ul><li>单纯的利用Zookeeper的文件系统特性，存储结构化的文件</li><li>利用文件特性和<strong>顺序节点</strong>的特性，来生成全局的唯一标识</li></ul><p>前者可以用于在系统之间共享某种业务上的特定资源，后者则可以用于实现分布式锁。</p><p>参考</p>',11),y={href:"https://zookeeper.apache.org/doc/r3.7.0/",target:"_blank",rel:"noopener noreferrer"},B={href:"https://zookeeper.apache.org/doc/r3.1.2/recipes.html#sc_recipes_Locks",target:"_blank",rel:"noopener noreferrer"};function S(q,L){const r=n("ExternalLinkIcon");return s(),p("div",null,[Z,e("p",null,[o("我们都知道，在很多场景下要保证一致性都会采用经典的2PC（两阶段提交），例如MySQL中Redo Log和Binlog提交的数据一致性保障就是采用的2PC，详情可以看"),e("a",v,[o("基于Redo Log和Undo Log的MySQL崩溃恢复流程"),a(r)]),o("。")]),z,e("p",null,[e("a",y,[o("https://zookeeper.apache.org/doc/r3.7.0/"),a(r)])]),e("p",null,[e("a",B,[o("https://zookeeper.apache.org/doc/r3.1.2/recipes.html#sc_recipes_Locks"),a(r)])])])}const w=i(x,[["render",S],["__file","230855.html.vue"]]);export{w as default};
