import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as d,c as l,a as e,b as s,d as t,f as r}from"./app-0f9babf2.js";const u="/images/230838/container.jpeg",o="/images/230838/left-push.jpeg",v="/images/230838/right-push.jpeg",c={},p=e("h1",{id:"在java中使用redistemplate操作缓存",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#在java中使用redistemplate操作缓存","aria-hidden":"true"},"#"),s(" 在Java中使用redisTemplate操作缓存")],-1),m=e("h2",{id:"背景",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#背景","aria-hidden":"true"},"#"),s(" 背景")],-1),q=e("p",null,"在最近的项目中，有一个需求是对一个很大的数据库进行查询，数据量大概在几千万条。但同时对查询速度的要求也比较高。",-1),b={href:"https://prestodb.io/",target:"_blank",rel:"noopener noreferrer"},h=r(`<p>我们的下一个解决方案就是Presto，在使用了Presto之后，查询速度降到了秒级。但是对于一个前端查询界面的交互式查询来说，十几秒仍然是一个不能接受的时间。</p><p>虽然Presto相比Hive已经快了很多（FaceBook官方宣称的是10倍），但是对分页的支持不是很友好。我在使用的时候是自己在后端实现的分页。</p><p>在这种情况下应用缓存实属无奈之举。讲道理，优化应从底层开始，自底而上。上层优化的方式和效率感觉都很有局限。</p><h2 id="为什么要使用缓存" tabindex="-1"><a class="header-anchor" href="#为什么要使用缓存" aria-hidden="true">#</a> 为什么要使用缓存</h2><p>前端查询中，单次查询的匹配数据量有可能会达到上百甚至上千条，在前端中肯定是需要分页展示的。就算每次查询10条数据，整个查询也要耗时6-8s的时间。想象一下，每翻一页等10s的场景。</p><p>所以，此时使用redis缓存。减少请求数据库的次数。将匹配的数据一并存入数据库。这样只有在第一次查询时耗费长一点，一旦查询完成，用户点击下一页就是毫秒级别的操作了。</p><h2 id="使用redistemplate" tabindex="-1"><a class="header-anchor" href="#使用redistemplate" aria-hidden="true">#</a> 使用redisTemplate</h2><p>Spring封装了一个比较强大的模板，也就是redisTemplate，方便在开发的时候操作Redis缓存。在Redis中可以存储String、List、Set、Hash、Zset。下面将针对List和Hash分别介绍。</p><h3 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> List</h3><p>Redis中的List为简单的字符串列表，常见的有下面几种操作。</p><h4 id="haskey" tabindex="-1"><a class="header-anchor" href="#haskey" aria-hidden="true">#</a> hasKey</h4><p>判断一个键是否存在，只需要调用<code>hasKey</code>就可以了。假设这个Key是<code>test</code>，具体用法如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>if (redisTemplate.hasKey(&quot;test&quot;)) {
    System.out.println(&quot;存在&quot;);
} else {
    System.out.println(&quot;不存在&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="range" tabindex="-1"><a class="header-anchor" href="#range" aria-hidden="true">#</a> range</h4><p>该函数用于从redis缓存中获取指定区间的数据。具体用法如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>if (redisTemplate.hasKey(&quot;test&quot;)) {
    // 该键的值为 [4, 3, 2, 1]
    System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, 0)); // [4]
    System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, 1)); // [4, 3]
    System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, 2)); // [4, 3, 2]
    System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, 3)); // [4, 3, 2, 1]
    System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, 4)); // [4, 3, 2, 1]
    System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, 5)); // [4, 3, 2, 1]
    
    System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1)); // [4, 3, 2, 1] 如果结束位是-1， 则表示取所有的值
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="delete" tabindex="-1"><a class="header-anchor" href="#delete" aria-hidden="true">#</a> delete</h4><p>删除某个键。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; test = new ArrayList&lt;&gt;();
test.add(&quot;1&quot;);
test.add(&quot;2&quot;);
test.add(&quot;3&quot;);
test.add(&quot;4&quot;);

redisTemplate.opsForList().rightPushAll(&quot;test&quot;, test);
System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1)); // [1, 2, 3, 4]
redisTemplate.delete(&quot;test&quot;);
System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1)); // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="size" tabindex="-1"><a class="header-anchor" href="#size" aria-hidden="true">#</a> size</h4><p>获取该键的集合长度。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; test = new ArrayList&lt;&gt;();
test.add(&quot;1&quot;);
test.add(&quot;2&quot;);
test.add(&quot;3&quot;);
test.add(&quot;4&quot;);

