import{_ as r}from"./plugin-vue_export-helper-c27b6911.js";import{r as n,o as i,c as a,a as e,b as s,d as t,f as p}from"./app-0f9babf2.js";const l="/images/230817/master-slave-structure.jpeg",d="/images/230817/sync-process.jpeg",c="/images/230817/p-sync-process.jpeg",g="/images/230817/redis-backlog.jpeg",f={},m=e("h1",{id:"跟随杠精的视角一起来了解redis的主从复制",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#跟随杠精的视角一起来了解redis的主从复制","aria-hidden":"true"},"#"),s(" 跟随杠精的视角一起来了解Redis的主从复制")],-1),u=e("p",null,"Redis系列文章：",-1),R={href:"https://mp.weixin.qq.com/s/Pje0emTqS4S_IbtbVY9S5w",target:"_blank",rel:"noopener noreferrer"},v={href:"https://mp.weixin.qq.com/s/m7WEAC6juUYnA5yyKgR4uA",target:"_blank",rel:"noopener noreferrer"},_=p('<p>虽然说单机的Redis性能很好，也有完备的持久化机制，那如果你的业务体量真的很大，超过了单机能够承载的上限了怎么办？不做任何处理的话Redis挂了怎么办？带着这个问题开始我们今天的主题-<strong>Redis高可用</strong>，由于篇幅原因，本章就只聊聊主从复制。</p><p>为啥要先从主从复制开始聊，是因为<strong>主从复制</strong>可以说是整个Redis高可用实现的基石，你可以先有这么一个概念，至于具体为什么是基石，这个后面聊到Sentinel和Redis集群的时候会说到。</p><p>首先我们需要知道，对于我们开发人员来说，为什么需要<strong>主从架构</strong>？一个Redis实例难道不行吗？</p><p>其实除了开篇提到的负载超过了Redis单机能够处理的上限，还有一种情况Redis也无法保证自身的高可用性。那就是即便Redis能够扛住所有流量，但是如果这个Redis进程所在的机器挂了呢？请求会直接调转枪口，大量的流量会瞬间把你的DB打挂，然后你就可以背个P0，打包回家了。</p><p>而且，假设你对Redis的需求真的超过了单机的容量，你怎么办？搞多台独立的Redis实例吗？那如果用户缓存的数据这一次存在了实例一，下一次如果用户又访问到了实例二，难道又要去走一遍DB吗？除非你能够维护好用户和Redis实例的对应关系（但是通常这样的逻辑比较复杂），否则部署多个Redis实例也就失去了它的意义，没有办法做到横向扩展了。</p><blockquote><p>那换成主从架构就能解决这个问题吗？</p></blockquote><p>我们可以从一个图来直观的了解一下。</p><figure><img src="'+l+'" alt="Redis主从复制" tabindex="0" loading="lazy"><figcaption>Redis主从复制</figcaption></figure><p>在主从同步中，我们将节点的角色划分为<code>master</code>和<code>slave</code>，形成<strong>一主多从</strong>。slave对外提供读操作，而master负责写操作，形成一个读写分离的架构，这样一来就能够承载更多的业务请求。</p><p>在多数的业务场景下，对于Redis的<strong>读操作</strong>都要多于<strong>写操作</strong>，所以当读请求量特别大的时候，我们可以通过增加slave节点来使Redis扛住更多的流量。</p><blockquote><p>你这不行啊老弟，你往master写数据，那我要是连接到slave上去了，不就拿不到之前的数据了？</p></blockquote><p>我这个小标题的不是写了吗？<strong>主从复制</strong>，slave会按照某种策略从master同步数据。Redis中我们可以通过<code>slaveof</code>命令让一个Redis实例去复制（replicate）另外一台Redis的状态。被复制的Redis实例就是master节点，而执行<code>slaveof</code>命令的机器就是slave节点。</p><p>Redis的主从复制分为两个步骤，分别是<strong>同步</strong>和<strong>命令传播</strong>。</p><p><strong>同步操作</strong>用于将Master节点内存状态复制给Slave节点，而<strong>命令传播</strong>则是在同步时，客户端又执行了一些<strong>写</strong>操作改变了服务器的状态，此时master节点的状态与同步操作执行的时候不一致了，所以需要命令传播来使master和slave状态重新一致。</p><p>同步的大致的流程如下：</p><ul><li>slave节点向master节点发送<code>sync</code>命令</li><li>master收到<code>sync</code>命令之后会执行<code>bgsave</code>命令，Redis会fork出一个子进程在后台生成RDB文件，同时将同步过程中的写命令记录到缓冲区中</li><li>文件生成后，master会把RDB文件发送给slave，从服务器接收到RDB文件会将其载入内存</li><li>然后master将记录在缓冲区的所有写命令发送给slave，slave对这些命令进行<strong>重放</strong>，将其数据库的状态更新至和master一致</li></ul><p>为了让大家更加清晰的认识到这个过程，我们通过图再来了解一下。</p><figure><img src="'+d+'" alt="Redis主从复制" tabindex="0" loading="lazy"><figcaption>Redis主从复制</figcaption></figure><blockquote><p>🐂🍺，那如果同步完了之后slave又挂了咋办？slave重启之后很可能就又跟maste不一致了？</p></blockquote><p>的确是这样，这就涉及到一个名词叫<strong>断点续传</strong>了。上面讨论的是slave第一次连接到master，会执行<strong>全量复制</strong>，而针对上面这种情况，Redis新老版本处理方式不一样。</p><p>Redis2.8之前，当主从完成了同步之后，slave如果断线重连，向master发送<code>sync</code>命令，master会将全量的数据再次同给slave。</p><p>但是我们会发现一个问题，就是大部分数据都是有序的，再次全量同步显得没有必要。而在 Redis2.8之后，为了解决这个问题，便使用了<code>psync</code>命令来代替<code>sync</code>。</p><p>简单来说psync命令就是将slave断线期间master接收到的写命令全部发送给slave，slave重放之后状态便与master一致了。</p><blockquote><p>呵呵，就这？那你知道psync具体怎么实现的吗？还是说就只会用用？</p></blockquote><p>psync的实现依赖于主从双方共同维护的<code>offset</code>偏移量。</p><p>每次master向slave进行<strong>命令传播</strong>，传播了多少个字节的数据，就将自己的offset加上传播的字节数。而slave每次收到多少字节的数据，也会同样的更新自己的offset。</p><p>基于offset，只需要简单的比对就知道当前主从的状态是否是一致的了，然后基于offset，将对应偏移量所对应的指令传播给slave重放即可。所以即使同步的时候slave挂掉了，基于offset，也能达到断点续传的效果。</p><blockquote><p>不是吧不是吧，那master也挂了呢？你slave重新启动之后master的数据也更新了，按照你的说法，这两永远不可能达到数据一致了</p></blockquote><p>这个问题Redis的确也有想到，实际上除了offset之外，slave断线重连之后还会带上上一个master的实例的<code>runid</code>，每个服务实例都有自己的唯一的runid，只要Redis服务重启，其<code>runid</code>就会发生改变。</p><p>master收到这个runid之后会判断是否与自己当前的runid一致，如果一致说明断线之前还是与自己建立的连接，而如果不一致就说明slave断线期间，master也发生了宕机，此时就需要将数据<strong>全量同步</strong>给slave了。</p><figure><img src="'+c+'" alt="redis-runid" tabindex="0" loading="lazy"><figcaption>redis-runid</figcaption></figure><blockquote><p>就算你能解决这个问题，但是你就维护了一个偏移量，偏移量对应的命令从哪儿来？天上掉下来吗？我哪儿知道这些命令是啥？</p></blockquote><p>的确，我们需要通过这个offset去拿到真正需要的数据—也就是指令，而Redis是通过<strong>复制积压缓冲区</strong>来实现的。</p><p>名字高大上，实际上就是一队列。就跟什么递归、轮询、透传一样，听着高大上，实际上简单的一匹。言归正传，复制积压缓冲区的默认大小为1M，Redis在进行<strong>命令传播</strong>时，除了将写命令发送给slave，还会将命令写到<strong>复制积压缓冲区</strong>内，并和当前的offset关联起来。这样一来就能够通过offset获取到对应的指令了。</p><figure><img src="'+g+'" alt="redis-backlog" tabindex="0" loading="lazy"><figcaption>redis-backlog</figcaption></figure><p>但是由于缓冲区的大小有限，如果slave的断线时间太久，复制积压缓冲区内早些时候的指令就已经被新的指令覆盖掉了，此处可以理解为一个队列，早些时候入队的元素已经被出队了。</p><p>由于没有相对应的offset了，也就无法获取指令数据，此时Redis就会进行<strong>全量同步</strong>。当然，如果offset还存在于复制积压缓冲区中，则按照对应的offset进行<strong>部分同步</strong>。</p><p>基于以上的全量、增量的主从复制，能够在master出现故障的情况下，进行主从的切换，保证服务的正常运行。除此之外还能解决异常情况下数据丢失的问题。基于读写分离的策略还能够提高整个Redis服务的并发量。</p><blockquote><p>可别吹了，你说的这个什么<strong>主从复制</strong>就没啥缺点吗？</p></blockquote><p>其实是有的，例如刚刚提到的主从的切换，如果不用现成的<strong>HA</strong>框架，这个过程需要程序员自己手动的完成，同时通知服务调用方Redis的IP发生了变化，这个过程可以说是十分的复杂，甚至还可能涉及到代码配置的改动。而且之前的slave复制的可都是挂掉的master，还得去slave上更改其复制的主库，就更加复杂了。</p><p>除此之外，虽然实现了读写分离，但是由于是<strong>一主多从</strong>的架构，集群的<strong>读请求</strong>可以扩展，但是<strong>写请求</strong>的并发是有上限的，那就是master能够扛住的上限，这个没有办法扩展。</p><p>好了，本期的分享就到此结束了，我们下期再见。</p>',42);function b(k,q){const o=n("ExternalLinkIcon");return i(),a("div",null,[m,e("blockquote",null,[u,e("ul",null,[e("li",null,[e("p",null,[e("a",R,[s("Redis基础—剖析基础数据结构及其用法"),t(o)])])]),e("li",null,[e("p",null,[e("a",v,[s("Redis基础—了解Redis是如何做数据持久化的"),t(o)])])])])]),_])}const x=r(f,[["render",b],["__file","230817.html.vue"]]);export{x as default};
