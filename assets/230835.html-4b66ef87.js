import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o,c as i,f as n}from"./app-694c8dd2.js";const g="/images/230835/cpu-command.jpeg",r="/images/230835/4-level-command-permission.jpeg",e="/images/230835/protection-rings.jpeg",s="/images/230835/ring0-ring3.jpeg",p="/images/230835/system-call.jpeg",c={},a=n('<h1 id="用户态和内核态的区别是啥" tabindex="-1"><a class="header-anchor" href="#用户态和内核态的区别是啥" aria-hidden="true">#</a> 用户态和内核态的区别是啥</h1><blockquote><p>这篇文章的深度不会太深，重点就是了解一下用户态和内核态的区别就 OK 了。</p></blockquote><p>先给不了解内核态、用户态的简单介绍一下，我们在什么时候会提到这两个概念。</p><p>例如我们的<strong>应用程序</strong>需要从磁盘读取某个文件的数据，此时并不是直接从磁盘加载到应用内存中，而是：</p><ul><li>先将数据从「磁盘」复制到「内核 Buffer」</li><li>再将数据从「内核 Buffer」复制到「用户 Buffer」</li></ul><p>以上就是<strong>用户态</strong>和<strong>内核态</strong>的概念。首先我们给他下个定义，这两个<strong>态</strong>是操作系统的<strong>运行级别</strong>。</p><p>然后我们知道，我们写的程序，最终<strong>运行</strong>的时候实际都会被编译、解释成一条一条的 CPU 指令被 CPU 执行。</p><figure><img src="'+g+'" alt="解释成一条一条的指令" tabindex="0" loading="lazy"><figcaption>解释成一条一条的指令</figcaption></figure><p>用户态、内核态的指令都是 CPU 都在执行，所以我们可以换个说法，实际上这个态代表的是<strong>当前 CPU 的状态</strong>。那既然这些指令最终都由 CPU 执行，那对其区分的理由是什么呢？</p><p>那是因为，CPU 指令根据其重要的程度，也分为不同的权限。有一些指令执行失败了无关痛痒，而有一些指令失败了会导致整个操作系统崩溃，甚至需要重启系统。如果将这些指令<strong>随意</strong>开放给应用程序的话，整个系统崩溃的概率将会大大的增加。</p><p>再举个类似的例子。我们设计一个类，里面有几个很重要的变量，你大概率是不会把它们声明成 <code>public</code> 的吧？应该声明成 <code>private</code>，并开发几个专门修改他们的方法，对传入的值进行一系列的校验之后再去设置。</p><p>上面说到，CPU 指令是做了权限划分的， 例如 Intel X86 中将 CPU 指令权限划分为了 4 个等级：</p><figure><img src="'+r+'" alt="权限分类" width="500" tabindex="0" loading="lazy"><figcaption>权限分类</figcaption></figure><p>它们之间的权限的高低程度可以通过这张图来识别：</p><figure><img src="'+e+'" alt="图片来源于网络，侵删" width="450" tabindex="0" loading="lazy"><figcaption>图片来源于网络，侵删</figcaption></figure><blockquote><p>上图中的 IA 指的是 Intel Architecture</p></blockquote><p>所以可以看到，越靠近的核心的权限越高。换句话说，权限由高到低为：Ring0 &gt; Ring1 &gt; Ring2 &gt; Ring3</p><p>在 Linux 系统中，由于只有 Ring0 和 Ring3 级别的指令，所以我们可以对用户态、内核态给一个<strong>更细节的区别描述</strong>：运行 Ring0 级别指令的叫<strong>内核态</strong>，运行 Ring3 级别指令的叫<strong>用户态</strong>。</p><figure><img src="'+s+'" alt="内核态用户态" width="600" tabindex="0" loading="lazy"><figcaption>内核态用户态</figcaption></figure><p>了解了指令集权限的概念，我们就可以再更正一下上面的描述：什么<strong>态</strong>实际上代表的是<strong>当前 CPU 正在执行什么级别的指令</strong></p><p>知道了用户态和内核态的区别、以及为什么要对其进行区别之后，我们就可以来看什么时候会从用户态切换到内核态了。</p><blockquote><p>答案是发生系统调用的时候</p></blockquote><p>那什么又是系统调用呢？看这张图</p><figure><img src="'+p+'" alt="系统调用 (1)" width="600" tabindex="0" loading="lazy"><figcaption>系统调用 (1)</figcaption></figure><p>当用户态的程序需要向操作系统申请更高权限的服务时，就通过<strong>系统调用</strong>向内核发起请求。</p><p>内核自然也会提供很多的接口来供调用，例如<strong>申请动态内存空间</strong>。但是申请了内存是不是还得考虑释放内存？如果把这块内存管理交给应用程序的话，复杂的管理工作会给开发带来很多负担。</p><p>所以<strong>库函数</strong>就是用于屏蔽掉内部复杂的细节的，我们的应用程序可以通过库函数来调用内核的提供的接口，而库函数就会发起<strong>系统调用</strong>，发起了系统调用之后，用户态就会切换成内核态去执行对应的内核方法。</p><blockquote><p>除了系统调用之外，还有另外两种会导致态的切换：发生异常、中断。</p></blockquote>',28),l=[a];function f(u,d){return o(),i("div",null,l)}const h=t(c,[["render",f],["__file","230835.html.vue"]]);export{h as default};