redisTemplate.opsForList().rightPushAll(&quot;test&quot;, test);
System.out.println(redisTemplate.opsForList().size(&quot;test&quot;)); // 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="leftpush" tabindex="-1"><a class="header-anchor" href="#leftpush" aria-hidden="true">#</a> leftPush</h4><p>我们把存放这个值的地方想象成如图所示的容器。</p><figure><img src="`+u+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>并且取数据总是从左边取，但是存数据可以从左也可以从右。左就是<code>leftPush</code>，右就是<code>rightPush</code>。leftPush如下图所示。</p><figure><img src="'+o+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>用法如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>for (int i = 0; i &lt; 4; i++) {
    Integer value = i + 1;
    redisTemplate.opsForList().leftPush(&quot;test&quot;, value.toString());
    System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制台输出的结果如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">2</span>, <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">3</span>, <span class="token number">2</span>, <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">4</span>, <span class="token number">3</span>, <span class="token number">2</span>, <span class="token number">1</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="leftpushall" tabindex="-1"><a class="header-anchor" href="#leftpushall" aria-hidden="true">#</a> leftPushAll</h4><p>基本和leftPush一样，只不过是一次性的将List入栈。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; test = new ArrayList&lt;&gt;();
test.add(&quot;1&quot;);
test.add(&quot;2&quot;);
test.add(&quot;3&quot;);
test.add(&quot;4&quot;);
redisTemplate.opsForList().leftPushAll(&quot;test&quot;, test);
System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1)); // [4, 3, 2, 1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然你也可以这样</p><div class="language-angular2 line-numbers-mode" data-ext="angular2"><pre class="language-angular2"><code>redisTemplate.opsForList().leftPushAll(&quot;test&quot;, t&quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;);
System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1)); // [4, 3, 2, 1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="leftpushifpresent" tabindex="-1"><a class="header-anchor" href="#leftpushifpresent" aria-hidden="true">#</a> leftPushIfPresent</h4><p>跟<code>leftPush</code>是同样的操作，唯一的不同是，当且仅当key存在时，才会更新key的值。如果key不存在则不会对数据进行任何操作。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>redisTemplate.delete(&quot;test&quot;);

redisTemplate.opsForList().leftPushIfPresent(&quot;test&quot;, &quot;1&quot;);
redisTemplate.opsForList().leftPushIfPresent(&quot;test&quot;, &quot;2&quot;);
System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1)); // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="leftpop" tabindex="-1"><a class="header-anchor" href="#leftpop" aria-hidden="true">#</a> leftPop</h4><p>该函数用于移除上面我们抽象的容器中的最左边的一个元素。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; test = new ArrayList&lt;&gt;();
test.add(&quot;1&quot;);
test.add(&quot;2&quot;);
test.add(&quot;3&quot;);
test.add(&quot;4&quot;);
redisTemplate.opsForList().rightPushAll(&quot;test&quot;, test);

redisTemplate.opsForList().leftPop(&quot;test&quot;); // [2, 3, 4]
redisTemplate.opsForList().leftPop(&quot;test&quot;); // [3, 4]
redisTemplate.opsForList().leftPop(&quot;test&quot;); // [4]
redisTemplate.opsForList().leftPop(&quot;test&quot;); // []
redisTemplate.opsForList().leftPop(&quot;test&quot;); // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，当返回为空后，在redis中这个key也不复存在了。如果此时再调用<a href="#leftPushIfPresent">leftPushIfPresent</a>，是无法再添加数据的。有代码有真相。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; test = new ArrayList&lt;&gt;();
test.add(&quot;1&quot;);
test.add(&quot;2&quot;);
test.add(&quot;3&quot;);
test.add(&quot;4&quot;);
redisTemplate.opsForList().rightPushAll(&quot;test&quot;, test);

redisTemplate.opsForList().leftPop(&quot;test&quot;); // [2, 3, 4]
redisTemplate.opsForList().leftPop(&quot;test&quot;); // [3, 4]
redisTemplate.opsForList().leftPop(&quot;test&quot;); // [4]
redisTemplate.opsForList().leftPop(&quot;test&quot;); // []
redisTemplate.opsForList().leftPop(&quot;test&quot;); // []

