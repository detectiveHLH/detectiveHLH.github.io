import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-5a161a5d.js";const p={},e=t(`<h1 id="使用intellij-idea新建java-web后端resfulapi模板" tabindex="-1"><a class="header-anchor" href="#使用intellij-idea新建java-web后端resfulapi模板" aria-hidden="true">#</a> 使用IntelliJ IDEA新建Java Web后端resfulAPI模板</h1><h2 id="初始化项目" tabindex="-1"><a class="header-anchor" href="#初始化项目" aria-hidden="true">#</a> 初始化项目</h2><p>打开IntelliJ IDEA，我的版本是Version 2018.1.4。点击Create New Project。在左侧的列表中选择Maven。然后在右侧勾选Create from archetype。</p><p>然后在右侧的列表中选择org.apache.maven.archetypes:maven-archetype-webapp。点击next。</p><p>填写GroupId和ArtifactId。GroupId定义了项目属于哪个组织，例如，我们需要使用一个包，名字叫做fastjson，用户在项目中返回json数据的，是阿里的开源框架，被不少企业使用，是一个极其优秀的Json框架。它的groupId是com.alibaba，artifactId是fastjson。</p><p>简单理解一下，拿Github举个例子。GroupId就相当于是你的用户名，而ArtifactId就相当于是你的具体某个项目的名称，也是我们当前的项目的根目录名称。例子如下。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GroupId<span class="token operator">:</span> com.detectivehlh.test
ArtifactId<span class="token operator">:</span> testDemo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>点击next，下两页不用设置，直接点击next。此时新建项目成功，右下角会弹出一个提示框，上面写着Maven projects need to be imported.此时选择Enable Auto-Import。就可以看到项目开始自动的去加载依赖包了。加载完成之后，项目会多出一个src目录。</p><h2 id="引入jersey和servlet" tabindex="-1"><a class="header-anchor" href="#引入jersey和servlet" aria-hidden="true">#</a> 引入jersey和servlet</h2><p>打开根目录下pom.xml文件，在dependencies标签中添加如下代码，引入servlet。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.glassfish.jersey.containers<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>jersey-container-servlet<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.22.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开/src/main/webapp/WEB_INF/web.xml。在web-app标签之间添加如下代码。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-name</span><span class="token punctuation">&gt;</span></span>JAX-RS Servlet<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-name</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-class</span><span class="token punctuation">&gt;</span></span>org.glassfish.jersey.servlet.ServletContainer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-class</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>init-param</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-name</span><span class="token punctuation">&gt;</span></span>jersey.config.server.provider.packages<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-name</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param-value</span><span class="token punctuation">&gt;</span></span>com.detectivehlh.test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param-value</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>init-param</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>load-on-startup</span><span class="token punctuation">&gt;</span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>load-on-startup</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-mapping</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>servlet-name</span><span class="token punctuation">&gt;</span></span>JAX-RS Servlet<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-name</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>url-pattern</span><span class="token punctuation">&gt;</span></span>/api/*<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>url-pattern</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>servlet-mapping</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="新建项目目录和文件" tabindex="-1"><a class="header-anchor" href="#新建项目目录和文件" aria-hidden="true">#</a> 新建项目目录和文件</h2><p>在/src/main目录下新建java、resources目录，java放项目java源代码，resources放项目的静态资源文件。</p><p>打开File中的Project Structure，或者使用快捷键，command + ;就可以快捷打开了。将刚刚创建的名为java目录设置为Sources，resources设置为Resources。然后Apply。然后在java目录下依次新建com.detectivehlh.test三个包，就是我们的GroupId.</p><p>然后在com.detectivehlh.test中新建Hello类。代码如下。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">package</span> com<span class="token punctuation">.</span>detectivehlh<span class="token punctuation">.</span>test<span class="token punctuation">;</span>

<span class="token keyword">import</span> com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>fastjson<span class="token punctuation">.</span>JSONObject<span class="token punctuation">;</span>

<span class="token keyword">import</span> javax<span class="token punctuation">.</span>ws<span class="token punctuation">.</span>rs<span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> javax<span class="token punctuation">.</span>ws<span class="token punctuation">.</span>rs<span class="token punctuation">.</span>Path<span class="token punctuation">;</span>
<span class="token keyword">import</span> javax<span class="token punctuation">.</span>ws<span class="token punctuation">.</span>rs<span class="token punctuation">.</span>Produces<span class="token punctuation">;</span>
<span class="token keyword">import</span> javax<span class="token punctuation">.</span>ws<span class="token punctuation">.</span>rs<span class="token punctuation">.</span>core<span class="token punctuation">.</span>MediaType<span class="token punctuation">;</span>
<span class="token keyword">import</span> javax<span class="token punctuation">.</span>ws<span class="token punctuation">.</span>rs<span class="token punctuation">.</span>core<span class="token punctuation">.</span>Response<span class="token punctuation">;</span>
<span class="token keyword">import</span> java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>ArrayList<span class="token punctuation">;</span>
<span class="token keyword">import</span> java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>List<span class="token punctuation">;</span>

@<span class="token function">Path</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Hello</span> <span class="token punctuation">{</span>
    @<span class="token function">Path</span><span class="token punctuation">(</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">)</span>
    @<span class="token constant">GET</span>
    @<span class="token function">Produces</span><span class="token punctuation">(</span>MediaType<span class="token punctuation">.</span><span class="token constant">APPLICATION_JSON</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> Response <span class="token function">getStudent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        List<span class="token operator">&lt;</span>Student<span class="token operator">&gt;</span> lists <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token operator">&lt;</span>Student<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        lists<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;mayun&quot;</span><span class="token punctuation">,</span><span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        lists<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;mahuateng&quot;</span><span class="token punctuation">,</span><span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        lists<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;zhouhongyi&quot;</span><span class="token punctuation">,</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        JSONObject json <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> Response<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span>Response<span class="token punctuation">.</span>Status<span class="token punctuation">.</span><span class="token constant">OK</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entity</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span>lists<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的地方新建Student类。代码如下。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">package</span> com<span class="token punctuation">.</span>detectivehlh<span class="token punctuation">.</span>test<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> String id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> String name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> int age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token parameter">String id<span class="token punctuation">,</span> String name<span class="token punctuation">,</span> int age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> String <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token parameter">String id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> String <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token parameter">String name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="引入fastjson" tabindex="-1"><a class="header-anchor" href="#引入fastjson" aria-hidden="true">#</a> 引入fastjson</h2><p>这个时候可以看到，Hello的class中有报错。是因为没有在pom.xml中没有引入对fastjson的依赖。在根目录下的pom.xml中添加如下依赖。</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>fastjson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.2.21<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再回到Hello中就可以看到没有错误信息了。</p><h2 id="配置tomcat" tabindex="-1"><a class="header-anchor" href="#配置tomcat" aria-hidden="true">#</a> 配置Tomcat</h2><p>选择顶部菜单栏中的Run-&gt;Edit Configurations。点击左侧的+，选择Tomcat Server-&gt;local。配置好Tomcat后，选择Server旁边的Deployment标签，点击下方的+，选择Artifact，选择testDemo:war exploded。点击Apply。然后点击右上角的长得像播放键的按钮，启动项目。<br> 就可以看到会新建一个浏览器标签页。显示&quot;Hello World!&quot;，然后改变浏览器中的路由为我们写的接口的路由，/api/hello/get。就可以看到返回的json数据了。</p>`,26),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","230836.html.vue"]]);export{r as default};
