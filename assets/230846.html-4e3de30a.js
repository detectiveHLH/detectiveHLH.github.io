import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o,c as a,f as c}from"./app-5a161a5d.js";const d="/images/230846/add-usage.jpeg",n="/images/230846/add-source-code.jpeg",t="/images/230846/ensure-capacity-internal.jpeg",i="/images/230846/ensure-capacity-internal-2.jpeg",s="/images/230846/grow.jpeg",p="/images/230846/add-all.jpeg",r="/images/230846/add-core-process.jpeg",l="/images/230846/range-check-for-add.jpeg",g="/images/230846/add-with-index.jpeg",u="/images/230846/system-copy.jpeg",m="/images/230846/remove.jpeg",f="/images/230846/remove-interface.jpeg",y="/images/230846/add-and-remove-example.jpeg",h="/images/230846/remove-by-value.jpeg",k="/images/230846/remove-source-code.jpeg",x="/images/230846/allow-add-null.jpeg",_={},b=c('<h1 id="arraylist-从源码角度剖析底层原理" tabindex="-1"><a class="header-anchor" href="#arraylist-从源码角度剖析底层原理" aria-hidden="true">#</a> ArrayList 从源码角度剖析底层原理</h1><p>对于 <code>ArrayList</code> 来说，我们平常用的最多的方法应该就是 <code>add</code> 和 <code>remove</code> 了，本文就主要通过这两个基础的方法入手，通过源码来看看 <code>ArrayList</code> 的底层原理。</p><h2 id="add" tabindex="-1"><a class="header-anchor" href="#add" aria-hidden="true">#</a> add</h2><h3 id="默认添加元素" tabindex="-1"><a class="header-anchor" href="#默认添加元素" aria-hidden="true">#</a> 默认添加元素</h3><p>这个应该是平常用的最多的方法了，其用法如下。</p><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>接下来我们就来看看 <code>add</code> 方法的底层源码。</p><figure><img src="'+n+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><code>ensureCapacityInternal</code> 作用为：保证在不停的往 ArrayList 插入数据时，数组不会越界，并且实现自动扩容。</p><figure><img src="'+t+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里的 <code>minCapacaity</code> 的值，实际上就是在调用完当前这次 <code>add</code> 操作之后，数组中元素的数量</p><blockquote><p>注意，这里说当前这次 <code>add</code> 操作完成。举个例子，调用 <code>add</code> 之前，ArrayList 中有3个元素，那么此时这个 <code>minCapacity</code> 的值就为 4</p></blockquote><p>此外，可以看到将函数 <code>calculateCapacity</code> 的返回值作为了 <code>ensureExplicitCapacity</code> 的输入。</p><p><code>calculateCapacity</code> 做了什么，用大白话来说是，如果当前数组是空的，则直接返回 <strong>数组默认长度（10）</strong> 和 <code>minCapacity</code> 的最大值，否则就直接返回 <code>minCapacity</code> 。</p><p>接下里是 <code>ensureExplicitCapacity</code> ，源码如下：</p><figure><img src="'+i+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><code>modCount</code> 表示该 ArrayList 被更改过多少次，这里的更改不只是新增，<strong>删除</strong>也是一种更改。通过上面的了解我们知道，如果当前数组内的元素个数是小于数组长度的，则 <code>minCapacity</code> 的值一定是小于 <code>elementData.length</code> 的。</p><p>相反，如果数组内的元素个数已经和数组长度相等了，则 <code>0&gt;0</code> 一定是 <code>false</code> ，此时就会调用 <code>grow</code> 函数来进行数组扩容。</p><figure><img src="'+s+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>核心逻辑很简单，新的数组长度 = 旧数组长度 + 旧数组长度/2。</p><blockquote><p>这里的右移，就相当于直接除以2</p></blockquote><p>所以通过这里的源码我们验证，ArrayList 的扩容是每次扩容 1.5 倍。但是这里会有一个疑问，因为上文提到扩容时 <code>minCapacity</code> 的值和数组长度应该是相等的，所以 新数组长度 - minCapacity 应该永远大于0才对，为什么会有小于0的情况？</p><p>答案是 <code>addAll</code> 。</p><figure><img src="'+p+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以看到，<code>add</code> 和 <code>addAll</code> 底层都会调用 <code>ensureCapacityInternal</code> 。<code>add</code> 是往数组中添单个元素，而 <code>addAll</code> 则是往数组中添加整个数组。假设 <code>addAll</code> 我们传进了一个很大的值，举个例子，ArrayList 的默认数组长度为 <code>10</code> ，扩容一次之后长度为 <code>15</code> ，假设我们传入的数组元素有 <code>10</code> 个，那么即使扩容一次还是不足以放下所有的元素，因为 <code>15 &lt; 20</code>。</p><p>所以才会出现 <code>newCapacity（扩容之后的数组长度） &lt; minCapacity（执行完当前操作之后的数组内元素数量）</code> 的情况，所以当这种情况出现之后，就会直接将 <code>minCapacity</code> 的值赋给 <code>newCapacity</code> 。</p><p>除此之外，还会有个极端的情况，假设 <code>addAll</code> 往里面塞入了 <code>Integer.MAX_VALUE</code> 个元素呢？这就是 <code>hugeCapacity</code> 函数要处理的逻辑了。首先如果溢出了就直接抛出 OOM 异常，其次会保证其容量不会超过 <code>Integer.MAX_VALUE</code>。</p><p>最后是真正执行扩容的操作，调用了 <code>java.util</code> 包里的 <code>Arrays.copyOf</code> 方法。从上图可以看出，这个方法中传入了两个参数，分别是存放元素的数组、新的数组长度，举个例子：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> elementData <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">;</span> 
<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> newElementData <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">copyOf</span><span class="token punctuation">(</span>elementData<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>newElementData<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1 2 3 4 5 0 0 0 0 0]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数组扩容完成之后，就会将本次 <code>add</code> 的元素写入 elementData 的末尾了，<code>elementData[size++] = e</code> 。</p><p>接下来我们用流程图来总结一下 <code>add</code> 操作的整个核心流程。</p><figure><img src="`+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="指定添加元素的位置" tabindex="-1"><a class="header-anchor" href="#指定添加元素的位置" aria-hidden="true">#</a> 指定添加元素的位置</h3><p>了解完了 <code>add</code> 和 <code>addAll</code>，我们趁热打铁，来看看可以指定元素位置的 <code>add</code> ，其接受两个参数，分别是：</p><ol><li>新元素在数组中的下标</li><li>新元素本身</li></ol><p>这里和最开始的 <code>add</code> 就有些不同了，之前的 <code>add</code> 方法会将元素放在数组的末尾，而 <code>add(int index, E element)</code> 则会将元素插入到数组中指定的位置，接下来从源码层面看看。</p><p>首先，由于这个方法允许用户传入数组下标，所以首先要做的事情就是<strong>检查传入的数组下标是否合法</strong>，如果不合法则会直接抛出 <code>IndexOutOfBoundsException</code> 异常。</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>很简单的判断，下标 <code>index</code> 不能小于0，并且不能超过数组中的元素个数，举个例子：</p><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>像上图这种情况，调用 <code>add(int index, E element)</code> 之前，数组内有3个元素，即使底层数组的长度为<code>10</code> ，但是数组下标如果传入5，是会抛出 <code>IndexOutOfBoundsException</code> 异常的。在上图这种情况，<code>index</code> 的值最大只能为3才不会报错，因为 <code>index(下标为3) &gt; size(3个元素)</code> 肯定不为 <code>true</code> 。</p><p>完成了校验之后，还是会调用上面聊到过的 <code>ensureCapacityInternal</code> 方法，根据需要，来对底层的数组进行扩容。然后调用 <code>System.arraycopy</code> 方法，这个方法比较关键，也比较难理解，所以我就简单一句话把它的作用概括了——将制定下标后的元素全部往后移动一位。</p><figure><img src="'+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><code>System.arraycopy</code> 接收 4 个参数，分别是：</p><ol><li>原数组</li><li>原数组中的起始下标</li><li>目标数组</li><li>目标数组中的起始下标</li></ol><p>光看参数，不结合例子，其实很难理解，我这里举个简单的例子。</p><p>假设现在数组里有元素 <code>[1 2 3]</code> ，然后此时我调用方法 <code>add(1, 4)</code> ，表明我想要将元素 4 插入到数组下标为 <code>1</code> 的位置，那么此时 <code>index</code> 的值为1，<code>size</code> 的值为 3。</p><p><code>System.arraycopy</code> 的方法就会变成 <code>System.arraycopy(elementData, 1, elementData, 2, 2)</code>，也就是将 <code>elementData</code> 从下标 1 开始的两个元素（也就是 2 和 3），拷贝到 <code>elementData</code> 的从下标 2 开始的地方。</p><p>可能还是有点绕，说人话就是执行完后，<code>elementData</code> 就变成了 <code>[1 2 2 3]</code>，然后再对 <code>elementData</code> 进行赋值，将下标为 1 的元素改为本次需要 <code>add</code> 的元素。再说句人话就变成了 <code>[1 4 2 3]</code>。</p><p>所以综上来看，没有什么黑魔法，主要需要了解的就是两个关键的函数，分别是 <code>Arrays.copy</code> 和 <code>System.arraycopy</code> 。我们需要把这两个封装好的函数的作用给记住。</p><ul><li><strong>Arrays.copy</strong> 数组扩容</li><li><strong>System.arraycopy</strong> 将数组中某个下标之后元素全部往后移动一位</li></ul><blockquote><p>所以从这里就可以看到，看源码的好处，主要有两个方面。第一，我相信你在刷题的时候一定也遇到过需要将数组的元素整个后移的 case，但是你可能并不知道可以使用 <code>System.arraycopy</code> ，就算你知道有这么个函数可能就连参数都看不懂；第二，知道了 <code>System.arraycopy</code> ，但是觉得这些函数完全没有应用场景。</p></blockquote><h2 id="remove" tabindex="-1"><a class="header-anchor" href="#remove" aria-hidden="true">#</a> remove</h2><p>了解数据怎么来，接下来我们来看一下数据是怎么被移除的。首先我们来看最常用的两种：</p><ul><li>按照下标移除</li><li>根据元素移除</li></ul><h3 id="根据下标移除" tabindex="-1"><a class="header-anchor" href="#根据下标移除" aria-hidden="true">#</a> 根据下标移除</h3><p>首先是根据下标移除</p><figure><img src="'+m+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里也会先检查传入的 <code>index</code> 是否合法，但是这里的 <code>index</code> 和 <code>add</code> 中调用的 <code>rangeCheck</code> 还有点区别。<code>add</code> 中的 <code>rangeCheckForAdd</code> 会判断 <code>index</code> 是否为负数，而 <code>remove</code> 中的 <code>rangeCheck</code> 则只会判断 <code>index</code> 是否 <code>&gt;=</code> 数组中的元素个数。</p><blockquote><p>其实从函数的名称就能看出，<code>rangeCheckForAdd</code> 是专门给 <code>add</code> 方法用的</p></blockquote><p>那如果此时传入的 <code>index</code> 真的是负数怎么办？其实是会抛出 <code>ArrayIndexOutOfBoundsException</code> ，因为<code>remove</code> 方法上加了 <code>Range</code> 注解。</p><figure><img src="'+f+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>完成后，还是会更新 <code>modCount</code> 的值，这也验证了我们上面提到的 <code>modCount</code> 代表的更改中也包含了删除。</p><p>接下来会计算一个 <code>numMoved</code> ，代表需要被移动的元素数量。<code>add</code> 一个元素，对应的下标的元素都需要<strong>往后</strong>顺移一位，<code>remove</code> 同理，删除了某个位置的元素后，其后面对应的所有的元素都需要<strong>往前</strong>顺移一位，就像这样：</p><figure><img src="'+y+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>知道了需要移动多少个元素之后，我们的 <code>System.arraycopy</code> 就又可以登场了。完成了元素的移动之后，数组的末尾必然会空出来一个元素，直接将其设置为 <code>null</code> 然后交给 GC 回收即可，最后把被移除的值返回。</p><h3 id="根据值移除" tabindex="-1"><a class="header-anchor" href="#根据值移除" aria-hidden="true">#</a> 根据值移除</h3><p>举个例子，根据值移除就长下面这样这样。</p><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>废话不多说，直接看核心源码</p><figure><img src="'+k+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>完了，第二行就给整懵了，移除一个 <code>null</code> 是什么鬼？还要循环去移除？</p><p>实际上，ArrayList 允许我们传 <code>null</code> 值进去，再举个例子。</p><figure><img src="'+x+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>看完这个例子，应该就能够明白为什么要做 <code>o == null</code> 的判断了。如果传入的是 <code>null</code> ，ArrayList 会对底层的数组<strong>进行遍历</strong>，并移除匹配到的<strong>第一个</strong>值为 <code>null</code> 的元素。</p><p>如果值不为 <code>null</code> 也是同理，如果数组中有多个一样的值，ArrayList 也会对其进行遍历，并且移除匹配到的第一个值。通过源码可以看到，无论值是否为 <code>null</code> ，其都会调用真正的删除元素方法 <code>fastRemove</code> ，干的事情就跟 <code>remove</code> 做的几乎一样。</p><p>他们的唯一的区别在于，按照下标移除，<strong>会返回被移除的元素</strong>；按照值移除只会<strong>返回是否移除成功</strong>。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>所以，看完 <code>ArrayList</code> 的部分源码之后，我们就可以知道，<code>ArrayList</code> 的底层数据结构是<strong>数组</strong>。虽然对于用户来说 <code>ArrayList</code> 是个动态的数组，但是实际上底层是个<strong>定长数组</strong>，只是在必要的时候，对底层的数组进行扩容，每次扩容 <code>1.5</code> 倍。但是从源码也看出来了，扩容、删除都是有<strong>代价</strong>的，特别是在极端的情况，会需要将大量的元素进行移位。</p><p>所以我们得出结论，<code>ArrayList</code> 如果有频繁的随机插入、频繁的删除操作是会对其性能造成很大影响的， 总结来说，<code>ArrayList</code> 适合用于<strong>读多写少</strong>的场景。</p><blockquote><p>另一个很重要很重要的点，这里提一下，<code>ArrayList</code> 不是线程安全的。多线程的情况下会出现数据不一致或者会抛出 <code>ConcurrentModificationException</code> 异常，关于这块后面有机会再聊吧</p></blockquote><p>了解完如何向一个数据结构中<strong>存取</strong>、<strong>移除</strong>数据，其实就已经能够顺理成章的理解跟其相关的很多事情了。</p><p>举个例子，<code>indexOf</code> 方法用于返回指定元素在数组中的下标，了解完 <code>remove</code> 中的遍历匹配，或者说你甚至可以直接靠直觉就应该想到，<code>indexOf</code> 不就是个 <code>for</code> 循环匹配吗？<code>lastIndexOf</code> 不就是个反向的 <code>for</code> 循环匹配吗？所以在这里再贴出源码除了让文章篇幅更长之外，没有任何意义。这个感兴趣的话可以找源码看一看。</p>',83),A=[b];function v(C,j){return o(),a("div",null,A)}const D=e(_,[["render",v],["__file","230846.html.vue"]]);export{D as default};
