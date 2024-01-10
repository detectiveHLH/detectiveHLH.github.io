import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as p,c as i,a as e,b as o,d as t,f as n}from"./app-e58d90a2.js";const d="/images/230856/stat-structure.jpeg",g="/images/230856/acl.jpeg",l="/images/230856/get-acl.jpeg",c="/images/230856/ephemeral-owner.jpeg",h="/images/230856/watcher.jpeg",u="/images/230856/zab-character.jpeg",k="/images/230856/zxid.jpeg",m="/images/230856/2pc-in-proposal.jpeg",Z={},b=e("h1",{id:"深入了解zookeeper核心原理",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#深入了解zookeeper核心原理","aria-hidden":"true"},"#"),o(" 深入了解Zookeeper核心原理")],-1),f={href:"https://mp.weixin.qq.com/s/jCmS6VvlFmjm2RWgqlpUqg",target:"_blank",rel:"noopener noreferrer"},x=e("strong",null,"皮毛",-1),_=e("strong",null,"核心底层原理",-1),L=n('<h2 id="znode" tabindex="-1"><a class="header-anchor" href="#znode" aria-hidden="true">#</a> ZNode</h2><p>这个应该算是Zookeeper中的基础，数据存储的最小单元。在Zookeeper中，类似文件系统的存储结构，被Zookeeper抽象成了树，树中的每一个节点（Node）被叫做<strong>ZNode</strong>。ZNode中维护了一个数据结构，用于记录ZNode中数据更改的<strong>版本号</strong>以及<strong>ACL</strong>（Access Control List）的变更。</p><p>有了这些数据的<strong>版本号</strong>以及其更新的<strong>Timestamp</strong>，Zookeeper就可以验证客户端请求的缓存是否合法，并协调更新。</p><p>而且，当Zookeeper的客户端执行<strong>更新</strong>或者删除操作时，都必须要带上要修改的对应数据的版本号。如果Zookeeper检测到对应的版本号不存在，则不会执行这次更新。如果合法，在ZNode中数据更新之后，其对应的版本号也会<strong>一起更新</strong>。</p><blockquote><p>这套版本号的逻辑，其实很多框架都在用，例如RocketMQ中，Broker向NameServer注册的时候，也会带上这样一个版本号，叫<code>DateVersion</code>。</p></blockquote><p>接下来我们来详细看一下这个维护版本号相关数据的数据结构，它叫<code>Stat Structure</code>，其字段有：</p><table><thead><tr><th>字段</th><th>释义</th></tr></thead><tbody><tr><td>czxid</td><td>创建该节点的zxid</td></tr><tr><td>mzxid</td><td>最后一次修改该节点的zxid</td></tr><tr><td>pzxid</td><td>最后一次修改该节点的子节点的zxid</td></tr><tr><td>ctime</td><td>从当前epoch开始到该节点被创建，所间隔的毫秒</td></tr><tr><td>mtime</td><td>从当前epoch开始到该节点最后一次被编辑，所间隔的毫秒</td></tr><tr><td>version</td><td>当前节点的改动次数（也就是版本号）</td></tr><tr><td>cversion</td><td>当前节点的子节点的改动次数</td></tr><tr><td>aversion</td><td>当前节点的ACL改动次数</td></tr><tr><td>ephemeralOwner</td><td>当前临时节点owner的SessionID（如果不是临时节点则为空）</td></tr><tr><td>dataLength</td><td>当前节点的数据的长度</td></tr><tr><td>numChildren</td><td>当前节点的子节点数量</td></tr></tbody></table><p>举个例子，通过<code>stat</code>命令，我们可以查看某个ZNode中Stat Structure具体的值。</p><figure><img src="'+d+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>关于这里的epoch、zxid是Zookeeper集群相关的东西，后面会详细的对其进行介绍。</p><h2 id="acl" tabindex="-1"><a class="header-anchor" href="#acl" aria-hidden="true">#</a> ACL</h2><p>ACL（Access Control List）用于控制ZNode的相关权限，其权限控制和Linux中的类似。Linux中权限<strong>种类</strong>分为了三种，分别是<strong>读</strong>、<strong>写</strong>、<strong>执行</strong>，分别对应的字母是r、w、x。其权限粒度也分为三种，分别是<strong>拥有者权限</strong>、<strong>群组权限</strong>、<strong>其他组权限</strong>，举个例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>drwxr-xr-x  3 USERNAME  GROUP  1.0K  3 15 18:19 dir_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>什么叫<strong>粒度</strong>？粒度是对权限所作用的对象的分类，把上面三种粒度换个说法描述就是**对用户（Owner）、用户所属的组（Group)、其他组（Other）**的权限划分，这应该算是一种权限控制的标准了，典型的三段式。</p><p>Zookeeper中虽然也是三段式，但是两者对粒度的划分存在区别。Zookeeper中的三段式为<strong>Scheme、ID、Permissions</strong>，含义分别为权限机制、允许访问的用户和具体的权限。</p><figure><img src="`+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Scheme代表了一种权限模式，有以下5种类型：</p><ul><li><strong>world</strong> 在此中Scheme下，<code>ID</code>只能是<code>anyone</code>，代表所有人都可以访问</li><li><strong>auth</strong> 代表已经通过了认证的用户</li><li><strong>digest</strong> 使用用户名+密码来做校验。</li><li><strong>ip</strong> 只允许某些特定的IP访问ZNode</li><li><strong>X509</strong> 通过客户端的证书进行认证</li></ul><p>同时权限种类也有五种：</p><ul><li><strong>CREATE</strong> 创建节点</li><li><strong>READ</strong> 获取节点或列出其子节点</li><li><strong>WRITE</strong> 能设置节点的数据</li><li><strong>DELETE</strong> 能够删除子节点</li><li><strong>ADMIN</strong> 能够设置权限</li></ul><p>同Linux中一样，这个权限也有缩写，举个例子：</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><code>getAcl</code>方法用户查看对应的ZNode的权限，如图，我们可以输出的结果呈三段式。分别是：</p><ul><li><strong>scheme</strong> 使用了world</li><li><strong>id</strong> 值为<code>anyone</code>，代表所有用户都有权限</li><li><strong>permissions</strong> 其具体的权限为cdrwa，分别是<strong>C</strong>REATE、<strong>D</strong>ELETE、<strong>R</strong>EAD、<strong>W</strong>RITE和<strong>A</strong>DMIN的缩写</li></ul><h2 id="session机制" tabindex="-1"><a class="header-anchor" href="#session机制" aria-hidden="true">#</a> Session机制</h2><p>了解了Zookeeper的Version机制，我们可以继续探索Zookeeper的<strong>Session机制</strong>了。</p><p>我们知道，Zookeeper中有4种类型的节点，分别是持久节点、持久顺序节点、临时节点和临时顺序节点。</p><p>在之前的文章我们聊到过，客户端如果创建了临时节点，并在之后断开了连接，那么所有的临时节点就都会被<strong>删除</strong>。实际上<strong>断开连接</strong>的说话不是很精确，应该是说客户端建立连接时的<strong>Session过期</strong>之后，其创建的所有临时节点就会被全部删除。</p><p>那么Zookeeper是怎么知道哪些临时节点是由当前客户端创建的呢？</p><blockquote><p>答案是Stat Structure中的**ephemeralOwner（临时节点的Owner）**字段</p></blockquote><p>上面说过，如果当前是<strong>临时顺序节点</strong>，那么<code>ephemeralOwner</code>则存储了创建该节点的Owner的SessionID，有了SessionID，自然就能和对应的客户端匹配上，当Session失效之后，才能将该客户端创建的所有临时节点<strong>全部删除</strong>。</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>对应的服务在创建连接的时候，必须要提供一个带有所有服务器、端口的字符串，单个之间<strong>逗号相隔</strong>，举个例子。</p><blockquote><p>127.0.0.1:3000:2181,127.0.0.1:2888,127.0.0.1:3888</p></blockquote><p>Zookeeper的客户端收到这个字符串之后，会从中随机选一个服务、端口来建立连接。如果连接在之后断开，客户端会从字符串中选择下一个服务器，继续尝试连接，直到连接成功。</p><p>除了这种最基本的IP+端口，在Zookeeper的<strong>3.2.0</strong>之后的版本中还支持连接串中带上路径，举个例子。</p><blockquote><p>127.0.0.1:3000:2181,127.0.0.1:2888,127.0.0.1:3888/app/a</p></blockquote><p>这样一来，<code>/app/a</code>就会被当成当前服务的根目录，在其下创建的所有的节点路经都会带上前缀<code>/app/a</code>。举个例子，我创建了一个节点<code>/node_name</code>，那其完整的路径就会为<code>/app/a/node_name</code>。这个特性特别适用于多租户的环境，对于每个租户来说，都认为自己是最顶层的根目录<code>/</code>。</p><p>当Zookeeper的客户端和服务器都建立了连接之后，客户端会拿到一个64位的SessionID和密码。这个密码是干什么用的呢？我们知道Zookeeper可以部署多个实例，如果客户端断开了连接又和另外的Zookeeper服务器建立了连接，那么在建立连接使就会带上这个密码。该密码是Zookeeper的一种安全措施，所有的Zookeeper节点都可以对其进行验证。这样一来，即使连接到了其他Zookeeper节点，Session同样有效。</p><p>Session<strong>过期</strong>有两种情况，分别是：</p><ul><li>过了指定的失效时间</li><li>指定时间内客户端没有发送心跳</li></ul><p>对于第一种情况，<strong>过期时间</strong>会在Zookeeper客户端建立连接的时候传给服务器，这个过期时间的范围目前只能在2倍<code>tickTime</code>和20倍<code>tickTime</code>之间。</p><blockquote><p>ticktime是Zookeeper服务器的配置项，用于指定客户端向服务器发送心跳的间隔，其默认值为<code>tickTime=2000</code>，单位为<strong>毫秒</strong></p></blockquote><p>而这套Session的过期逻辑由Zookeeper的服务器维护，一旦Session过期，服务器会<strong>立即删除</strong>由Client创建的所有临时节点，然后<strong>通知</strong>所有正在监听这些节点的客户端相关变更。</p><p>对于第二种情况，Zookeeper中的心跳是通过<strong>PING请求</strong>来实现的，每隔一段时间，客户端都会发送PING请求到服务器，这就是心跳的本质。心跳使服务器感知到客户端还活着，同样的让客户端也感知到和服务器的连接仍然是有效的，这个间隔就是**<code>tickTime</code>**，默认为2秒。</p><h2 id="watch机制" tabindex="-1"><a class="header-anchor" href="#watch机制" aria-hidden="true">#</a> Watch机制</h2><p>了解完ZNode和Session，我们终于可以来继续下一个关键功能Watch了，在上面的内容中也不止一次的提到**监听（Watch）**这个词。首先用一句话来概括其作用</p><blockquote><p>给某个节点注册监听器，该节点一旦发生变更（例如更新或者删除），监听者就会收到一个Watch Event</p></blockquote><p>和ZNode中有多种类型一样，Watch也有多种类型，分别是一次性Watch和永久性Watch。</p><ul><li><strong>一次性Watch</strong> 在被触发之后，该Watch就会移除</li><li><strong>永久性Watch</strong> 在被触发之后，仍然保留，可以继续监听ZNode上的变更，是Zookeeper 3.6.0版本新增的功能</li></ul><p>一次性的Watch可以在调用<code>getData()</code>、<code>getChildren()</code>和<code>exists()</code>等方法时在参数中进行设置，永久性的Watch则需要调用<code>addWatch()</code>来实现。</p><p>并且一次性的Watch会<strong>存在问题</strong>，因为在Watch触发的事件到达客户端、再到客户端设立新的Watch，是有一个时间间隔的。而如果在这个时间间隔中发生的变更，客户端则无法感知。</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="zookeeper集群架构" tabindex="-1"><a class="header-anchor" href="#zookeeper集群架构" aria-hidden="true">#</a> Zookeeper集群架构</h2><h3 id="zab协议" tabindex="-1"><a class="header-anchor" href="#zab协议" aria-hidden="true">#</a> ZAB协议</h3><p>把前面的都铺垫好之后就可以来从整体架构的角度再深入了解Zookeeper。Zookeeper为了保证其<strong>高可用</strong>，采用的基于主从的<strong>读写分离</strong>架构。</p><blockquote><p>我们知道在类似的Redis主从架构中，节点之间是采用的<strong>Gossip</strong>协议来进行通信的，那么在Zookeeper中通信协议是什么？</p></blockquote><p>答案是**ZAB（Zookeeper Atomic Broadcast）**协议。</p><p>ZAB协议是一种<strong>支持崩溃恢复</strong>的的<strong>原子广播</strong>协议，用于在Zookeeper之间传递消息，使所有的节点都保持同步。ZAB同时具有高性能、高可用的、容易上手、利于维护的特点，同时支持自动的故障恢复。</p><p>ZAB协议将Zookeeper集群中的节点划分成了三个角色，分别是<strong>Leader</strong>、<strong>Follower</strong>和<strong>Observer</strong>，如下图：</p><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>总的来说，这套架构和Redis主从或者MySQL主从的架构类似（感兴趣的也可以去看之前的写的文章，都有聊过）</p>',62),w={href:"https://mp.weixin.qq.com/s/VJTBmAB-A1aRT9DR6v5gow",target:"_blank",rel:"noopener noreferrer"},z={href:"https://mp.weixin.qq.com/s/xejfrjc1CO0r8uBT-_vpag",target:"_blank",rel:"noopener noreferrer"},A=n('<p>不同点在于，通常的主从架构中存在两种角色，分别是Leader、Follower（或者是Master、Slave），但Zookeeper中多了一个Observer。</p><blockquote><p>那问题来了，Observer和Follower的区别是啥呢？</p></blockquote><p>本质上来说两者的功能是一样的， 都为Zookeeper提供了横向扩展的能力，使其能够扛住更多的并发。但区别在于Leader的选举过程中，Observer<strong>不参与投票选举</strong>。</p><h3 id="顺序一致性" tabindex="-1"><a class="header-anchor" href="#顺序一致性" aria-hidden="true">#</a> 顺序一致性</h3><p>上文提到了Zookeeper集群中<strong>是读写分离</strong>的，只有Leader节点能处理写请求，如果Follower节点接收到了写请求，会将该请求转发给Leader节点处理，Follower节点自身是不会处理写请求的。</p><p>Leader节点接收到消息之后，会按照请求的严格顺序一一的进行处理。这是Zookeeper的一大特点，它会保证消息的<strong>顺序一致性</strong>。</p><blockquote><p>举个例子，如果消息A比消息B先到，那么在所有的Zookeeper节点中，消息A都会先于消息B到达，Zookeeper会保证消息的<strong>全局顺序</strong>。</p></blockquote><h3 id="zxid" tabindex="-1"><a class="header-anchor" href="#zxid" aria-hidden="true">#</a> zxid</h3><p>那Zookeeper是如何保证消息的顺序？答案是通过<code>zxid</code>。</p><p>可以简单的把<strong>zxid</strong>理解成Zookeeper中消息的唯一ID，节点之间会通过发送**Proposal（事务提议）**来进行通信、数据同步，proposal中就会带上zxid和具体的数据（<strong>Message</strong>）。而zxid由两部分组成：</p><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><strong>epoch</strong> 可以理解成朝代，或者说Leader迭代的版本，每个Leader的epoch都不一样</li><li><strong>counter</strong> 计数器，来一条消息就会自增</li></ul><p>这也是唯一zxid生成算法的底层实现，由于每个Leader所使用的epoch都是唯一的，而不同的消息在相同的epoch中，counter的值是不同的，这样一来所有的proposal在Zookeeper集群中都有唯一的zxid。</p><h3 id="恢复模式" tabindex="-1"><a class="header-anchor" href="#恢复模式" aria-hidden="true">#</a> 恢复模式</h3><p>正常运行的Zookeeper集群会处于<strong>广播模式</strong>。相反，如果超过半数的节点宕机，就会进入<strong>恢复模式</strong>。</p><blockquote><p>什么是恢复模式？</p></blockquote><p>在Zookeeper集群中，存在两种模式，分别是：</p><ul><li>恢复模式</li><li>广播模式</li></ul><p>当Zookeeper集群故障时会进入<strong>恢复模式</strong>，也叫做Leader Activation，顾名思义就是要在此阶段<strong>选举出Leader</strong>。节点之间会生成zxid和Proposal，然后相互投票。投票是要有原则的，主要有两条：</p><ul><li>选举出来的Leader的zxid一定要是所有的Follower中最大的</li><li>并且已有超过半数的Follower返回了ACK，表示认可选举出来的Leader</li></ul><p>如果在选举的过程中发生异常，Zookeeper会直接进行新一轮的选举。如果一切顺利，Leader就会被成功选举出来，但是此时集群还不能正常对外提供服务，因为新的Leader和Follower之间还没有进行关键的<strong>数据同步</strong>。</p><p>此后，Leader会等待其余的Follower来连接，然后通过Proposal向所有的Follower发送其缺失的数据。</p><blockquote><p>至于怎么知道缺失哪些数据，Proposal本身是要记录日志，通过Proposal中的zxid的低32位的Counter中的值，就可以做一个Diff</p></blockquote><p>当然这里有个优化，如果缺失的数据太多，那么一条一条的发送Proposal效率太低。所以如果Leader发现缺失的数据过多就会将当前的数据<strong>打个快照</strong>，直接打包发送给Follower。</p><p>新选举出来的Leader的Epoch，会在原来的值上+1，并且将Counter重置为0。</p><blockquote><p>到这你是不是以为就完了？实际上到这还是无法正常提供服务</p></blockquote><p><strong>数据同步</strong>完成之后，Leader会发送一个NEW_LEADER的Proposal给Follower，当且仅当该Proposal被过半的Follower返回Ack之后，Leader才会Commit该NEW_LEADER Proposal，集群才能正常的进行工作。</p><p>至此，<strong>恢复模式</strong>结束，集群进入<strong>广播模式</strong>。</p><h3 id="广播模式" tabindex="-1"><a class="header-anchor" href="#广播模式" aria-hidden="true">#</a> 广播模式</h3><p>在广播模式下，Leader接收到消息之后，会向其他所有Follower发送<strong>Proposal（事务提议）</strong>，Follower接收到Proposal之后会返回ACK给Leader。当Leader收到了quorums个ACK之后，当前Proposal就会提交，被应用到节点的内存中去。quorum个是多少呢？</p><p>Zookeeper官方建议每2个Zookeeper节点中，至少有一个需要返回ACK才行，假设有N个Zookeeper节点，那计算公式应该是<code>n/2 + 1</code>。</p><p>这样可能不是很直观，用<strong>大白话</strong>来说就是，<strong>超过半数的Follower</strong>返回了ACK，该Proposal就能够提交，并且应用至内存中的ZNode。</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Zookeeper使用<strong>2PC</strong>来保证节点之间的数据一致性（如上图），但是由于Leader需要跟所有的Follower交互，这样一来通信的开销会变得较大，Zookeeper的性能就会下降。所以为了<strong>提升</strong>Zookeeper的<strong>性能</strong>，才从所有的Follower节点返回ACK变成了<strong>过半的Follower返回ACK</strong>即可。</p>',34);function q(S,E){const r=a("ExternalLinkIcon");return p(),i("div",null,[b,e("p",null,[o("之前的文章"),e("a",f,[o("Zookeeper基础原理&应用场景详解"),t(r)]),o("中将Zookeeper的基本原理及其应用场景做了一个详细的介绍，虽然介绍了其底层的存储原理、如何使用Zookeeper来实现分布式锁。但是我认为这样也仅仅只是了解了Zookeeper的一点"),x,o("而已。所以这篇文章就给大家详细聊聊Zookeeper的"),_,o("。不太熟悉Zookeeper的可以回过头去看看。")]),L,e("ul",null,[e("li",null,[e("a",w,[o("Redis主从"),t(r)])]),e("li",null,[e("a",z,[o("MySQL主从"),t(r)])])]),A])}const v=s(Z,[["render",q],["__file","230856.html.vue"]]);export{v as default};
