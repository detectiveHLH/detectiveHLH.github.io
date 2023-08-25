import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as i,c as l,a as n,b as e,d as o,f as c}from"./app-52a8f7f8.js";const r="/images/230818/sentinel-overview.jpeg",p="/images/230818/two-sentinel-structure.jpeg",d="/images/230818/three-sentinel-structure.jpeg",u="/images/230818/img-1.jpeg",m="/images/230818/subjective-down.jpeg",v="/images/230818/fail-over.jpeg",k="/images/230818/fail-over-detail.jpeg",b={},g=n("h1",{id:"redis-sentinel-深入浅出原理和实战",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#redis-sentinel-深入浅出原理和实战","aria-hidden":"true"},"#"),e(" Redis Sentinel-深入浅出原理和实战")],-1),f=n("blockquote",null,[n("p",null,[e("本篇博客会简单的介绍Redis的Sentinel相关的原理，同时也会在最后的文章给出"),n("strong",null,"硬核的"),e("实战教程，让你在了解原理之后，能够实际上手的体验整个过程。")])],-1),h={href:"https://mp.weixin.qq.com/s/VJTBmAB-A1aRT9DR6v5gow",target:"_blank",rel:"noopener noreferrer"},y=c('<p>总的来说，为了满足Redis在真正复杂的生产环境的高可用，仅仅是用主从复制是明显不够的。例如，当master节点宕机了之后，进行主从切换的时候，我们需要人工的去做failover。</p><p>同时在流量方面，主从架构只能通过增加slave节点来扩展读请求，<strong>写能力</strong>由于受到master单节点的资源限制是无法进行扩展的。</p><p>这也是为什么我们需要引入Sentinel。</p><h2 id="sentinel" tabindex="-1"><a class="header-anchor" href="#sentinel" aria-hidden="true">#</a> Sentinel</h2><h3 id="功能概览" tabindex="-1"><a class="header-anchor" href="#功能概览" aria-hidden="true">#</a> 功能概览</h3><p>Sentinel其大致的功能如下图。</p><figure><img src="'+r+'" alt="Sentinel" tabindex="0" loading="lazy"><figcaption>Sentinel</figcaption></figure><p>Sentinel是Redis高可用的解决方案之一，本身也是分布式的架构，包含了<strong>多个</strong>Sentinel节点和<strong>多个</strong>Redis节点。而每个Sentinel节点会对Redis节点和其余的Sentinel节点进行监控。</p><p>当其发现某个节点不可达时，如果是master节点就会与其余的Sentinel节点协商。当大多数的Sentinel节点都认为master不可达时，就会选出一个Sentinel节点对master执行故障转移，并通知Redis的调用方相关的变更。</p><p>相对于<strong>主从</strong>下的手动故障转移，Sentinel的故障转移是全自动的，<strong>无需</strong>人工介入。</p><h3 id="sentinel自身高可用" tabindex="-1"><a class="header-anchor" href="#sentinel自身高可用" aria-hidden="true">#</a> Sentinel自身高可用</h3><blockquote><p>666，那我怎么知道满足它自身的高可用需要部署多少个Sentinel节点？</p></blockquote><p>因为Sentinel本身也是分布式的，所以也需要部署多实例来保证自身集群的高可用，但是这个数量是有个最低的要求，最低需要<strong>3个</strong>。</p><blockquote><p>我去，你说3个就3个？我今天偏偏就只部署2个</p></blockquote><p>你别杠...等我说了为什么就必须要3个...</p><p>因为哨兵执行故障转移需要<strong>大部分</strong>的哨兵都同意才行，如果只有两个哨兵实例，正常运作还好，就像这样。</p><figure><img src="'+p+'" alt="2 个哨兵" tabindex="0" loading="lazy"><figcaption>2 个哨兵</figcaption></figure><p>如果哨兵所在的那台机器由于机房断电啊，光纤被挖啊等极端情况整个挂掉了，那么另一台哨兵即使发现了master故障之后想要执行故障转移，但是它无法得到任何<strong>其余哨兵节点</strong>的同意，此时也<strong>永远</strong>无法执行故障转移，那Sentinel岂不是成了一个摆设？</p><p>所以我们需要至少3个节点，来保证Sentinel集群自身的高可用。当然，这三个Sentinel节点肯定都推荐部署到<strong>不同的</strong>机器上，如果所有的Sentinel节点都部署到了同一台机器上，那当这台机器挂了，整个Sentinel也就不复存在了。</p><figure><img src="'+d+'" alt="3 个哨兵" tabindex="0" loading="lazy"><figcaption>3 个哨兵</figcaption></figure><h3 id="quorum-majority" tabindex="-1"><a class="header-anchor" href="#quorum-majority" aria-hidden="true">#</a> quorum&amp;majority</h3><blockquote><p>大部分？大哥这可是要上生产环境，大部分这个数量未免也太敷衍了，咱就不能专业一点？</p></blockquote><p>前面提到的<code>大部分</code>哨兵同意涉及到两个参数，一个叫<code>quorum</code>，如果Sentinel集群有<code>quorum</code>个哨兵认为master宕机了，就<strong>客观</strong>的认为master宕机了。另一个叫<code>majority</code>...</p><blockquote><p>等等等等，不是已经有了一个叫什么quorum的吗？为什么还需要这个majority？</p></blockquote><p>你能不能等我把话说完...</p><p><code>quorum</code>刚刚讲过了，其作用是判断master是否处于宕机的状态，仅仅是一个<strong>判断</strong>作用。而我们在实际的生产中，不是说只<strong>判断</strong>master宕机就完了， 我们不还得执行<strong>故障转移</strong>，让集群正常工作吗？</p><p>同理，当哨兵集群开始进行故障转移时，如果有<code>majority</code>个哨兵同意进行故障转移，才能够最终选出一个哨兵节点，执行故障转移操作。</p><h3 id="主观宕机-客观宕机" tabindex="-1"><a class="header-anchor" href="#主观宕机-客观宕机" aria-hidden="true">#</a> 主观宕机&amp;客观宕机</h3><blockquote><p>你刚刚是不是提到了<strong>客观宕机</strong>？笑死，难不成还有主观宕机这一说？</p></blockquote><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Sentinel中认为一个节点挂了有两种类型：</p><ul><li>Subjective Down，简称<strong>sdown</strong>，主观的认为master宕机</li><li>Objective Down，简称<strong>odown</strong>，客观的认为master宕机</li></ul><p>当一个Sentinel节点与其监控的Redis节点A进行通信时，发现连接不上，此时这个哨兵节点就会<strong>主观</strong>的认为这个Redis数据A节点sdown了。为什么是<strong>主观</strong>？我们得先知道什么叫主观</p><blockquote><p>未经分析推算，下结论、决策和行为反应，暂时不能与其他不同看法的对象仔细商讨，称为<em>主观</em>。</p></blockquote><p>简单来说，因为有可能<strong>只是</strong>当前的Sentinel节点和这个A节点的网络通信有问题，其余的Sentinel节点仍然可以和A正常的通信。</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这也是为什么我们需要引入<strong>odown</strong>，当大于等于了<strong>quorum</strong>个Sentinel节点认为某个节点宕机了，我们就<strong>客观</strong>的认为这个节点宕机了。</p><p>当Sentinel集群客观的认为master宕机，就会从所有的Sentinel节点中，选出一个Sentinel节点，来最终执行master的故障转移。</p><p>那这个<strong>故障转移</strong>具体要执行些什么操作呢？我们通过一个图来看一下。</p><figure><img src="'+v+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通知调用的客户端master发生了变化</p><p>通知其余的原slave节点，去复制Sentinel选举出来的新的master节点</p><p>如果此时原来的master又重新恢复了，Sentinel也会让其去复制新的master节点。成为一个新的slave节点。</p><h2 id="硬核教程" tabindex="-1"><a class="header-anchor" href="#硬核教程" aria-hidden="true">#</a> 硬核教程</h2><blockquote><p>硬核教程旨在用最快速的方法，让你在本地体验Redis主从架构和Sentinel集群的搭建，并体验整个故障转移的过程。</p></blockquote><h3 id="前置要求" tabindex="-1"><a class="header-anchor" href="#前置要求" aria-hidden="true">#</a> 前置要求</h3><ol><li>安装了docker</li><li>安装了docker-compose</li></ol><h3 id="准备compose文件" tabindex="-1"><a class="header-anchor" href="#准备compose文件" aria-hidden="true">#</a> 准备compose文件</h3><p>首先需要准备一个目录，然后分别建立两个子目录。如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ tree <span class="token builtin class-name">.</span>
<span class="token builtin class-name">.</span>
├── redis
│   └── docker-compose.yml
└── sentinel
    ├── docker-compose.yml
    ├── sentinel1.conf
    ├── sentinel2.conf
    └── sentinel3.conf

<span class="token number">2</span> directories, <span class="token number">5</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="搭建redis主从服务器" tabindex="-1"><a class="header-anchor" href="#搭建redis主从服务器" aria-hidden="true">#</a> 搭建Redis主从服务器</h3><p>redis目录下的<code>docker-compose.yml</code>内容如下。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">master</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>master
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 6380<span class="token punctuation">:</span><span class="token number">6379</span>
  <span class="token key atrule">slave1</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>slave<span class="token punctuation">-</span><span class="token number">1</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 6381<span class="token punctuation">:</span><span class="token number">6379</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span>  redis<span class="token punctuation">-</span>server <span class="token punctuation">-</span><span class="token punctuation">-</span>slaveof redis<span class="token punctuation">-</span>master 6379
  <span class="token key atrule">slave2</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>slave<span class="token punctuation">-</span><span class="token number">2</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 6382<span class="token punctuation">:</span><span class="token number">6379</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>server <span class="token punctuation">-</span><span class="token punctuation">-</span>slaveof redis<span class="token punctuation">-</span>master 6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>以上的命令，简单解释一下slaveof</p><p>就是让两个slave节点去复制container_name为redis-master的节点，这样就组成了一个简单的3个节点的主从架构</p></blockquote><p>然后用命令行进入当前目录，直接敲命令<code>docker-compose up</code>即可，剩下的事情交给docker-compose去做就好，它会把我们所需要的节点全部启动起来。</p><p>此时我们还需要拿到刚刚我们启动的master节点的IP，简要步骤如下：</p><ol><li><p>通过<code>docker ps</code>找到对应的master节点的containerID</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
9f682c199e9b        redis               &quot;docker-entrypoint.s…&quot;   3 seconds ago       Up 2 seconds        0.0.0.0:6381-&gt;6379/tcp   redis-slave-1
2572ab587558        redis               &quot;docker-entrypoint.s…&quot;   3 seconds ago       Up 2 seconds        0.0.0.0:6382-&gt;6379/tcp   redis-slave-2
f70a9d9809bc        redis               &quot;docker-entrypoint.s…&quot;   3 seconds ago       Up 2 seconds        0.0.0.0:6380-&gt;6379/tcp   redis-master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是<code>f70a9d9809bc</code>。</p></li><li><p>通过<code>docker inspect f70a9d9809bc</code>，拿到对应容器的IP，在NetworkSettings -&gt; Networks -&gt; IPAddress字段。</p></li></ol><p>然后把这个值给记录下来，此处我的值为<code>172.28.0.3</code>。</p><h3 id="搭建sentinel集群" tabindex="-1"><a class="header-anchor" href="#搭建sentinel集群" aria-hidden="true">#</a> 搭建Sentinel集群</h3><p>sentinel目录下的<code>docker-compose.yml</code>内容如下。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3&#39;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">sentinel1</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>sentinel<span class="token punctuation">-</span><span class="token number">1</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 26379<span class="token punctuation">:</span><span class="token number">26379</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>sentinel /usr/local/etc/redis/sentinel.conf
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./sentinel1.conf<span class="token punctuation">:</span>/usr/local/etc/redis/sentinel.conf
  <span class="token key atrule">sentinel2</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>sentinel<span class="token punctuation">-</span><span class="token number">2</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> 26380<span class="token punctuation">:</span><span class="token number">26379</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>sentinel /usr/local/etc/redis/sentinel.conf
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./sentinel2.conf<span class="token punctuation">:</span>/usr/local/etc/redis/sentinel.conf
  <span class="token key atrule">sentinel3</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>sentinel<span class="token punctuation">-</span><span class="token number">3</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 26381<span class="token punctuation">:</span><span class="token number">26379</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>sentinel /usr/local/etc/redis/sentinel.conf
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./sentinel3.conf<span class="token punctuation">:</span>/usr/local/etc/redis/sentinel.conf
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">default</span><span class="token punctuation">:</span>
    <span class="token key atrule">external</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> redis_default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>同样在这里解释一下命令</p><p>redis-sentinel 命令让 redis 以 sentinel 的模式启动，本质上就是一个运行在特殊模式的 redis 服务器。</p><p>和 redis-server 的区别在于，他们分别载入了不同的命令表，sentinel 中无法执行各种redis中特有的 set get操作。</p></blockquote><p>建立三份一模一样的文件，分别命名为sentinel1.conf、sentinel2.conf和sentinel3.conf。其内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>port 26379
dir &quot;/tmp&quot;
sentinel deny-scripts-reconfig yes
sentinel monitor mymaster 172.28.0.3 6379 2
sentinel config-epoch mymaster 1
sentinel leader-epoch mymaster 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，我们对于sentinel的配置文件中，<code>sentinel monitor mymaster 172.28.0.3 6379 2</code>表示让它去监听名为<code>mymaster</code>的master节点，注意此处的IP一定要是你自己master节点的IP，然后最后面的<code>2</code>就是我们之前提到的<code>quorum</code>。</p><p>然后命令行进入名为sentinel的目录下，敲<code>docker-compose up</code>即可。至此，Sentinel集群便启动了起来。</p><h3 id="手动模拟master挂掉" tabindex="-1"><a class="header-anchor" href="#手动模拟master挂掉" aria-hidden="true">#</a> 手动模拟master挂掉</h3><p>然后我们需要手动模拟master挂掉，来验证我们搭建的Sentinel集群是否可以正常的执行故障转移。</p><p>命令行进入名为redis的目录下，敲入如下命令。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker-compose pause master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时就会将master容器给暂停运行，让我们等待<strong>10秒</strong>之后，就可以看到sentinel这边输出了如下的日志。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-sentinel-2 | 1:X 07 Dec 2020 01:58:05.459 # +sdown master mymaster 172.28.0.3 6379
......
......
......
redis-sentinel-1 | 1:X 07 Dec 2020 01:58:06.932 # +switch-master mymaster 172.28.0.3 6379 172.28.0.2 6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>得得得，你干什么就甩一堆日志文件上来？凑字数？你这样鬼能看懂？</p></blockquote><p>的确，光从日志文件一行一行的看，就算是我自己过两周再来看，也是一脸懵逼。日志文件完整了描述了整个Sentinel集群从开始执行故障转移到最终执行完成的所有细节，但是在这里直接放出来不方便大家的理解。</p><p>所以为了让大家能够更加直观的了解这个过程，我简单的把过程抽象了成了一张图，大家看图结合日志，应该能够更容易理解。</p><figure><img src="`+k+`" alt="sentinel-process" tabindex="0" loading="lazy"><figcaption>sentinel-process</figcaption></figure><p>里面关键的步骤步骤的相关解释我也一并放入了图片中。</p><p>最终的结果就是，master已经从我们最开始的<code>172.28.0.3</code>切换到了<code>172.28.0.2</code>，后者则是原来的slave节点之一。此时我们也可以连接到<code>172.28.0.2</code>这个容器里去，通过命令来看一下其现在的情况。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>role:master
connected_slaves:1
slave0:ip=172.28.0.4,port=6379,state=online,offset=18952,lag=0
master_replid:f0bf5d1c843ec3ab005c5ac2b864f7ffdc6a8217
master_replid2:72c43e1f9c05d4b08bea6bf9b2549997587e261c
master_repl_offset:18952
second_repl_offset:16351
repl_backlog_active:1
repl_backlog_size:1048576
repl_backlog_first_byte_offset:1
repl_backlog_histlen:18952
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，现在的<code>172.28.0.2</code>这个节点的角色已经变成了<strong>master</strong>，与其相连接的slave节点只有1个，因为现在的<strong>原master</strong>还没有启动起来，总共存活的只有2个实例。</p><h3 id="原master重启启动" tabindex="-1"><a class="header-anchor" href="#原master重启启动" aria-hidden="true">#</a> 原master重启启动</h3><p>接下来我们模拟原master重新启动，来看一下会发什么什么。</p><p>还是通过命令行进入到名为redis的本地目录，通过<code>docker-compose unpause master</code>来模拟原master故障恢复之后的上线。同样我们连接到原master的机器上去。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker exec -it f70a9d9809bc1e924a5be0135888067ad3eb16552f9eaf82495e4c956b456cd9 /bin/sh; exit
# redis-cli
127.0.0.1:6379&gt; info replication
# Replication
role:slave
master_host:172.28.0.2
master_port:6379
master_link_status:up
......
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>master断线重连之后，角色也变成了新的master（也就是<code>172.28.0.2</code>这个节点）的一个slave。</p><p>然后我们也可以通过再看一下新master节点的replication情况作证。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Replication
role:master
connected_slaves:2
slave0:ip=172.28.0.4,port=6379,state=online,offset=179800,lag=0
slave1:ip=172.28.0.3,port=6379,state=online,offset=179800,lag=1
......
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原master短线重连之后，其<strong>connected_slaves</strong>变成了2，且<strong>原master</strong><code>172.28.0.3</code>被清晰的标注为了slave1，同样与我们开篇和图中所讲的原理相符合。</p><blockquote><p>好了，以上就是本篇博客的全部内容</p><p>欢迎微信关注「SH的全栈笔记」，查看更多相关的文章</p></blockquote>`,89);function _(x,S){const s=t("ExternalLinkIcon");return i(),l("div",null,[g,f,n("p",null,[e("之前的文章聊到了Redis的主从复制，聊到了其相关的原理和缺点，具体的建议可以看看我之前写的文章"),n("a",h,[e("Redis的主从复制"),o(s)]),e("。")]),y])}const j=a(b,[["render",_],["__file","230818.html.vue"]]);export{j as default};
