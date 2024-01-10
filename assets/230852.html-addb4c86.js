import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as s,f as n}from"./app-6d5c7683.js";const o="/images/230852/img-1.jpeg",t="/images/230852/img-2.jpeg",i="/images/230852/img-3.jpeg",r="/images/230852/img-6.png",p="/images/230852/img-4.jpeg",c="/images/230852/img-5.gif",d="/images/230852/img-7.jpeg",l="/images/230852/img-8.jpeg",u={},g=n('<h1 id="简单了解一下k8s-并搭建自己的集群" tabindex="-1"><a class="header-anchor" href="#简单了解一下k8s-并搭建自己的集群" aria-hidden="true">#</a> 简单了解一下K8S，并搭建自己的集群</h1><p>距离上次更新已经有一个月了，主要是最近工作上的变动有点频繁，现在才暂时稳定下来。这篇博客的本意是带大家从零开始搭建K8S集群的。但是我后面一想，如果是我看了这篇文章，会收获什么？就是跟着步骤一步一走吗？是我的话我会选择拒绝，所以我加了关于K8S的简单介绍，每一步的步骤都添加了解释。由于篇幅和时间原因，我只介绍了K8S中较为核心的Pod和Service。</p><p>文章前半段会简单的介绍一下K8S，后半段会介绍如何从零开始慢慢的搭建集群。如果想直接开始着手搭建集群，则可以直接从<strong>第三章</strong>开始看。</p><h2 id="_1-k8s是什么" tabindex="-1"><a class="header-anchor" href="#_1-k8s是什么" aria-hidden="true">#</a> 1. K8S是什么</h2><p>K8S全称kubernetes，是由Google在2014年开源的<strong>生产级别</strong>的容器编排系统，或者说是<strong>微服务和云原生平台</strong>。虽说14年才开源，但实际上K8S是Google内部的容器编排系统Borg的开源版本，在Google内部已经用了十多年了。下面是一个关于K8S的Logo来源的小插曲。</p><blockquote><p>Kubernetes由谷歌在2014年首次对外宣布 。它的开发和设计都深受谷歌的Borg系统的影响，它的许多顶级贡献者之前也是Borg系统的开发者。在谷歌内部，Kubernetes的原始代号曾经是Seven，即星际迷航中友好的Borg(博格人)角色。Kubernetes标识中舵轮有七个轮辐就是对该项目代号的致意。</p></blockquote><p>不过也有一个说法是，Docker的Logo是一个驮着集装箱的鲸鱼，也就是运输船，K8S的Logo是一个船舵，旨在引领着Docker（或者说容器技术）走向远方。</p><h2 id="_2-简单了解k8s" tabindex="-1"><a class="header-anchor" href="#_2-简单了解k8s" aria-hidden="true">#</a> 2. 简单了解K8S</h2><p>看了很多官方文章，是真<strong>官方</strong>。官方什么意思呢，就是有可能看完了约等于没有看，一样的啥都不知道。</p><p>所以我想写这样一篇文章，给那些看完文档仍然不太理解或者说完全没了解过K8S的老铁一点小帮助。那么让我们回到最初对K8S的<strong>定义</strong>，它是一个微服务框架。</p><p>说到微服务框架，我们就不得不提一下目前业界十分主流的微服务框架，与这些你十分熟悉的框架进行对比，你就会很清晰的知道K8S能做什么了。目前很主流的微服务框架和平台有Spring Cloud、Dubbo和K8S。</p><p>Spring Cloud来自Netflix，Dubbo来自阿里，而K8S则来自Google。说的直观一点，这三个框架都是针对微服务的解决方案。可能有人会说，K8S不是一个容器编排系统吗？怎么跟Spring Cloud这种软件层面上的微服务框架做起了对比呢？</p><p>老铁别慌，等我们慢慢深入这个概念。</p><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我们都知道，如果我们需要使用微服务，那么肯定少不了一些底层的基础设施的支撑，例如服务注册与发现、负载均衡、日志监控、配置管理、集群自愈和容错、弹性伸缩...等等。我没有列举完，如其实这些组件都可以统称为微服务的<strong>公共关注点</strong>。那我们是不是可以说，只要能够提供的这些功能，它就算一个微服务框架呢？</p><p>以上的大多数功能，K8S都是内置的。故我们可以说K8S是一个与Docker Swarm相类似的容器编排系统，但是由于K8S内置了微服务的解决方案，它同时也是一个功能完备的微服务框架。</p><h3 id="_2-1-pod的概念" tabindex="-1"><a class="header-anchor" href="#_2-1-pod的概念" aria-hidden="true">#</a> 2.1 Pod的概念</h3><p>在Docker Swarm中，调度的最小单位是容器，而在K8S中，调度的最小是<strong>Pod</strong>，那啥是Pod呢？</p><p>Pod是K8S设计的一个全新的概念，在英文中的原意是表达一群鲸鱼或者是一个豌豆荚的意思。换句话说，一个Pod中可以运行一个或者多个容器。</p><p>在一个集群中，K8S会为每个Pod都分配一个集群内唯一的IP地址。因为K8S要求底层网络支持集群内的任意节点之间的两个Pod能够直接通信。这些容器共享当前Pod的文件系统和网络。而这些容器之所以能够共享，是因为Pod中有一个叫Pause的根容器，其余的用户业务容器都是共享这个根容器的<strong>IP和Volume</strong>。所以这些容器之间都可以通过localhost进行通信。</p><p>有人可能会问，为什么要引入根容器这个概念？那是因为如果没有根容器的话，当一个Pod中引入了多个容器的时候，我们应该用哪一个容器的状态来判断Pod的状态呢？所以才要引入与业务无关且不容易挂掉的Pause容器作为根容器，用根容器的状态来代表<strong>整个容器的状态</strong>。</p><p>熟悉Spring Cloud或者微服务的都知道，微服务中最忌讳的就是出现单点的情况。</p><p>所以针对同一个服务我们一般会部署2个或者更多个实例。在K8S中，则是会部署多个Pod副本，组成一个Pod集群来对外提供服务。</p><p>而我们前面提过，K8S会为每一个Pod提供一个唯一的IP地址，客户端就需要通过每个Pod的唯一IP+容器端口来访问到具体的Pod，这样一来，如果客户端把调用地址写死，服务器就没有办法做负载均衡，而且，Pod重启之后IP地址是会变的，难道每次重启都要通知客户端IP变更吗？</p><p>为了解决这个问题，就要引出<strong>Service</strong>的概念了。</p><h3 id="_2-2-service" tabindex="-1"><a class="header-anchor" href="#_2-2-service" aria-hidden="true">#</a> 2.2 Service</h3><p>Service是K8S中最核心的资源对象之一，就是用于解决上面提到的问题。我个人认为与Swarm中的Service概念没有太大的区别。</p><p>一旦Service被创建，K8S会为其分配一个集群内唯一的IP，叫做<strong>ClusterIP</strong>，而且在Service的整个生命周期中，ClusterIP不会发生变更，这样一来，就可以用与Docker Swarm类似的操作，建立一个ClusterIP到服务名的DNS域名映射即可。</p><p>值得注意的是，ClusterIP是一个虚拟的IP地址，无法被Ping，仅仅只限于在K8S的集群内使用。</p><p>而Service对客户端，屏蔽了底层Pod的寻址的过程。并且由kube-proxy进程将对Service的请求转发到具体的Pod上，具体到哪一个，由具体的调度算法决定。这样以来，就实现了负载均衡。</p><p>而Service是怎么找到Pod的呢？这就需要继续引入另外一个核心概念<strong>Label</strong>了。</p><h3 id="_2-3-label" tabindex="-1"><a class="header-anchor" href="#_2-3-label" aria-hidden="true">#</a> 2.3 Label</h3><p>Lable本质上是一个键值对，具体的值由用户决定。Lable就是标签，可以打在Pod上，也可以打到Service上。总结来说，Label与被标记的资源是一个一对多的关系。</p><p>例如，我们给上面所描述的Pod打上了<code>role=serviceA</code>的标签，那么只需要在Service中的<strong>Label Selector</strong>中加入刚刚那个标签，这样一来，Service就可以通过Label Selector找到打了同一Label的Pod副本集了。</p><p>接下来，再简单的介绍一下其他的K8S核心概念。</p><h3 id="_2-4-replica-set" tabindex="-1"><a class="header-anchor" href="#_2-4-replica-set" aria-hidden="true">#</a> 2.4 Replica Set</h3><p>上面提到过部署多个Pod，是怎么一回事呢？K8S最开始有一个概念叫Replication Controller，不过现在已经慢慢的被Replica Set所替代，RS也叫下一代的RC。简单来说<strong>Replica Set</strong>定义了一种期望的场景，即让任何时候集群内的Pod副本数量都符合预期的值。</p><p>一旦被创建，集群就会定期的检测当前存活的Pod数量，如果多了，集群就会停掉一些Pod。相反，如果少了就会创建一些Pod。这样一来可以避免什么问题呢？假设某个服务有两个实例在运行，其中一个意外挂掉了，如果我们设置了副本数量是2，那么集群就会自动创建一个Pod，以保证集群内始终有两个Pod在运行。</p><p>K8S的东西就简单的介绍这么多，接下来让我们进入集群的搭建环节。</p><h2 id="_3-搭建k8s的准备工作" tabindex="-1"><a class="header-anchor" href="#_3-搭建k8s的准备工作" aria-hidden="true">#</a> 3. 搭建K8S的准备工作</h2><p>不知道从哪篇博客开始，不是很愿意写这种纯TODO类的博文，但是我自己躺坑之后发现，我自己这个还真是我目前见过最简单的。</p><p>我看到的有些安装分了很多种情况，但是当一个初学者来看的时候，可能反而会让他看懵逼。所以接下来的安装会有些硬核。不分情况，就只有一种情况，一把梭安装就完事。</p><blockquote><p>系统 版本 Ubuntu 18.04</p><p>K8S 版本 v1.16.3</p><p>Docker 版本 v19.03.5</p><p>Flannel 版本 v0.11.0</p></blockquote><p>如果你问我，<em>如果没有机器看了你的文章也能的拥有自己的集群吗</em>？那么请看下图...</p><figure><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-1-准备工作" tabindex="-1"><a class="header-anchor" href="#_3-1-准备工作" aria-hidden="true">#</a> 3.1 准备工作</h3><p>我们先假设以下的情况成立。</p><blockquote><p>机器：有2-3台物理机或虚拟机</p><p>系统：Ubuntu 18.04 且已换好国内的源</p></blockquote><p>如果以上基本不成立，本篇文章到此结束，谢谢观看...</p><figure><img src="'+i+`" alt="" width="400" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-2-安装docker" tabindex="-1"><a class="header-anchor" href="#_3-2-安装docker" aria-hidden="true">#</a> 3.2 安装Docker</h3><p>我也不需要介绍各种情况了，直接登上机器，创建一个shell脚本，例如叫<code>install_docker.sh</code>，一把梭代码如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> apt-transport-https ca-certificates 
<span class="token function">curl</span> gnupg-agent software-properties-common
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token function">sudo</span> apt-key fingerprint 0EBFCD88
<span class="token function">sudo</span> add-apt-repository <span class="token string">&quot;deb [arch=amd64] https://download.docker.com/linux/ubuntu <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> stable&quot;</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行<code>sh install_docker.sh</code>，等待命令跑完，验证docker是否安装好即可。直接敲<code>docker</code> + 回车。</p><h3 id="_3-3-安装kubernetes" tabindex="-1"><a class="header-anchor" href="#_3-3-安装kubernetes" aria-hidden="true">#</a> 3.3 安装Kubernetes</h3><p>同理，新建一个shell脚本，例如<code>install_k8s.sh</code>。一把梭代码如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-s</span> https://packages.cloud.google.com/apt/doc/apt-key.gpg <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span>/etc/apt/sources.list.d/kubernetes.list</span>
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet kubeadm kubectl --allow-unauthenticated
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行<code>sh install_k8s.sh</code>，等待命令跑完，验证k8s是否安装好即可。直接敲<code>kubectl</code> + 回车。</p><h3 id="_3-4-关闭swap" tabindex="-1"><a class="header-anchor" href="#_3-4-关闭swap" aria-hidden="true">#</a> 3.4 关闭Swap</h3><p>先给出一把梭，不要耽误了正在安装的老铁。为什么要关闭后面再说。</p><ul><li>暂时关闭 直接使用命令<code>sudo swapoff -a</code>，但是重启之后会生效。会导致k8s无法正常运行。</li><li>永久关闭 建议<strong>一劳永逸</strong>，<code>sudo vim /etc/fstab</code>将有swap.img那行注释掉，保存即可。</li></ul><p>那么，swap是啥呢？它是系统的交换分区，你可以理解为<strong>虚拟内存</strong>。当系统内存不足的时候，会将一部分硬盘空间虚拟成内存使用。那为什么K8S需要将其关掉呢？可以从下图看看访问内存和访问硬盘速度上的差异就知道了。</p><figure><img src="`+r+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>总的来说是为了<strong>性能</strong>考虑，所以就需要避免开启swap交换，K8S希望所有的服务都不应该超过集群或节点CPU和内存的限制。</p><h2 id="_4-初始化master节点" tabindex="-1"><a class="header-anchor" href="#_4-初始化master节点" aria-hidden="true">#</a> 4. 初始化Master节点</h2><p>到这，准备工作就完成了，可以开始安装K8S的master节点了，登上要作为master节点的机器。</p><h3 id="_4-1-设置hostname" tabindex="-1"><a class="header-anchor" href="#_4-1-设置hostname" aria-hidden="true">#</a> 4.1 设置HostName</h3><p>老规矩，先上命令，再说为什么要设置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> hostnamectl set-hostname master-node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>自定义修改了主机名，在之后查看集群内节点时，每个节点的名字就不会显示K8S自动生成的名字，便于查看和记忆。例如，在其他的Node节点你可以将<code>master-node</code>改为<code>slave-node-1</code>或<code>worker-node-2</code>，效果如下。</p><figure><img src="`+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_4-2-初始化集群" tabindex="-1"><a class="header-anchor" href="#_4-2-初始化集群" aria-hidden="true">#</a> 4.2 初始化集群</h3><p>在机器上执行如下命令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> kubeadm init --pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，抱起吉他，等待命令执行完。</p><figure><img src="`+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里需要<strong>特别注意</strong>一下。这个命令执行完成之后，会打印一个有<strong>kubeadm join</strong>的命令，需要保存下来。</p><p>大概长这样。</p><blockquote><p>kubeadm join 你的IP地址:6443 --token 你的TOKEN --discovery-token-ca-cert-hash sha256:你的CA证书哈希</p></blockquote><p>顾名思义，这个命令用于其他节点加入到集群中，而且Token是有时效性的，过期时间一般是<strong>86400000毫秒</strong>。</p><figure><img src="'+d+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果失效，就需要重新生成。如果你真的又没有保存，又失效了...我还是给你准备了两个补救措施。如果命令保存下来了，那么请直接<strong>跳过</strong>这两个补救措施。</p><blockquote><p>token. 通过命令<code>Kubeadm token list</code>找回</p><p>ca-cert. 执行命令<code>openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2&gt;/dev/null | openssl dgst -sha256 -hex | sed &#39;s/^.* //&#39;</code>找回</p></blockquote><h3 id="_4-3-普通用户可执行" tabindex="-1"><a class="header-anchor" href="#_4-3-普通用户可执行" aria-hidden="true">#</a> 4.3 普通用户可执行</h3><p>把下面的指令一把梭即可。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要是，为了不那么麻烦，在控制节点上执行<code>kubectl</code>这类的命令时，不用每次都sudo。</p><h3 id="_4-4-安装网络通信插件" tabindex="-1"><a class="header-anchor" href="#_4-4-安装网络通信插件" aria-hidden="true">#</a> 4.4 安装网络通信插件</h3><p>执行如下命令，安装网络插件Flannel。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到，如果不安装Flannel，我们刚刚Init好的Master节点会处于<strong>NOT_READY</strong>的状态。安装好之后，可以通过命令<code>kubectl get nodes</code>来查看所有的节点的状态。也可以通过<code>kubectl get pods --all-namespaces</code>来查看当前集群中所有Pod的状态。这里需要注意的是，只有在master节点是<strong>READY</strong>，所有Pod的状态是<strong>RUNNING</strong>之后，才可以进行下一步。</p><p>为什么要装网络插件呢？</p><p>那是因为K8S要求集群内的所有节点之间的Pod网络是互通的。换句话说，Flannel可以让集群内不同节点上的容器都有一个在<strong>当前集群</strong>内唯一的虚拟IP地址。这样以来，就可以实现，跨节点的Pod与Pod直接通信。</p><p>这样一来，将复杂的网络通信，简单的变成了两个IP地址之间的通信。这主要是通过虚拟二层网络实现的。看似是这个节点的Pod直接和另一个节点上的Pod进行了通信，最终还是通过节点的物理网卡流出的。</p><h2 id="_5-slave节点加入集群" tabindex="-1"><a class="header-anchor" href="#_5-slave节点加入集群" aria-hidden="true">#</a> 5. Slave节点加入集群</h2><p>到此，一个单点的集群就已经搭建好了。现在我们要做的是，登录准备好的另一台（我只有两台，如果你有3台或者4天，把这个章节反复走几次就好了）服务器。</p><h3 id="_5-1-设置hostname" tabindex="-1"><a class="header-anchor" href="#_5-1-设置hostname" aria-hidden="true">#</a> 5.1 设置HostName</h3><p>执行如下命令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> hostnamectl set-hostname slave-node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>因为当前节点不是master了，所以主机名设置成了slave-node。</p><h3 id="_5-2-加入集群" tabindex="-1"><a class="header-anchor" href="#_5-2-加入集群" aria-hidden="true">#</a> 5.2 加入集群</h3><p>重点来了，执行上一章节生成的<strong>kubeadm join</strong>命令即可。等待执行完毕之后，就可以在master节点上通过命令<code>kubectl get nodes</code>看到slave-node已经加入了集群。</p><p>对于Slave节点的操作就没了。</p><figure><img src="`+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_6-感谢阅读" tabindex="-1"><a class="header-anchor" href="#_6-感谢阅读" aria-hidden="true">#</a> 6. 感谢阅读</h2><p>关于K8S就简单的介绍到这里，由于篇幅和时间的原因，很多概念都没有介绍，例如Deployment、Volume、ConfigMap等等。仅仅只介绍了较为核心的Pod和Service，以及相关的东西。毕竟，如果想要把K8S的核心理念介绍完，一篇博客的篇幅是肯定不够的，后面我再单独详细的介绍吧。</p><p>第一次在博客里求赞啊，之前完全是随缘。不过我后来发现，打开博客看到大家的点赞和留言，这对我来说是一种<strong>莫大的鼓励</strong>。</p>',107),h=[g];function b(k,m){return e(),s("div",null,h)}const _=a(u,[["render",b],["__file","230852.html.vue"]]);export{_ as default};
