import{_ as l,o as n,c,f as d,a as t,b as e}from"./app-756edb61.js";const a="/images/230857/base64-encode.jpeg",o="/images/230857/base64-encode-2.jpeg",r="/images/230857/base64-decode.jpeg",i="/images/230857/base64-decode-2.jpeg",s={},g=d('<h1 id="base-64原理" tabindex="-1"><a class="header-anchor" href="#base-64原理" aria-hidden="true">#</a> Base 64原理</h1><h2 id="base64" tabindex="-1"><a class="header-anchor" href="#base64" aria-hidden="true">#</a> Base64</h2><p>Base64 是什么？是将字节流转换成可打印字符、将可打印字符转换为字节流的一种<strong>算法</strong>。Base64 使用 64 个可打印字符来表示转换后的数据。</p><p>准确的来说，Base64 不算是一种加、解密的算法，它是一种编码、解码的算法。这也是为什么我的用词是编码、解码，而不是加密、解密。</p><h2 id="编码原理" tabindex="-1"><a class="header-anchor" href="#编码原理" aria-hidden="true">#</a> 编码原理</h2><blockquote><p><strong>这里的讨论的前提是使用 UTF-8 编码</strong></p></blockquote><p>Base64 算法的原理，是将输入流中的字节按每 3 个分为一组，然后每次取 6 个比特，将其转换成表格中对应的数据，一直重复到没有剩余的字符为止，转换表格如下：</p><table><thead><tr><th style="text-align:center;">Index</th><th style="text-align:center;">Character</th><th style="text-align:center;">Index</th><th style="text-align:center;">Character</th><th style="text-align:center;">Index</th><th style="text-align:center;">Character</th><th style="text-align:center;">Index</th><th style="text-align:center;">Character</th></tr></thead><tbody><tr><td style="text-align:center;">0</td><td style="text-align:center;">A</td><td style="text-align:center;">1</td><td style="text-align:center;">B</td><td style="text-align:center;">2</td><td style="text-align:center;">C</td><td style="text-align:center;">3</td><td style="text-align:center;">D</td></tr><tr><td style="text-align:center;">4</td><td style="text-align:center;">E</td><td style="text-align:center;">5</td><td style="text-align:center;">F</td><td style="text-align:center;">6</td><td style="text-align:center;">G</td><td style="text-align:center;">7</td><td style="text-align:center;">H</td></tr><tr><td style="text-align:center;">8</td><td style="text-align:center;">I</td><td style="text-align:center;">9</td><td style="text-align:center;">J</td><td style="text-align:center;">10</td><td style="text-align:center;">K</td><td style="text-align:center;">11</td><td style="text-align:center;">L</td></tr><tr><td style="text-align:center;">12</td><td style="text-align:center;">M</td><td style="text-align:center;">13</td><td style="text-align:center;">N</td><td style="text-align:center;">14</td><td style="text-align:center;">O</td><td style="text-align:center;">15</td><td style="text-align:center;">P</td></tr><tr><td style="text-align:center;">16</td><td style="text-align:center;">Q</td><td style="text-align:center;">17</td><td style="text-align:center;">R</td><td style="text-align:center;">18</td><td style="text-align:center;">S</td><td style="text-align:center;">19</td><td style="text-align:center;">T</td></tr><tr><td style="text-align:center;">20</td><td style="text-align:center;">U</td><td style="text-align:center;">21</td><td style="text-align:center;">V</td><td style="text-align:center;">22</td><td style="text-align:center;">W</td><td style="text-align:center;">23</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">24</td><td style="text-align:center;">Y</td><td style="text-align:center;">25</td><td style="text-align:center;">Z</td><td style="text-align:center;">26</td><td style="text-align:center;">a</td><td style="text-align:center;">27</td><td style="text-align:center;">b</td></tr><tr><td style="text-align:center;">28</td><td style="text-align:center;">c</td><td style="text-align:center;">29</td><td style="text-align:center;">d</td><td style="text-align:center;">30</td><td style="text-align:center;">e</td><td style="text-align:center;">31</td><td style="text-align:center;">f</td></tr><tr><td style="text-align:center;">32</td><td style="text-align:center;">g</td><td style="text-align:center;">33</td><td style="text-align:center;">h</td><td style="text-align:center;">34</td><td style="text-align:center;">i</td><td style="text-align:center;">35</td><td style="text-align:center;">j</td></tr><tr><td style="text-align:center;">36</td><td style="text-align:center;">k</td><td style="text-align:center;">37</td><td style="text-align:center;">l</td><td style="text-align:center;">38</td><td style="text-align:center;">m</td><td style="text-align:center;">39</td><td style="text-align:center;">n</td></tr><tr><td style="text-align:center;">40</td><td style="text-align:center;">o</td><td style="text-align:center;">41</td><td style="text-align:center;">p</td><td style="text-align:center;">42</td><td style="text-align:center;">q</td><td style="text-align:center;">43</td><td style="text-align:center;">r</td></tr><tr><td style="text-align:center;">44</td><td style="text-align:center;">s</td><td style="text-align:center;">45</td><td style="text-align:center;">t</td><td style="text-align:center;">46</td><td style="text-align:center;">u</td><td style="text-align:center;">47</td><td style="text-align:center;">v</td></tr><tr><td style="text-align:center;">48</td><td style="text-align:center;">w</td><td style="text-align:center;">49</td><td style="text-align:center;">x</td><td style="text-align:center;">50</td><td style="text-align:center;">y</td><td style="text-align:center;">51</td><td style="text-align:center;">z</td></tr><tr><td style="text-align:center;">52</td><td style="text-align:center;">0</td><td style="text-align:center;">53</td><td style="text-align:center;">1</td><td style="text-align:center;">54</td><td style="text-align:center;">2</td><td style="text-align:center;">55</td><td style="text-align:center;">3</td></tr><tr><td style="text-align:center;">56</td><td style="text-align:center;">4</td><td style="text-align:center;">57</td><td style="text-align:center;">5</td><td style="text-align:center;">58</td><td style="text-align:center;">6</td><td style="text-align:center;">59</td><td style="text-align:center;">7</td></tr><tr><td style="text-align:center;">60</td><td style="text-align:center;">8</td><td style="text-align:center;">61</td><td style="text-align:center;">9</td><td style="text-align:center;">62</td><td style="text-align:center;">+</td><td style="text-align:center;">63</td><td style="text-align:center;">/</td></tr></tbody></table><h3 id="编码过程" tabindex="-1"><a class="header-anchor" href="#编码过程" aria-hidden="true">#</a> 编码过程</h3><p>举个例子，假设我们要对字符串 <code>S.H</code> 进行编码：</p><ol><li><p>将其转换成十六进制为 53、2e、48</p></li><li><p>再将<strong>十六进制</strong>转换成<strong>二进制</strong>，分别为 <code>01010011</code>、<code>00101110</code>、<code>01001000</code>。这里不足 8 个比特的高位补 0 即可。</p></li><li><p>将其每6个比特分为一组，分别为 <code>010100</code>、<code>110010</code>、<code>111001</code>、<code>001000</code></p></li><li><p>将其转换成十进制得到，20、50、57、8</p></li><li><p>再根据表格中的转换关系转换可得，U、y、5、I</p></li></ol><p>换句话说，字符串 <code>S.H</code> 通过 Base64 算法编码之后的结果为 <code>Uy5I</code> 。</p><h3 id="编码图解" tabindex="-1"><a class="header-anchor" href="#编码图解" aria-hidden="true">#</a> 编码图解</h3><blockquote><p>如果觉得文字较难理解，我把上面的流程用图的形式画了出来，可以结合着一起看。</p></blockquote><figure><img src="'+a+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',15),x=t("p",null,[e("为什么要 每三个 分为一组，因为 3 "),t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mo",null,"×")]),t("annotation",{encoding:"application/x-tex"},"\\times")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.6667em","vertical-align":"-0.0833em"}}),t("span",{class:"mord"},"×")])])]),e(" 8 = 24，24 = 4 "),t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mo",null,"×")]),t("annotation",{encoding:"application/x-tex"},"\\times")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.6667em","vertical-align":"-0.0833em"}}),t("span",{class:"mord"},"×")])])]),e("​ 6，这样子可以刚好可以均分完。")],-1),y=d('<blockquote><p>那如果我输入的字节不足三个呢？</p></blockquote><p>例如 <code>SH</code> ？按照上述的做法：</p><p>首先将其转换成十六进制<code>53</code>、<code>48</code>，再将其转换成二进制<code>01010011</code>、<code>01001000</code>，再按照每 6 个比特分为一组，就会变成 <code>010100</code>、<code>110100</code>、<code>1000</code>，再转换成十进制得到 20、52、8，最后得到 <code>U0I</code>.</p><p>然而这个结果<strong>是不正确的</strong>，随便去找一个工具输入转换看看都知道，最终结果为 <code>U0g=</code>. 这也说明在输入的字符不足 3 个时，就不是按照之前的方式来处理了。</p><blockquote><p>不足三个字节如何处理？</p></blockquote><p>假设需要编码的字符串还是 <code>SH</code>。</p><p>将其转换成二进制为， <code>01010011</code>、<code>01001000</code>，再按照每 6 个比特分为一组，就会变成<code>010100</code>、<code>110100</code>、<code>1000</code>。</p><p>但是可以看到最后一组的比特位不足 6 个，在这种情况下，会进行末尾（低位）补0的操作。补完之后就会变成<code>010100</code>、<code>110100</code>、<code>100000</code>。但是你会发现，这里总共也只有18个比特，不满足 3 个字节一组的原则。在这种情况下，前三组会按照常规的 Base64 进行编码，而缺失的一组则会使用 <code>=</code> 来进行填充。</p><p>这样一来，就会变成<code>20</code>、<code>52</code>、<code>32</code>，再根据表格转换可得 <code>U0g</code> ，再加上最后填充的 <code>=</code> ，最终结果就是 <code>U0g=</code>.</p><p>以下是图解。</p><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>只有一个字节如何处理？</p></blockquote><p>那同理，如果只有一个字符，最后在二进制分组的时候，不足 6 位的低位补 0，分组不满 4 的，直接以 <code>=</code> 号填充。举个例子，假设需要编码的是字符串 <code>S</code> 。</p><p><code>S</code> 的二进制为 <code>01010011</code> ，按照 6 个比特分为一组，<code>010100</code>、<code>11</code>。第二组明显不满 6 个比特，进行低位补0操作。</p><p>低位补0之后结果变成了<code>010100</code>、<code>110000</code>，这里只有 2 组，不满四组，所以这里需要填充 2 个 <code>=</code>。将前面的两组转换成字符，结果为 <code>Uw</code>，再结合填充字符，最终的结果为 <code>Uw==</code>。</p><p>关于编码，有人可能会说，你这都是英文，英文转换成十进制再到十六进制很方便，对比 ASCII 码就行，那要是中文呢？实际上，这个跟采取的编码类别有关系。对同样的中文采用不同的编码，最后得到的结果可能都不同。所以我们这里只讨论采用 <code>UTF-8</code> 的场景。</p><p>如果是中文，就采用 <code>UTF-8</code> 将中文进行编码，而如果是英文，其转换结果和 ASCII 编码是一样的。</p><h2 id="解码原理" tabindex="-1"><a class="header-anchor" href="#解码原理" aria-hidden="true">#</a> 解码原理</h2><p>因为最终的编码产物中，如果 6 个比特的分组不满 4 组，会有 <code>=</code> 作为填充物，所以一个 base64 完后的产物总是能够被 4 整除。</p><p>所以，在解密中，我们每次需要处理 4 个字符，将这 4 个字符编码之后转换成十进制，再转换成二进制，不足 6 位的<strong>高位补0</strong>，然后将 6 个比特一组的二进制数按原顺序重新分成每 8 个比特一组，也就是一个字节一组。然后将其转换成十六进制，再转换成对应的字符。</p><h3 id="解码过程" tabindex="-1"><a class="header-anchor" href="#解码过程" aria-hidden="true">#</a> 解码过程</h3><blockquote><p>假设我们需要解密的字符为 <code>Uy5I</code></p></blockquote><p>解密过程就会像：</p><ol><li>按照每次处理4个字符的原理，根据表格将其分别转换成十进制<code>20</code>、<code>50</code>、<code>57</code>、<code>8</code></li><li>再将其转换成二进制，不足六位的<strong>高位补0</strong>，再将其分成每 8 个比特一组</li><li>将分组好的比特转换成十六进制，得到<code>53</code>、<code>2e</code>、<code>48</code></li><li>最后将十六进制转换成字母得到<code>S</code>、<code>.</code>、<code>H</code>，也就是 <code>S.H</code></li></ol><h3 id="解码图解" tabindex="-1"><a class="header-anchor" href="#解码图解" aria-hidden="true">#</a> 解码图解</h3><blockquote><p>换成图片来说就是如下这样</p></blockquote><figure><img src="'+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这里我们处理的是一个比较理想的情况，因为所有的比特位刚好被填充完，那如果带有 <code>=</code> padding 的 base64 是如何进行解密的呢？</p><blockquote><p>这里拿 <code>SH</code> 编码之后的 base64 字符串 <code>U0g=</code> 来做例子</p></blockquote><ol><li>首先根据表格，将其转换成十进制<code>20</code>、<code>50</code>、<code>32</code></li><li>再将其转换成二进制，不足 6 个比特的高位补0，<code>010100</code>、<code>110100</code>、<code>100000</code></li><li>再将其分成每 8 个比特位一组，<code>01010011</code>、<code>01001000</code>、</li><li>然后再转换成十六进制得<code>53</code>、<code>48</code></li><li>转换成字符串可得 <code>SH</code></li></ol><figure><img src="'+i+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',31),p=[g,x,y];function h(u,b){return n(),c("div",null,p)}const f=l(s,[["render",h],["__file","230857.html.vue"]]);export{f as default};
