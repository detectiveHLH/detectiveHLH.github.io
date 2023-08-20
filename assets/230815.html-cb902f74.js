import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as r,c as l,a as e,b as s,d as i,f as n}from"./app-de512a27.js";const d="/images/230815/string-command.jpeg",c="/images/230815/simple-dynamic-string.jpeg",p={},g=n('<h1 id="redis基础——剖析基础数据结构及其用法" tabindex="-1"><a class="header-anchor" href="#redis基础——剖析基础数据结构及其用法" aria-hidden="true">#</a> Redis基础——剖析基础数据结构及其用法</h1><blockquote><p>这是一个系列的文章，打算把Redis的<strong>基础数据结构</strong>、<strong>高级数据结构</strong>、<strong>持久化的方式</strong>以及<strong>高可用的方式</strong>都讲一遍，公众号会比其他的平台提前更新，感兴趣的可以提前关注，「<strong>SH的全栈笔记</strong>」，下面开始正文。</p></blockquote><p>如果你是一个有经验的后端或者服务器开发，那么一定听说过Redis，其全称叫<strong>Remote Dictionary Server</strong>。是由C语言编写的基于Key-Value的存储系统。说直白点就是一个<strong>内存数据库</strong>，既然是内存数据库就会遇到如果服务器意外宕机造成的数据不一致的问题。</p>',3),h={href:"https://mp.weixin.qq.com/s/KIfbLfOdcKnNYgMYbrKC1Q",target:"_blank",rel:"noopener noreferrer"},u=n('<p>Redis除了高性能之外，还拥有丰富的数据结构，支持大多数的业务场景。这也是其为什么如此受欢迎的原因之一，下面我们就来看一看Redis有哪些<strong>基础数据类型</strong>，以及他们底层都是怎么实现的。</p><h2 id="_1-数据类型" tabindex="-1"><a class="header-anchor" href="#_1-数据类型" aria-hidden="true">#</a> 1. 数据类型</h2><p>其基础数据类型有<code>String</code>、<code>List</code>、<code>Hash</code>、<code>Set</code>、<code>Sorted Set</code>，这些都是常用的基础数据类型，可以看到非常丰富，几乎能够满足大部分的需求了。其实还有一些高级数据结构，我们在这章里暂时先不提，只聊基础的数据结构。</p><h2 id="_2-string" tabindex="-1"><a class="header-anchor" href="#_2-string" aria-hidden="true">#</a> 2. String</h2><p>String可以说是最基础的数据结构了， 用法上可以直接和Java中的String挂钩，你可以把String类型用于存储某个标志位，某个计数器，甚至狠一点，序列化之后的JSON字符串都行，其单个key限制为512M。其常见的命令为<code>get</code>、<code>set</code>、<code>incr</code>、<code>decr</code> 、<code>mget</code>。</p><h3 id="_2-1-使用" tabindex="-1"><a class="header-anchor" href="#_2-1-使用" aria-hidden="true">#</a> 2.1 使用</h3><ul><li><strong>get</strong> 获取某个key，如果key不存在会返回空指针</li><li><strong>set</strong> 给key赋值，将key设置为指定的值，如果该key之前已经有值了，那么将被新的值给覆盖</li><li><strong>incr</strong> 给当前的key的值+1，如果key不存在则会先给key调用<code>set</code>赋值为0，再调用<code>incr</code>。当然如果该key的类型不能做加法运算，例如字符串，就会抛出错误</li><li><strong>decr</strong> 给当前key的值-1，其余的同上</li><li><strong>mget</strong> 同get，只是一次性返回多条数据，不存在的key将会返回空指针</li></ul><figure><img src="'+d+`" alt="string相关命令" tabindex="0" loading="lazy"><figcaption>string相关命令</figcaption></figure><p>可能大多数的人只是到用一用的地步，这也无可厚非，但是如果是作为一个对技术有追求的开发，或者说你有想近大厂的想法，一定要有刨根问底的精神。只有当你真正知道一个东西的底层原理时，你遇到问题时才能提供给你更多的思路去解决问题。接下来我们就来聊一下Redis中String底层是如何实现的。</p><h3 id="_2-2-原理" tabindex="-1"><a class="header-anchor" href="#_2-2-原理" aria-hidden="true">#</a> 2.2 原理</h3><h4 id="_2-2-1-结构" tabindex="-1"><a class="header-anchor" href="#_2-2-1-结构" aria-hidden="true">#</a> 2.2.1 结构</h4><p>我们知道Redis是用C语言写的，但是Redis却没有直接使用，而是自己实现了一个叫SDS（Simple Dynamic String）的结构来实现字符串，结构如下。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">sdshdr</span> <span class="token punctuation">{</span>
  <span class="token comment">// 记录buf中已使用的字节数量</span>
  <span class="token keyword">int</span> len<span class="token punctuation">;</span>
  <span class="token comment">// 记录buf中未使用的字节数量</span>
  <span class="token keyword">int</span> free<span class="token punctuation">;</span>
  <span class="token comment">// 字节数组，用于保存字符串</span>
  <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-优点" tabindex="-1"><a class="header-anchor" href="#_2-2-2-优点" aria-hidden="true">#</a> 2.2.2 优点</h4><p>为什么Redis要自己实现SDS而不是直接用C的字符串呢？主要是因为以下几点。</p><ul><li><strong>减少获取字符串长度开销</strong> C语言中获取字符串的长度需要遍历整个字符串，直到遇到结束标志位<code>\\0</code>，时间复杂度为O(n)，而SDS直接维护了长度的变量，取长度的时间复杂度为O(1)</li><li><strong>避免缓冲区溢出</strong> C语言中如果往一个字节数组中塞入超过其容量的字节，那么就会造成<strong>缓冲区溢出</strong>，而SDS通过维护<code>free</code>变量解决了这个问题。向buf数组中写入数据时，会先判断剩余的空间是否足够塞入新数据，如果不够，SDS就会<strong>重新分配</strong>缓冲区，加大之前的缓冲区。且加大的长度等于新增的数据的长度</li><li><strong>空间预分配&amp;空间惰性释放</strong> C语言中，每次修改字符串都会重新分配内存空间，如果对字符串修改了n次，那么必然会出现n次内存重新分配。而SDS由于冗余了一部分空间，优化了这个问题，将<strong>必然</strong>重新分配n次变为<strong>最多</strong>分配n次，而数据从buf中移除的时候，空闲出来的内存也不会马上被回收，防止新写入数据而造成内存重新分配</li><li><strong>保证二进制安全</strong> C语言中，字符串遇到<code>\\0</code>会被截断，而SDS不会因为数据中出现了<code>\\0</code>而截断字符串，换句话说，不会因为一些特殊的字符影响实际的运算结果</li></ul><p>可以结合下面的图来理解SDS。</p><figure><img src="`+c+'" alt="图片来源于网络，侵删" tabindex="0" loading="lazy"><figcaption>图片来源于网络，侵删</figcaption></figure><p>总结一下就是上面列表的四个小标题，为了减少获取字符串长度开销、避免缓冲区溢出、空间预分配&amp;空间惰性释放和保证二进制安全。</p><h2 id="_3-list" tabindex="-1"><a class="header-anchor" href="#_3-list" aria-hidden="true">#</a> 3. List</h2><p>List也是一个使用频率很高的数据结构，其设计到的命令太多了，就不像String那样一个一个演示了，感兴趣的大家可以去搜一搜。命令有lpush、lpushx、rpush、rpushx、lpop、rpop、lindex、linsert、lrange、llen、lrem、lset、ltrim、rpoplpush、brpoplpush、blpop、brpop，其都是对数组中的元素的操作。</p><h3 id="_3-1-使用" tabindex="-1"><a class="header-anchor" href="#_3-1-使用" aria-hidden="true">#</a> 3.1 使用</h3><p>List的用途我认为主要集中在以下两个方面。</p><blockquote><ol><li>当作普通列表存储数据（类似于Java的ArrayList）</li><li>用做异步队列</li></ol></blockquote><p>普通列表这个自然不必多说，其中存放的必然业务中需要的数据，下面来着重聊一下<strong>异步队列</strong>。</p><blockquote><p>啥玩意，List还能当成队列来玩？</p></blockquote><p>List除了能被用做队列，还能当作栈来使用。在上面介绍了很多操作List命令，当我们用<strong>rpush/lpop</strong>组合命令的时候，实际上就是在使用一个队列，而当我们用<strong>rpush/rpop</strong>命令组合的时候，就是在使用一个栈。lpush/rpop和lpush/lpop是同理的。</p><p>假设我们用的是<strong>rpush</strong>来生产消息，当我们的程序需要消费消息的时候，就使用<strong>lpop</strong>从<strong>异步队列</strong>中消费消息。但是如果采用这种方式，当队列为空时，你可能需要不停的去询问队列中是否有数据，这样会造成机器的CPU资源的浪费。</p><p>所以你可以采取让当前线程<strong>Sleep</strong>一段时间，这样的确可以节省一部分CPU资源。但是你可能就需要去考虑Sleep的时间，间隔太短，CPU<strong>上下文切换</strong>可能也是一笔不小的开销，间隔太长，那么可能造成这条消息被延迟消费（不过都用异步队列了，应该可以忽略这个问题）。</p><blockquote><p>除了Sleep，还有没有其他的方式？</p></blockquote><p>有，答案是<strong>blpop</strong>。当我们使用blpop去消费时，如果当前队列是空的，那么此时线程会阻塞住，直到下面两种condition。</p><ol><li>达到设置的timeout时间</li><li>队列中有消息可以被消费</li></ol><p>比起<strong>Sleep</strong>一段时间，实时性会好一点；比起轮询，对CPU资源更加友好。</p><h3 id="_3-2-原理" tabindex="-1"><a class="header-anchor" href="#_3-2-原理" aria-hidden="true">#</a> 3.2 原理</h3><p>在Redis3.2之前，Redis采用的是ZipList（压缩列表）或者LinkedList（链表）。当List中的元素<strong>同时</strong>满足<code>每个元素的小于64字节</code>和<code>List元素个数小于512个</code>时，存储的方式为<strong>ZipList</strong>。但凡有一个条件没满足就会转换为<strong>LinkedList</strong>。</p><p>而在3.2之后，其实现变成了QuickList（快速列表）。LinkedList由于是较为基础的东西，此处就不赘述了。</p><h4 id="_3-2-1-ziplist" tabindex="-1"><a class="header-anchor" href="#_3-2-1-ziplist" aria-hidden="true">#</a> 3.2.1 ZipList</h4><p>ZipList采用连续的内存紧凑存储，不像链表那样需要有额外的空间来存储前驱节点和后续节点的指针。按照其存储的区域划分，大致可以分为三个部分，每个部分也有自己的划分，其详细的结构如下。</p><ul><li>header ziplist的头部信息 <ul><li>zlbytes 标识ziplist所占用的内存字节数</li><li>zltail 到ziplist尾节点的偏移量</li><li>zllen ziplist中的存储的节点数量</li></ul></li><li>entries 存储实际节点的信息 <ul><li>pre_entry_length 记录了前一个节点的长度，通过这个值可以快速的跳转到上一个节点</li><li>encoding 顾名思义，存储量元素的编码格式</li><li>length 所存储数据的长度</li><li>content 保存节点的内容</li></ul></li><li>end 标识ziplist的末尾</li></ul><p>如果采用链表的存储方式，链表中的元素由指针相连，这样的方式可能会造成一定的<strong>内存碎片</strong>。而指针也会占用额外的存储空间。而ZipList不会存在这些情况，ZipList占用的是一段连续的内存空间。</p><p>但是相应地，ZipList的修改操作效率较为低下，插入和删除的操作会设计到频繁的内存空间申请和释放（有点类似于ArrayList重新扩容），且查询效率同样会受影响，本质上ZipList查询元素就是遍历链表。</p><h4 id="_3-2-2-quicklist" tabindex="-1"><a class="header-anchor" href="#_3-2-2-quicklist" aria-hidden="true">#</a> 3.2.2 QuickList</h4><p>在3.2版本之后，<code>list</code>的实现就换成了QuickList。QuickList将list分成了多个节点，每一个节点采用<strong>ZipList</strong>存储数据。</p><h2 id="_4-hash" tabindex="-1"><a class="header-anchor" href="#_4-hash" aria-hidden="true">#</a> 4. Hash</h2><p>其用法就跟Java中的HashMap中一样，都是往map中去丢键值对。</p><h3 id="_4-1-使用" tabindex="-1"><a class="header-anchor" href="#_4-1-使用" aria-hidden="true">#</a> 4.1 使用</h3><p>基础的命令如下：</p><ul><li><strong>hset</strong> 在hash中设置键值对</li><li><strong>hget</strong> 获hash中的某个key值</li><li><strong>hdel</strong> 删除hash中某个键</li><li><strong>hlen</strong> 统计hash中元素的个数</li><li><strong>hmget</strong> 批量的获取hash中的键的值</li><li>hmset 批量的设置hash中的键和值</li><li><strong>hexists</strong> 判断hash中某个key是否存在</li><li><strong>hkeys</strong> 返回hash中的所有键（不包含值）</li><li><strong>hvals</strong> 返回hash中的所有值（不包含键）</li><li><strong>hgetall</strong> 获取所有的键值对，包含了键和值</li></ul><p>其实大多数情况下的使用跟HashMap是差不多的，没有什么较为特殊的地方。</p><h3 id="_4-2-原理" tabindex="-1"><a class="header-anchor" href="#_4-2-原理" aria-hidden="true">#</a> 4.2 原理</h3><p>hash的底层实现也是有两种，ZipList和HashTable。但具体采用哪一种与Redis的版本无关，而与当前hash中所存的元素有关。首先当我们创建一个hash的时候，采用的ZipList进行存储。随着hash中的元素增多，达到了Redis设定的阈值，就会转换为HashTable。</p><p>其设定的阈值如下：</p><ul><li>存储的某个键或者值长度大于默认值（64）</li><li>ZipList中存储的元素数量大于默认值（512）</li></ul>',53),k=e("strong",null,"HashMap",-1),m={href:"https://mp.weixin.qq.com/s/-ZE8eA-2CFYsgwRbwjEVnw",target:"_blank",rel:"noopener noreferrer"},b=n(`<h2 id="_5-set" tabindex="-1"><a class="header-anchor" href="#_5-set" aria-hidden="true">#</a> 5. Set</h2><p>Set的概念可以与Java中的Set划等号，用于存储一个不包含重复元素的集合。</p><h3 id="_5-1-使用" tabindex="-1"><a class="header-anchor" href="#_5-1-使用" aria-hidden="true">#</a> 5.1 使用</h3><p>其主要的命令如下，key代表redis中的Set，member代表集合中的元素。</p><ul><li><strong>sadd</strong> <code>sadd key member [...]</code> 将一个或者多个元素加入到集合中，如果有已经存在的元素会忽略掉。</li><li><strong>srem</strong> <code>srem key member [...]</code>将一个或者多个元素从集合中移除，不存在的元素会被忽略掉</li><li><strong>smembers</strong> <code>smembers key</code>返回集合中的所有成员</li><li><strong>sismember</strong> <code>dismember key member</code>判断member在key中是否存在，如果存在则返回1，如果不存在则返回0</li><li><strong>scard</strong> <code>scard key</code>返回集合key中的元素的数量</li><li><strong>smove</strong> <code>move source destination member</code>将元素从source集合移动到destination集合。如果source中不包含member，则不会执行任何操作，当且仅当存在才会从集合中移出。如果destination已经存在元素则不会对destination做任何操作。该命令是原子操作。</li><li><strong>spop</strong> <code>spop key</code>随机删除并返回集合中的一个元素</li><li><strong>srandmember</strong> <code>srandmember key</code>与spop一样，只不过不会将元素删除，可以理解为从集合中随机出一个元素来。</li><li><strong>sinter</strong> 求一个或者多个集合的交集</li><li><strong>sinterstore</strong> <code>sinterstore destination key [...]</code>与sinter类似，但是会将得出的结果存到destination中。</li><li><strong>sunion</strong> 求一个或者多个集合的并集</li><li><strong>sunionstore</strong> <code>sunionstore destination key [...]</code></li><li><strong>sdiff</strong> 求一个或者多个集合的差集</li><li><strong>sdiffstore</strong> <code>sdiffstore destination key [...]</code>与sdiff类似，但是会将得出的结果存到destination中。</li></ul><h3 id="_5-2-原理" tabindex="-1"><a class="header-anchor" href="#_5-2-原理" aria-hidden="true">#</a> 5.2 原理</h3><p>我们知道Java中的Set有多种实现。在Redis中也是，有<strong>IntSet</strong>和<strong>HashTable</strong>两种实现，首先初始化的时候使用的是<strong>IntSet</strong>，当满足以下条件时，就会使用IntSet，反之如果不满足，就会转换成<strong>HashTable</strong>。</p><ul><li>当集合中保存的所有元素都是整数时</li><li>集合对象保存的元素数量不超过512</li></ul><p>上面已经简单的介绍了HashTable了，所以这里只聊聊IntSet。</p><h4 id="_5-2-1-intset" tabindex="-1"><a class="header-anchor" href="#_5-2-1-intset" aria-hidden="true">#</a> 5.2.1 IntSet</h4><p>intset底层是一个数组，既然数据结构是数组，那么存储数据就可以是有序的，这也使得intset的底层查询是通过二分查找来实现。其结构如下。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">intset</span> <span class="token punctuation">{</span>
  <span class="token comment">// 编码方式</span>
  <span class="token class-name">uint32_t</span> encoding<span class="token punctuation">;</span>
  <span class="token comment">// 集合包含元素的数量</span>
  <span class="token class-name">uint32_t</span> length<span class="token punctuation">;</span>
  <span class="token comment">// 存储元素的数组</span>
  <span class="token class-name">int8_t</span> contents<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与ZipList类似，IntSet也是使用的一连串的内存空间，但是不同的是ZipList可以存储二进制的内容，而IntSet只能存储整数；且ZipList存储是无序的，IntSet则是有序的，这样一来，元素个数相同的前提下，IntSet的查询效率会更高。</p><h2 id="_6-sorted-set" tabindex="-1"><a class="header-anchor" href="#_6-sorted-set" aria-hidden="true">#</a> 6. Sorted Set</h2><p>其与Set的功能大致类似，只不过在此基础上，可以给每一个元素赋予一个权重。你可以理解为Java的<strong>TreeSet</strong>。与List、Hash、Set一样，其底层的实现也有两种，分别是<strong>ZipList</strong>和<strong>SkipList</strong>（跳表）。</p><p>初始化Sorted Set的时候，会采用ZipList作为其实现，其实很好理解，这个时候元素的数量很少，采用ZipList进行紧凑的存储会更加的节省空间。当期达到如下的条件时，会使用ZipList，反之会使用SkipList</p><ul><li>其保存的元素数量的个数小于128个</li><li>其保存的所有元素长度小于64字节</li></ul><h3 id="_6-1-使用" tabindex="-1"><a class="header-anchor" href="#_6-1-使用" aria-hidden="true">#</a> 6.1 使用</h3><p>下面的命令中，key代表zset的名字；4代表score，也就是权重；而member就是zset中的key的名称。</p><ul><li><strong>zadd</strong> <code>zadd key 4 member</code>用于增加元素</li><li><strong>zcard</strong> <code>zcard key</code>用于获取zset中的元素的数量</li><li><strong>zrem</strong> <code>zrem key member [...]</code>删除zset中一个或者多个key</li><li><strong>zincrby</strong> <code>zincrby key 1 member</code>给key的权重值加上score的值（也就是1）</li><li><strong>zscore</strong> <code>zscore key member</code>用于获取指定key的权重值</li><li><strong>zrange</strong> <code>zrange key 0 -1</code>获取zset中所有的元素，<code>zrange key 0 -1 withscores</code>获取所有元素和权重，<code>withscores</code>参数的作用是决定是否将权重值也一起返回。其返回的元素按照<strong>从小到大</strong>排序，如果元素具有相同的权重，则会按照字典序排序。</li><li><strong>zrevrange</strong> <code>zrevrange key 0 -1 withscores</code>，其与<code>zrange</code>类似，只不过<code>zrevrange</code>按照<strong>从大到小</strong>排序。</li><li><strong>zrangebyscore</strong> <code>zrangebyscore key 1 5</code>，返回key中权重在区间(1, 5]范围内元素。当然也可以使用<code>withscores</code>来将权重值一并返回。其元素按照<strong>从小到大</strong>排序。1代表min，5代表max，他们也可以分别是**-inf<strong>和</strong>inf**，当你不知道key中的score区间时，就可以使用这个。还有一个类似于SQL中的limit的可选参数，在此就不赘述。</li></ul><p>除了能够对其中的元素添加权重之外，使用ZSet还可以实现<strong>延迟队列</strong>。</p><blockquote><p>延迟队列用于存放延迟任务，那什么是延迟队列呢？</p></blockquote><p>举个很简单的例子， 你在某个电商APP中下订单，但是没有付款，此时它会提醒你，「订单如果超过1个小时没有支付，将会自动关闭」；再比如在某个活动结束前1个小时给用户推送消息；再比如订单完成后多少天自动确认收货等等。</p><p>用人话解释一遍，那就是过会才要干的事情。</p><blockquote><p>那ZSet怎么实现这个功能？</p></blockquote><p>其实很简单，就是将任务的执行时间设置为ZSet中的元素权重，然后通过一个后台线程定时的从ZSet中查询出权重最小的元素，然后通过与当前时间戳判断，如果小于当前时间戳（也就是该执行了）就将其从ZSet中取出。</p><blockquote><p>那，怎么取？</p></blockquote><p>其实我看很多讲Redis实现延迟队列的博客都没有把这个怎么取讲清楚，到底该用什么命令，传什么参数。我们使用<code>zrangebyscore</code>命令来实现，还记得-inf和inf吗，其全称是infinity，分别表示无限小和无限大。</p><p>由于我们并不知道延迟队列当中的score（也就是任务执行时间）的范围，所以我们可以直接使用-inf和inf，完整命令如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>zrangebyscore key <span class="token parameter variable">-inf</span> inf limt <span class="token number">0</span> <span class="token number">1</span> withscores
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>还是有点用，那ZSet底层是咋实现的呢？</p></blockquote><p>上面已经讲过了ZipList，就不赘述，下面聊聊SkipList。</p><h3 id="_6-2-原理" tabindex="-1"><a class="header-anchor" href="#_6-2-原理" aria-hidden="true">#</a> 6.2 原理</h3><h4 id="_6-2-1-skiplist" tabindex="-1"><a class="header-anchor" href="#_6-2-1-skiplist" aria-hidden="true">#</a> 6.2.1 SkipList</h4><p>SkipList存在于zset（Sorted Set）的结构中，如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">zset</span> <span class="token punctuation">{</span>
  <span class="token comment">// 字典</span>
  dict <span class="token operator">*</span>dict<span class="token punctuation">;</span>
  <span class="token comment">// 跳表</span>
  zskiplist <span class="token operator">*</span>zsl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而SkipList的结构如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">zskiplist</span> <span class="token punctuation">{</span>
  <span class="token comment">// 表头节点和表尾节点</span>
  <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token operator">*</span>header<span class="token punctuation">,</span> <span class="token operator">*</span>tail<span class="token punctuation">;</span>
  <span class="token comment">// 表中节点的数量</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">long</span> length<span class="token punctuation">;</span>
  <span class="token comment">// 表中层数最大的节点的层数</span>
  <span class="token keyword">int</span> level<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不知道大家是否有想过，为什么Redis要使用SkipList来实现ZSet，而不用数组呢？</p><p>首先ZSet如果数组存储的话，由于ZSet中存储的元素是有序的，存入的时候需要将元素放入数组中对应的位置。这样就会对数组进行频繁的增删，而频繁的增删在数组中效率并不高，因为涉及到数组元素的移动，如果元素插入的位置是首位，那么后面的所有元素都要被移动。</p><p>所以为了应付频繁增删的场景，我们需要使用到链表。但是随着链表的元素增多，同样的会出现问题，虽然增删的效率提升了，但是查询的效率变低了，因为查询元素会从头到尾的遍历链表。所有如果有什么方法能够提升链表的查询效率就好了。</p><p>于是跳表就诞生了。基于单链表，从第一个节点开始，每隔一个节点，建立索引。其实也是单链表。只不是中间省略了节点。</p><blockquote><p>例如存在个单链表 1 3 4 5 7 8 9 10 13 16 17 18</p><p>抽象之后的索引为 1 4 7 9 13 17</p><p>如果要查询16只需要在索引层遍历到13，然后根据13存储的下层节点（真实链表节点的地址），此时只需要再遍历两个节点就可以找到值为16的节点。</p></blockquote><p>所以可以重新给跳表下一个定义，<strong>链表加多级索引的结构，就是跳表</strong></p><p>在跳表中，查询任意数据的时间复杂度是<strong>O(logn)</strong>。时间复杂度跟二分查找是一样的。可以换句话说，用单链表实现了<strong>二分查找</strong>。但这也是一种用<strong>空间换时间</strong>的思路，并不是免费的。</p><h2 id="end" tabindex="-1"><a class="header-anchor" href="#end" aria-hidden="true">#</a> End</h2><p>关于Redis的基础数据结构和其底层的原理就简单的聊到这里，之后的几篇应该会聊聊Redis的高可用和其对应的解决方案，感兴趣的可以持续关注，公众号会比其他的平台都先更新。</p>`,47);function v(_,S){const t=o("ExternalLinkIcon");return r(),l("div",null,[g,e("p",null,[s("这跟很多游戏服务器也是一样的，感兴趣的可以参考我之前的文章"),e("a",h,[s("游戏服务器和Web服务器的区别"),i(t)]),s("。其数据首先会流向内存，基于快速的内存读写来实现高性能，然后定期将内存的数据中的数据落地。Redis其实也是这么个流程，基于快速的内存读写操作，单机的Redis甚至能够扛住10万的QPS。")]),u,e("p",null,[s("ZipList上面我们专门简单分析了一下，理解这个设定应该也比较容易。当ZipList中的元素过多的时候，其查询的效率就会变得低下。而HashTable的底层设计其实和Java中的"),k,s("差不多，都是通过拉链法解决哈希冲突。具体的可以参考"),e("a",m,[s("从基础的使用来深挖HashMap"),i(t)]),s("这篇文章。")]),b])}const L=a(p,[["render",v],["__file","230815.html.vue"]]);export{L as default};
