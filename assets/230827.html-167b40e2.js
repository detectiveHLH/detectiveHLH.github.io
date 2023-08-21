import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o,c,a as s,b as n,d as e,f as l}from"./app-4842716a.js";const u="/images/230827/instance-name.jpeg",i="/images/230827/rebalance-strategy.jpeg",r="/images/230827/default-strategy.jpeg",k="/images/230827/default-strategy-position.jpeg",d="/images/230827/entry-param.jpeg",m="/images/230827/assign-process.jpeg",g={},v=s("h1",{id:"关于-rocketmq-clientid-相同引发的消息堆积的问题",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#关于-rocketmq-clientid-相同引发的消息堆积的问题","aria-hidden":"true"},"#"),n(" 关于 RocketMQ ClientID 相同引发的消息堆积的问题")],-1),b=s("strong",null,"3月16号",-1),f={href:"https://github.com/apache/rocketmq/commit/44736c3760b9caa0aad21b8df7a3e53bebfd07b8",target:"_blank",rel:"noopener noreferrer"},A={href:"https://mp.weixin.qq.com/s/O1uCGg48UqFhk_SI5JwDzg",target:"_blank",rel:"noopener noreferrer"},y=l('<p>其中讲到了：</p><figure><img src="'+u+'" alt="消息堆积" tabindex="0" loading="lazy"><figcaption>消息堆积</figcaption></figure><p>重复消费自不必说，你 ClientID 都相同了。本篇着重聊聊为什么会<strong>消息堆积</strong>。</p><p>文章中讲到，初始化 Consumer 时，会初始化 <strong>Rebalance</strong> 的策略。你可以大致将 Rebalance 策略理解为如何将一个 Topic 下的 m 个 <strong>MessageQueue</strong> 分配给一个 <strong>ConsumerGroup</strong> 下的 n 个 Consumer 实例的<strong>策略</strong>，看着有些绕，其实就长这样：</p><figure><img src="'+i+'" alt="rebalance策略" tabindex="0" loading="lazy"><figcaption>rebalance策略</figcaption></figure><p>而从 Consumer 初始化的源码中可以看出，默认情况下 Consumer 采取的 Rebalance 策略是 <code>AllocateMessageQueueAverage()</code>。</p><figure><img src="'+r+'" alt="默认的 Rebalance 策略" tabindex="0" loading="lazy"><figcaption>默认的 Rebalance 策略</figcaption></figure><p>默认的策略很好理解，将 MessageQueue 平均的分配给 Consumer。举个例子，假设有 8 个 MessageQueue，2 个 Consumer，那么每个 Consumer 就会被分配到 4 个 MessageQueue。</p><p>那如果分配不均匀怎么办？例如只有 7 个 MessageQueue，但是 Consumer 仍然是 2 个。此时 RocketMQ 会将多出来的部分，对已经排好序的 Consumer 再做平均分配，一个一个分发给 Consumer，直到分发完。例如刚刚说的 7 个 MessageQueue 和 2 个 ConsumerGroup 这种 case，排在第一个的 Consumer 就会被分配到 4 个 MessageQueue，而第二个会被分配到 3 个 MessageQueue。</p><p>大家可以先理解一下 <code>AllocateMessageQueueAveragely</code> 的实现，作为默认的 Rebalance 的策略，其实现位于这里：</p><figure><img src="'+k+'" alt="默认策略的实现位置" tabindex="0" loading="lazy"><figcaption>默认策略的实现位置</figcaption></figure><p>接下来我们看看，<code>AllocateMessageQueueAveragely</code> 内部具体都做了哪些事情。</p><p>其核心其实就是实现的 <code>AllocateMessageQueueStrategy</code> 接口中的 <code>allocate</code> 方法。实际上，RocketMQ 对该接口总共有 5 种实现：</p><ul><li>AllocateMachineRoomNearby</li><li><strong>AllocateMessageQueueAveragely</strong></li><li>AllocateMessageQueueAveragelyByCircle</li><li>AllocateMessageQueueByConfig</li><li>AllocateMessageQueueByMachineRoom</li><li>AllocateMessageQueueConsistentHash</li></ul><p>其默认的 <code>AllocateMessageQueueAveragely</code> 只是其中的一种实现而已，那执行 <code>allocate</code> 它需要什么参数呢？</p><figure><img src="'+d+`" alt="入参" tabindex="0" loading="lazy"><figcaption>入参</figcaption></figure><p>需要以下四个：</p><ul><li><strong>ConsumerGroup</strong> 消费者组的名字</li><li><strong>currentCID</strong> 当前消费者的 clientID</li><li><strong>mqAll</strong> 当前 ConsumerGroup 所消费的 Topic 下的所有的 MessageQueue</li><li><strong>cidAll</strong> 当前 ConsumerGroup 下所有消费者的 ClientID</li></ul><p>实际上是将某个 Topic 下的所有 MessageQueue 分配给属于同一个消费者的所有消费者实例，粒度是 By Topic 的。</p><p>所以到这里剩下的事情就很简单了，无非就是<strong>怎么样把这一堆 MessageQueue 分配给这一堆 Consumer</strong>。这个<strong>怎么样</strong>，就对应了 <code>AllocateMessageQueueStrategy</code> 的不同实现。</p><p>接下来我们就来看看 <strong>AllocateMessageQueueAveragely</strong> 是如何对 MessageQueue 进行分配的，之前讲源码我一般都会一步一步的来，结合源码跟图，但是这个源码太短了，我就直接先给出来吧。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MessageQueue</span><span class="token punctuation">&gt;</span></span> <span class="token function">allocate</span><span class="token punctuation">(</span><span class="token class-name">String</span> consumerGroup<span class="token punctuation">,</span> <span class="token class-name">String</span> currentCID<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MessageQueue</span><span class="token punctuation">&gt;</span></span> mqAll<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> cidAll<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>currentCID <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> currentCID<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;currentCID is empty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>mqAll <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> mqAll<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;mqAll is null or mqAll empty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cidAll <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> cidAll<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;cidAll is null or cidAll empty&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MessageQueue</span><span class="token punctuation">&gt;</span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MessageQueue</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 判断一下当前的客户端是否在 cidAll 的集合当中</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cidAll<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>currentCID<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;[BUG] ConsumerGroup: {} The consumerId: {} not in cidAll: {}&quot;</span><span class="token punctuation">,</span>
             consumerGroup<span class="token punctuation">,</span>
             currentCID<span class="token punctuation">,</span>
             cidAll<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 拿到当前消费者在所有的消费者实例数组中的位置</span>
  <span class="token keyword">int</span> index <span class="token operator">=</span> cidAll<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>currentCID<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 用 messageQueue 的数量 对 消费者实例的数量取余数, 这个实际上就把不够均匀分的 MessageQueue 的数量算出来了</span>
  <span class="token comment">// 举个例子, 12 个 MessageQueue, 有 5 个 Consumer, 12 % 5 = 2 </span>
  <span class="token keyword">int</span> mod <span class="token operator">=</span> mqAll<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">%</span> cidAll<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> averageSize <span class="token operator">=</span>
    mqAll<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> cidAll<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token punctuation">(</span>mod <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> index <span class="token operator">&lt;</span> mod <span class="token operator">?</span> mqAll<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> cidAll<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> mqAll<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> cidAll<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> startIndex <span class="token operator">=</span> <span class="token punctuation">(</span>mod <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> index <span class="token operator">&lt;</span> mod<span class="token punctuation">)</span> <span class="token operator">?</span> index <span class="token operator">*</span> averageSize <span class="token operator">:</span> index <span class="token operator">*</span> averageSize <span class="token operator">+</span> mod<span class="token punctuation">;</span>
  <span class="token keyword">int</span> range <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>averageSize<span class="token punctuation">,</span> mqAll<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> range<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>mqAll<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">(</span>startIndex <span class="token operator">+</span> i<span class="token punctuation">)</span> <span class="token operator">%</span> mqAll<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实前半部分都是些常规的 check，可以忽略不看，从这里：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">int</span> index <span class="token operator">=</span> cidAll<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>currentCID<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>开始，才是核心逻辑。为了避免逻辑混乱，还是假设有 12 个 MessageQueue，5 个 Consumer，同时假设 <code>index=0</code> 。</p><p>那么 <code>mod</code> 的值就为 <code>12 % 5 = 2</code> 了。</p><p>而 <code>averageSize</code> 的值，稍微有点绕。如果 MessageQueue 的数量比消费者的数量还少，那么就为 <code>1</code> ；否则，就走这一堆逻辑<code>(mod &gt; 0 &amp;&amp; index &lt; mod ? mqAll.size() / cidAll.size() + 1 : mqAll.size() / cidAll.size())</code>。我们 index 是 0，而 mod 是 2，index &lt; mod 则是成立的，那么最终 <code>averageSize</code> 的值就为 <code>12 / 5 + 1 = 3</code>。</p><p>接下来是 <code>startIndex</code>，由于这个三元运算符的条件是成立的，所以其值为 <code>0 * 3</code> ，就为 <code>0</code>。</p><p>看了一大堆逻辑，是不是已经晕了？直接举实例：</p><p><strong>12</strong> 个 Message Queue</p><p><strong>5</strong> 个 Consumer 实例</p><p>按照上面的分法：</p><p>排在第 1 的消费者 分到 3 个</p><p>排在第 2 的消费者 分到 3 个</p><p>排在第 3 的消费者 分到 2 个</p><p>排在第 4 的消费者 分到 2 个</p><p>排在第 5 的消费者 分到 2 个</p><figure><img src="`+m+'" alt="具体分配流程" width="600" tabindex="0" loading="lazy"><figcaption>具体分配流程</figcaption></figure><p>所以，你可以大致认为：</p><blockquote><p>先“均分”，12 / 5 取整为 2。然后“均分”完之后还剩下 2 个，那么就从上往下，挨个再分配，这样第 1、第 2 个消费者就会被多分到 1 个。</p><p>所以如果有 13 个 MessageQueue，5 个 Consumer，那么第 1、第 2、第 3 就会被分配 3 个。</p></blockquote><p>但并不准确，因为分配的 MessageQueue 是一次性的，例如那 3 个 MessageQueue 是一次性获取的，不会先给 2 个，再给 1 个。</p><p>而我们开篇提到的 Consumer 的 ClientID 相同，会造成什么？</p><p>当然是 <code>index</code> 的值相同，进而造成 <code>mod</code>、<code>averageSize</code>、<code>startIndex</code>、<code>range</code> 全部相同。那么最后 <code>result.add(mqAll.get((startIndex + i) % mqAll.size()));</code> 时，本来不同的 Consumer，会取到相同的 MessageQueue（举个例子，Consumer 1 和 Consumer 2 都取到了前 3 个 MessageQueue），从而造成有些 MessageQueue（如果有的话） 没有 Consumer 对其消费，而没有被消费，消息也在不停的投递进来，就会造成消息的大<strong>量堆积</strong>。</p><p>当然，现在的新版本从<strong>代码上看</strong>已经修复这个问题了，这个只是对之前的版本的原因做一个探索。</p>',44);function M(C,Q){const a=p("ExternalLinkIcon");return o(),c("div",null,[v,s("p",null,[n("首先，造成这个问题的 BUG RocketMQ 官方已经在 "),b,n(" 的"),s("a",f,[n("这个提交"),e(a)]),n("中修复了，这里只是探讨一下在修复之前造成问题的具体细节，更多的上下文可以参考我之前写的 "),s("a",A,[n("《RocketMQ Consumer 启动时都干了些啥？》"),e(a)]),n(" ，这篇文章讲解了 RocketMQ 的 Consumer 启动之后都做了哪些操作，对理解本次要讲解的 BUG 有一定的帮助。")]),y])}const w=t(g,[["render",M],["__file","230827.html.vue"]]);export{w as default};