redisTemplate.opsForList().leftPushIfPresent(&quot;test&quot;, &quot;1&quot;); // []
redisTemplate.opsForList().leftPushIfPresent(&quot;test&quot;, &quot;1&quot;); // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rightpush" tabindex="-1"><a class="header-anchor" href="#rightpush" aria-hidden="true">#</a> rightPush</h4><p>rightPush如下图所示。</p><figure><img src="`+v+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>用法如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>for (int i = 0; i &lt; 4; i++) {
    Integer value = i + 1;
    redisTemplate.opsForList().leftPush(&quot;test&quot;, value.toString());
    System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制台输出的结果如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">1</span>, <span class="token number">2</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rightpushall" tabindex="-1"><a class="header-anchor" href="#rightpushall" aria-hidden="true">#</a> rightPushAll</h4><p>同rightPush，一次性将List存入。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; test = new ArrayList&lt;&gt;();
test.add(&quot;1&quot;);
test.add(&quot;2&quot;);
test.add(&quot;3&quot;);
test.add(&quot;4&quot;);
redisTemplate.opsForList().rightPushAll(&quot;test&quot;, test);
System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1)); // [1, 2, 3, 4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然你也可以这样。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>redisTemplate.opsForList().rightPushAll(&quot;test&quot;, &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;);
System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1)); // [1, 2, 3, 4]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rightpushifpresent" tabindex="-1"><a class="header-anchor" href="#rightpushifpresent" aria-hidden="true">#</a> rightPushIfPresent</h4><p>跟<code>rightPush</code>是同样的操作，唯一的不同是，当且仅当key存在时，才会更新key的值。如果key不存在则不会对数据进行任何操作。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>redisTemplate.delete(&quot;test&quot;);

redisTemplate.opsForList().rightPushIfPresent(&quot;test&quot;, &quot;1&quot;);
redisTemplate.opsForList().rightPushIfPresent(&quot;test&quot;, &quot;2&quot;);
System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1)); // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rightpop" tabindex="-1"><a class="header-anchor" href="#rightpop" aria-hidden="true">#</a> rightPop</h4><p>该函数用于移除上面我们抽象的容器中的最右边的一个元素。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; test = new ArrayList&lt;&gt;();
test.add(&quot;1&quot;);
test.add(&quot;2&quot;);
test.add(&quot;3&quot;);
test.add(&quot;4&quot;);
redisTemplate.opsForList().rightPushAll(&quot;test&quot;, test);

redisTemplate.opsForList().rightPop(&quot;test&quot;); // [1, 2, 3]
redisTemplate.opsForList().rightPop(&quot;test&quot;); // [1, 2]
redisTemplate.opsForList().rightPop(&quot;test&quot;); // [1]
redisTemplate.opsForList().rightPop(&quot;test&quot;); // []
redisTemplate.opsForList().rightPop(&quot;test&quot;); // []
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与<a href="#leftPop">leftPop</a>一样，返回空之后，再调用<a href="#rightPushIfPresent">rightPushIfPresent</a>，是无法再添加数据的。</p><h4 id="index" tabindex="-1"><a class="header-anchor" href="#index" aria-hidden="true">#</a> index</h4><p>获取list中指定位置的元素。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>if (redisTemplate.hasKey(&quot;test&quot;)) {
    // 该键的值为 [1, 2, 3, 4]
    System.out.println(redisTemplate.opsForList().index(&quot;test&quot;, -1)); // 4
    System.out.println(redisTemplate.opsForList().index(&quot;test&quot;, 0)); // 1
    System.out.println(redisTemplate.opsForList().index(&quot;test&quot;, 1)); // 2
    System.out.println(redisTemplate.opsForList().index(&quot;test&quot;, 2)); // 3
    System.out.println(redisTemplate.opsForList().index(&quot;test&quot;, 3)); // 4
    System.out.println(redisTemplate.opsForList().index(&quot;test&quot;, 4)); // null
    System.out.println(redisTemplate.opsForList().index(&quot;test&quot;, 5)); // null
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的有两点。一个是如果下标是<code>-1</code>的话，则会返回List最后一个元素，另一个如果数组下标越界，则会返回<code>null</code>。</p><h4 id="trim" tabindex="-1"><a class="header-anchor" href="#trim" aria-hidden="true">#</a> trim</h4><p>用于截取指定区间的元素，可能你会理解成与<a href="#range">range</a>是一样的作用。看了下面的代码之后应该就会立刻理解。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; test = new ArrayList&lt;&gt;();
test.add(&quot;1&quot;);
test.add(&quot;2&quot;);
test.add(&quot;3&quot;);
test.add(&quot;4&quot;);
redisTemplate.opsForList().rightPushAll(&quot;test&quot;, test); // [1, 2, 3, 4]

redisTemplate.opsForList().trim(&quot;test&quot;, 0, 2); // [1, 2, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实作用完全不一样。<code>range</code>是获取指定区间内的数据，而<code>trim</code>是留下指定区间的数据，删除不在区间的所有数据。<code>trim</code>是<code>void</code>，不会返回任何数据。</p><h4 id="remove" tabindex="-1"><a class="header-anchor" href="#remove" aria-hidden="true">#</a> remove</h4><p>用于移除键中指定的元素。接受3个参数，分别是缓存的键名，计数事件，要移除的值。计数事件可以传入的有三个值，分别是<code>-1</code>、<code>0</code>、<code>1</code>。</p><p><code>-1</code>代表从存储容器的最右边开始，删除一个与要移除的值匹配的数据；<code>0</code>代表删除所有与传入值匹配的数据；<code>1</code>代表从存储容器的最左边开始，删除一个与要移除的值匹配的数据。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; test = new ArrayList&lt;&gt;();
test.add(&quot;1&quot;);
test.add(&quot;2&quot;);
test.add(&quot;3&quot;);
test.add(&quot;4&quot;);
test.add(&quot;4&quot;);
test.add(&quot;3&quot;);
test.add(&quot;2&quot;);
test.add(&quot;1&quot;);

redisTemplate.opsForList().rightPushAll(&quot;test&quot;, test); // [1, 2, 3, 4, 4, 3, 2, 1]

// 当计数事件是-1、传入值是1时
redisTemplate.opsForList().remove(&quot;test&quot;, -1, &quot;1&quot;); // [1, 2, 3, 4, 4, 3, 2]

// 当计数事件是1，传入值是1时
redisTemplate.opsForList().remove(&quot;test&quot;, 1, &quot;1&quot;); // [2, 3, 4, 4, 3, 2]

// 当计数事件是0，传入值是4时
redisTemplate.opsForList().remove(&quot;test&quot;, 0, &quot;4&quot;); // [2, 3, 3, 2]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rightpopandleftpush" tabindex="-1"><a class="header-anchor" href="#rightpopandleftpush" aria-hidden="true">#</a> rightPopAndLeftPush</h4><p>该函数用于操作两个键之间的数据，接受两个参数，分别是源key、目标key。该函数会将源key进行<a href="#rightPop">rightPop</a>，再将返回的值，作为输入参数，在目标key上进行<a href="#leftPush">leftPush</a>。具体代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; test = new ArrayList&lt;&gt;();
test.add(&quot;1&quot;);
test.add(&quot;2&quot;);
test.add(&quot;3&quot;);
test.add(&quot;4&quot;);

List&lt;String&gt; test2 = new ArrayList&lt;&gt;();
test2.add(&quot;1&quot;);
test2.add(&quot;2&quot;);
test2.add(&quot;3&quot;);

redisTemplate.opsForList().rightPushAll(&quot;test&quot;, test); // [1, 2, 3, 4]
redisTemplate.opsForList().rightPushAll(&quot;test2&quot;, test2); // [1, 2, 3]

redisTemplate.opsForList().rightPopAndLeftPush(&quot;test&quot;, &quot;test2&quot;);

System.out.println(redisTemplate.opsForList().range(&quot;test&quot;, 0, -1)); // [1, 2, 3]
System.out.println(redisTemplate.opsForList().range(&quot;test2&quot;, 0, -1)); // [4, 1, 2, 3]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> Hash</h3><p>存储类型为hash其实很好理解。在上述的<code>List</code>中，一个redis的Key可以理解为一个List，而在<code>Hash</code>中，一个redis的Key可以理解为一个HashMap。</p><h4 id="put" tabindex="-1"><a class="header-anchor" href="#put" aria-hidden="true">#</a> put</h4><p>用于写入数据。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);

redisTemplate.opsForHash().put(&quot;test&quot;, &quot;map&quot;, list.toString()); // [1, 2, 3, 4]
redisTemplate.opsForHash().put(&quot;test&quot;, &quot;isAdmin&quot;, true); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="putall" tabindex="-1"><a class="header-anchor" href="#putall" aria-hidden="true">#</a> putALl</h4><p>用于一次性向一个Hash键中添加多个key。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);
List&lt;String&gt; list2 = new ArrayList&lt;&gt;();
list2.add(&quot;5&quot;);
list2.add(&quot;6&quot;);
list2.add(&quot;7&quot;);
list2.add(&quot;8&quot;);
Map&lt;String, String&gt; valueMap = new HashMap&lt;&gt;();
valueMap.put(&quot;map1&quot;, list.toString());
valueMap.put(&quot;map2&quot;, list2.toString());

redisTemplate.opsForHash().putAll(&quot;test&quot;, valueMap); // {map2=[5, 6, 7, 8], map1=[1, 2, 3, 4]}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="putifabsent" tabindex="-1"><a class="header-anchor" href="#putifabsent" aria-hidden="true">#</a> putIfAbsent</h4><p>用于向一个Hash键中写入数据。当key在Hash键中已经存在时，则不会写入任何数据，只有在Hash键中不存在这个key时，才会写入数据。</p><p>同时，如果连这个Hash键都不存在，redisTemplate会新建一个Hash键，再写入key。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);
redisTemplate.opsForHash().putIfAbsent(&quot;test&quot;, &quot;map&quot;, list.toString());
System.out.println(redisTemplate.opsForHash().entries(&quot;test&quot;)); // {map=[1, 2, 3, 4]}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="get" tabindex="-1"><a class="header-anchor" href="#get" aria-hidden="true">#</a> get</h4><p>用于获取数据。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);

redisTemplate.opsForHash().put(&quot;test&quot;, &quot;map&quot;, list.toString());
redisTemplate.opsForHash().put(&quot;test&quot;, &quot;isAdmin&quot;, true);

System.out.println(redisTemplate.opsForHash().get(&quot;test&quot;, &quot;map&quot;)); // [1, 2, 3, 4]
System.out.println(redisTemplate.opsForHash().get(&quot;test&quot;, &quot;isAdmin&quot;)); // true

Boolean bool = (Boolean) redisTemplate.opsForHash().get(&quot;test&quot;, &quot;isAdmin&quot;);
System.out.println(bool); // true

String str = redisTemplate.opsForHash().get(&quot;test&quot;, &quot;map&quot;).toString();
List&lt;String&gt; array = JSONArray.parseArray(str, String.class);
System.out.println(array.size()); // 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>值得注意的是，使用<code>get</code>函数获取的数据都是Object类型。</p><p>所以需要使用类型与上述例子中的布尔类型的话，则需要强制转换一次。<code>List</code>类型则可以使用<code>fastjson</code>这种工具来进行转换。转换的例子已列举在上述代码中。</p><h4 id="delete-1" tabindex="-1"><a class="header-anchor" href="#delete-1" aria-hidden="true">#</a> delete</h4><p>用于删除一个Hash键中的key。可以理解为删除一个map中的某个key。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code> List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);
List&lt;String&gt; list2 = new ArrayList&lt;&gt;();
list2.add(&quot;5&quot;);
list2.add(&quot;6&quot;);
list2.add(&quot;7&quot;);
list2.add(&quot;8&quot;);
Map&lt;String, String&gt; valueMap = new HashMap&lt;&gt;();
valueMap.put(&quot;map1&quot;, list.toString());
valueMap.put(&quot;map2&quot;, list2.toString());

redisTemplate.opsForHash().putAll(&quot;test&quot;, valueMap); // {map2=[5, 6, 7, 8], map1=[1, 2, 3, 4]}
redisTemplate.opsForHash().delete(&quot;test&quot;, &quot;map1&quot;); // {map2=[5, 6, 7, 8]}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="values" tabindex="-1"><a class="header-anchor" href="#values" aria-hidden="true">#</a> values</h4><p>用于获取一个Hash类型的键的所有值。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);

redisTemplate.opsForHash().put(&quot;test&quot;, &quot;map&quot;, list.toString());
redisTemplate.opsForHash().put(&quot;test&quot;, &quot;isAdmin&quot;, true);

System.out.println(redisTemplate.opsForHash().values(&quot;test&quot;)); // [[1, 2, 3, 4], true]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="entries" tabindex="-1"><a class="header-anchor" href="#entries" aria-hidden="true">#</a> entries</h4><p>用于以Map的格式获取一个Hash键的所有值。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);

redisTemplate.opsForHash().put(&quot;test&quot;, &quot;map&quot;, list.toString());
redisTemplate.opsForHash().put(&quot;test&quot;, &quot;isAdmin&quot;, true);

Map&lt;String, String&gt; map = redisTemplate.opsForHash().entries(&quot;test&quot;);
System.out.println(map.get(&quot;map&quot;)); // [1, 2, 3, 4]
System.out.println(map.get(&quot;map&quot;) instanceof String); // true
System.out.println(redisTemplate.opsForHash().entries(&quot;test&quot;)); // {a=[1, 2, 3, 4], isAdmin=true}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="haskey-1" tabindex="-1"><a class="header-anchor" href="#haskey-1" aria-hidden="true">#</a> hasKey</h4><p>用于获取一个Hash键中是否含有某个键。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);

redisTemplate.opsForHash().put(&quot;test&quot;, &quot;map&quot;, list.toString());
redisTemplate.opsForHash().put(&quot;test&quot;, &quot;isAdmin&quot;, true);

System.out.println(redisTemplate.opsForHash().hasKey(&quot;test&quot;, &quot;map&quot;)); // true
System.out.println(redisTemplate.opsForHash().hasKey(&quot;test&quot;, &quot;b&quot;)); // false
System.out.println(redisTemplate.opsForHash().hasKey(&quot;test&quot;, &quot;isAdmin&quot;)); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="keys" tabindex="-1"><a class="header-anchor" href="#keys" aria-hidden="true">#</a> keys</h4><p>用于获取一个Hash键中所有的键。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);

redisTemplate.opsForHash().put(&quot;test&quot;, &quot;map&quot;, list.toString());
redisTemplate.opsForHash().put(&quot;test&quot;, &quot;isAdmin&quot;, true);

System.out.println(redisTemplate.opsForHash().keys(&quot;test&quot;)); // [a, isAdmin]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="size-1" tabindex="-1"><a class="header-anchor" href="#size-1" aria-hidden="true">#</a> size</h4><p>用于获取一个Hash键中包含的键的数量。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);

redisTemplate.opsForHash().put(&quot;test&quot;, &quot;map&quot;, list.toString());
redisTemplate.opsForHash().put(&quot;test&quot;, &quot;isAdmin&quot;, true);

System.out.println(redisTemplate.opsForHash().size(&quot;test&quot;)); // 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="increment" tabindex="-1"><a class="header-anchor" href="#increment" aria-hidden="true">#</a> increment</h4><p>用于让一个Hash键中的某个key，根据传入的值进行累加。传入的数值只能是<code>double</code>或者<code>long</code>，不接受浮点型</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>redisTemplate.opsForHash().increment(&quot;test&quot;, &quot;a&quot;, 3);
redisTemplate.opsForHash().increment(&quot;test&quot;, &quot;a&quot;, -3);
redisTemplate.opsForHash().increment(&quot;test&quot;, &quot;a&quot;, 1);
redisTemplate.opsForHash().increment(&quot;test&quot;, &quot;a&quot;, 0);

System.out.println(redisTemplate.opsForHash().entries(&quot;test&quot;)); // {a=1}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="multiget" tabindex="-1"><a class="header-anchor" href="#multiget" aria-hidden="true">#</a> multiGet</h4><p>用于批量的获取一个Hash键中多个key的值。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);
List&lt;String&gt; list2 = new ArrayList&lt;&gt;();
list2.add(&quot;5&quot;);
list2.add(&quot;6&quot;);
list2.add(&quot;7&quot;);
list2.add(&quot;8&quot;);

redisTemplate.opsForHash().put(&quot;test&quot;, &quot;map1&quot;, list.toString()); // [1, 2, 3, 4]
redisTemplate.opsForHash().put(&quot;test&quot;, &quot;map2&quot;, list2.toString()); // [5, 6, 7, 8]

List&lt;String&gt; keys = new ArrayList&lt;&gt;();
keys.add(&quot;map1&quot;);
keys.add(&quot;map2&quot;);

System.out.println(redisTemplate.opsForHash().multiGet(&quot;test&quot;, keys)); // [[1, 2, 3, 4], [5, 6, 7, 8]]
System.out.println(redisTemplate.opsForHash().multiGet(&quot;test&quot;, keys) instanceof List); // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="scan" tabindex="-1"><a class="header-anchor" href="#scan" aria-hidden="true">#</a> scan</h4><p>获取所以匹配条件的Hash键中key的值。我查过一些资料，大部分写的是无法模糊匹配，我自己尝试了一下，其实是可以的。如下，使用<code>scan</code>模糊匹配hash键的key中，带<code>SCAN</code>的key。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add(&quot;1&quot;);
list.add(&quot;2&quot;);
list.add(&quot;3&quot;);
list.add(&quot;4&quot;);
List&lt;String&gt; list2 = new ArrayList&lt;&gt;();
list2.add(&quot;5&quot;);
list2.add(&quot;6&quot;);
list2.add(&quot;7&quot;);
list2.add(&quot;8&quot;);
List&lt;String&gt; list3 = new ArrayList&lt;&gt;();
list3.add(&quot;9&quot;);
list3.add(&quot;10&quot;);
list3.add(&quot;11&quot;);
list3.add(&quot;12&quot;);
Map&lt;String, String&gt; valueMap = new HashMap&lt;&gt;();
valueMap.put(&quot;map1&quot;, list.toString());
valueMap.put(&quot;SCAN_map2&quot;, list2.toString());
valueMap.put(&quot;map3&quot;, list3.toString());

redisTemplate.opsForHash().putAll(&quot;test&quot;, valueMap); // {SCAN_map2=[5, 6, 7, 8], map3=[9, 10, 11, 12], map1=[1, 2, 3, 4]}

Cursor&lt;Map.Entry&lt;String, String&gt;&gt; cursor = redisTemplate.opsForHash().scan(&quot;test&quot;, ScanOptions.scanOptions().match(&quot;*SCAN*&quot;).build());
if (cursor.hasNext()) {
    while (cursor.hasNext()) {
        Map.Entry&lt;String, String&gt; entry = cursor.next();
        System.out.println(entry.getValue()); // [5, 6, 7, 8]
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="引入redistemplate" tabindex="-1"><a class="header-anchor" href="#引入redistemplate" aria-hidden="true">#</a> 引入redisTemplate</h2><p>如果大家看懂了怎么用，就可以将redisTemplate引入项目中了。</p><h3 id="引入pom依赖" tabindex="-1"><a class="header-anchor" href="#引入pom依赖" aria-hidden="true">#</a> 引入pom依赖</h3><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.0.5.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="新建配置文件" tabindex="-1"><a class="header-anchor" href="#新建配置文件" aria-hidden="true">#</a> 新建配置文件</h3><p>然后需要新建一个<code>RedisConfig</code>配置文件。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package com.detectivehlh;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;

/**
 * RedisConfig
 *
 * @author Lunhao Hu
 * @date 2019-01-17 15:12
 **/
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate&lt;String, String&gt; redisTemplate(RedisConnectionFactory factory) {
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        //redis序列化
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        jackson2JsonRedisSerializer.setObjectMapper(om);

        StringRedisTemplate template = new StringRedisTemplate(factory);
        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.setHashKeySerializer(jackson2JsonRedisSerializer);
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.afterPropertiesSet();
        return template;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注入" tabindex="-1"><a class="header-anchor" href="#注入" aria-hidden="true">#</a> 注入</h3><p>将redisTemplate注入到需要使用的地方。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@Autowired
private RedisTemplate redisTemplate;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="写在后面" tabindex="-1"><a class="header-anchor" href="#写在后面" aria-hidden="true">#</a> 写在后面</h2>`,133),g={href:"https://github.com/detectiveHLH",target:"_blank",rel:"noopener noreferrer"};function f(L,y){const i=a("ExternalLinkIcon");return d(),l("div",null,[p,m,q,e("p",null,[s("这个数据库之前在没有使用"),e("a",b,[s("Presto"),t(i)]),s("的情况下，使用的是Hive，使用Hive进行一个简单的查询，速度可能在几分钟。当然几分钟也并不完全是跑SQL的时间，这里面包含发请求，查询数据并且返回数据的时间的总和。但是即使这样，这样的速度明显不能满足交互式的查询需求。")]),h,e("p",null,[e("a",g,[s("Github"),t(i)])])])}const k=n(c,[["render",f],["__file","230838.html.vue"]]);export{k as default};
