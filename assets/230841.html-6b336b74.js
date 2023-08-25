import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c as s,a as e,b as a,d as n,f as r}from"./app-52a8f7f8.js";const c="/images/230841/process-detail.jpeg",l="/images/230841/use-redis.jpeg",h="/images/230841/parse-token.jpeg",p={},u=r('<h1 id="如何在springboot中集成jwt-json-web-token-鉴权" tabindex="-1"><a class="header-anchor" href="#如何在springboot中集成jwt-json-web-token-鉴权" aria-hidden="true">#</a> 如何在SpringBoot中集成JWT(JSON Web Token)鉴权</h1><p>这篇博客主要是简单介绍了一下什么是JWT，以及如何在Spring Boot项目中使用JWT(JSON Web Token)。</p><h2 id="关于jwt" tabindex="-1"><a class="header-anchor" href="#关于jwt" aria-hidden="true">#</a> 关于JWT</h2><h3 id="什么是jwt" tabindex="-1"><a class="header-anchor" href="#什么是jwt" aria-hidden="true">#</a> 什么是JWT</h3><p>老生常谈的开头，我们要用这样一种工具，首先得知道以下几个问题。</p><ul><li>这个工具是什么，这个工具解决了什么问题</li><li>是否适用于当前我们所处得业务场景</li><li>用了之后是否会带来任何其他问题</li><li>怎么用才是最佳实践</li></ul>',6),v={href:"https://jwt.io/introduction/",target:"_blank",rel:"noopener noreferrer"},m=r(`<blockquote><p>JSON Web Token （JWT）是一种定义了一种紧凑并且独立的，用于在各方之间使用JSON对象安全的传输信息的一个开放标准（RFC 7519）。</p></blockquote><p>现在我们知道，JWT其实是一种开放标准，用于在多点之间安全地传输用JSON表示的数据。在传输的过程中，JWT以字符串的形式出现在我们的视野中。该字符串中的信息可以通过数字签名进行验证和信任。</p><h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h3><p>JWT在实际的开发中，有哪些应用场景呢？</p><h4 id="授权" tabindex="-1"><a class="header-anchor" href="#授权" aria-hidden="true">#</a> 授权</h4><p>这应该算是JWT最常见的使用场景。在前端界面中，一旦用户登录成功，会接收到后端返回的JWT。后续的请求都会包含后端返回的JWT，作为对后端路由、服务以及资源的访问的凭证。</p><h4 id="信息交换" tabindex="-1"><a class="header-anchor" href="#信息交换" aria-hidden="true">#</a> 信息交换</h4><p>利用JWT在多方之间相互传递信息具有一定的安全性，例如JWT可以用HMAC、RSA非对称加密算法以及ECDSA数字签名算法对JWT进行签名，可以确保消息的发送者是真的发送者，而且使用header和payload进行的签名计算，我们还可以验证发送的消息是否被篡改了。</p><h2 id="jwt的结构" tabindex="-1"><a class="header-anchor" href="#jwt的结构" aria-hidden="true">#</a> JWT的结构</h2><p>通俗来讲JWT由<code>header.payload.signature</code>三部分组成的字符串，网上有太多帖子介绍这一块了，所以在这里就简单介绍一下就好了。</p><h3 id="header" tabindex="-1"><a class="header-anchor" href="#header" aria-hidden="true">#</a> header</h3><p><code>header</code>由使用的签名算法和令牌的类型的组成，例如令牌的类型就是JWT这种开放标准，而使用的签名算法就是<code>HS256</code>，也就是<code>HmacSHA256</code>算法。其他的加密算法还有<code>HmacSHA512</code>、<code>SHA512withECDSA</code>等等。</p><p>然后将这个包含两个属性的JSON对象转化为字符串然后使用Base64编码，最终形成了JWT的header。</p><h3 id="payload" tabindex="-1"><a class="header-anchor" href="#payload" aria-hidden="true">#</a> payload</h3><p><code>payload</code>说直白一些就类似你的requestBody中的数据。只不过是分了三种类型，预先申明好的、自定义的以及私有的。像<code>iss</code>发件人，<code>exp</code>过期时间都是预先注册好的申明。</p><p>预先申明在载荷中的数据不是强制性的使用，但是官方建议使用。然后这串类似于requestBody的JSON经过Base64编码形成了JWT的第二部分。</p><h3 id="signature" tabindex="-1"><a class="header-anchor" href="#signature" aria-hidden="true">#</a> signature</h3><p>如果要生成<code>signature</code>，就需要使用jwt自定义配置项中的secret，也就是Hmac算法加密所需要的密钥。将之前经过Base64编码的header和payload用<code>.</code>相连，再使用自定义的密钥，对该消息进行签名，最终生成了签名。</p><p>生成的签名用于验证消息在传输的过程中没有被更改。在使用非对称加密算法进行签名的时候，还可以用于验证JWT的发件人是否与payload中申明的发件人是同一个人。</p><h2 id="jwt在spring项目中的应用场景" tabindex="-1"><a class="header-anchor" href="#jwt在spring项目中的应用场景" aria-hidden="true">#</a> JWT在Spring项目中的应用场景</h2><h3 id="生成jwt" tabindex="-1"><a class="header-anchor" href="#生成jwt" aria-hidden="true">#</a> 生成JWT</h3><p>代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>public String createJwt(String userId, String projectId) throws IllegalArgumentException, UnsupportedEncodingException {
    Algorithm al = Algorithm.HMAC256(secret);
    Instant instant = LocalDateTime.now().plusHours(outHours).atZone(ZoneId.systemDefault()).toInstant();
    Date expire = Date.from(instant);
    String token = JWT.create()
            .withIssuer(issuer)
            .withSubject(&quot;userInfo&quot;)
            .withClaim(&quot;user_id&quot;, userId)
            .withClaim(&quot;project_id&quot;, projectId)
            .withExpiresAt(expire)
            .sign(al);
    return token;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传入的两个Claim是项目里自定义的payload，<code>al</code>是选择的算法，而<code>secret</code>就是对信息签名的密钥，<code>subject</code>则是该token的主题，<code>withExpiresAt</code>标识了该token的过期时间。</p><h3 id="返回jwt" tabindex="-1"><a class="header-anchor" href="#返回jwt" aria-hidden="true">#</a> 返回JWT</h3><p>在用户登录系统成功之后，将token作为返回参数，返回给前端。</p><h3 id="验证token" tabindex="-1"><a class="header-anchor" href="#验证token" aria-hidden="true">#</a> 验证token</h3><p>在token返回给前端之后，后端要做的就是验证这个token是否是合法的，是否可以访问服务器的资源。主要可以通过以下几种方式去验证。</p><h4 id="解析token" tabindex="-1"><a class="header-anchor" href="#解析token" aria-hidden="true">#</a> 解析token</h4><p>使用<code>JWTVerifier</code>解析token，这是验证token是否合法的第一步，例如前端传过来的token是一串没有任何意义的字符串，在这一步就可以抛出错误。示例代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>try {
    Algorithm algorithm = Algorithm.HMAC256(secret);
    JWTVerifier verifier = JWT.require(algorithm).build();
    DecodedJWT jwt = verifier.verify(token);
} catch (JWTVerificationException e) {
    e.printStackTrace();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JWTVerifier可以使用用制定secret签名的算法，指定的claim来验证token的合法性。</p><h4 id="判断token时效性" tabindex="-1"><a class="header-anchor" href="#判断token时效性" aria-hidden="true">#</a> 判断token时效性</h4><p>判断了token是有效的之后，再对token的时效性进行验证。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>try {
    Algorithm algorithm = Algorithm.HMAC256(secret);
    JWTVerifier verifier = JWT.require(algorithm).build();
    DecodedJWT jwt = verifier.verify(token);
    if (jwt.getExpiresAt().before(new Date())) {
        System.out.println(&quot;token已过期&quot;);
        return null;
    }
} catch (JWTVerificationException e) {
    e.printStackTrace();
    return null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果该token过期了，则不允许访问服务器资源。具体的流程如下。</p><figure><img src="`+c+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="刷新过期时间" tabindex="-1"><a class="header-anchor" href="#刷新过期时间" aria-hidden="true">#</a> 刷新过期时间</h4><p>上面创建token的有效时间是可以配置的，假设是2个小时，并且用户登录进来连续工作了1小时59分钟，在进行一个很重要的操作的时候，点击确定，这个时候token过期了。如果程序没有保护策略，那么用户接近两个小时的工作就成为了无用功。</p><p>遇到这样的问题，我们之前的流程设计必然面对一次重构。可能大家会有疑问，不就是在用户登录之后，每次操作对去刷新一次token的过期时间吗？</p><p>那么问题来了，我们知道token是由<code>header.payload.signature</code>三段内容组成的，而过期时间则是属于payload，如果改变了过期的时间，那么最终生成的payload的hash则势必与上一次生成的不同。</p><p>换句话说，这是一个全新的token。前端要怎么接收这个全新的token呢？可想到的解决方案无非就是每次请求，根据response header中的返回不断的刷新的token。但是这样的方式侵入了前端开发的业务层。使其每一个接口都需要去刷新token。</p><p>大家可能会说，无非就是加一个拦截器嘛，对业务侵入不大啊。即使这部分逻辑是写在拦截器里的，但是前端因为token鉴权的逻辑而多出了这部分代码。而这部分代码从职能分工上来说，其实是后端的逻辑。</p><p>说的直白一些，刷新token，对token的时效性进行管理，应该是由后端来做。前端不需要也不应该去关心这一部分的逻辑。</p><h4 id="redis大法好" tabindex="-1"><a class="header-anchor" href="#redis大法好" aria-hidden="true">#</a> redis大法好</h4><p>综上所述，刷新token的过期时间势必要放到后端，并且不能通过判断JWT中payload中的expire来判断token是否有效。</p><p>所以，在用户登录成功之后并将token返回给前端的同时，需要以某一个唯一表示为key，当前的token为value，写入Redis缓存中。并且在每次用户请求成功后，刷新token的过期时间，流程如下所示。</p><figure><img src="'+l+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>经过这样的重构之后，流程就变成了这样。</p><figure><img src="'+h+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在流程中多了一个刷新token的流程。只要用户登录了系统，每一次的操作都会刷新token的过期时间，就不会出现之前说的在进行某个操作时突然失效所造成数据丢失的情况。</p><p>在用户登录之后的两个小时内，如果用户没有进行任何操作，那么2小时后再次请求接口就会直接被服务器拒绝访问。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>总的来说，JWT中是不建议放特别敏感信息的。如果没有用非对称加密算法的话，把token复制之后直接可以去jwt官网在线解析。如果请求被拦截到了，里面的所有信息等于是透明的。</p><p>但是JWT可以用来当作一段时间内运行访问服务器资源的凭证。例如JWT的payload中带有userId这个字段，那么就可以对该token标识的用户的合法性进行验证。例如，该用户当前状态是否被锁定？该userId所标识的用户是否存在于我们的系统？等等。</p><p>并且通过实现token的公用，可以实现用户的多端同时登录。像之前的登录之后创建token，就限定了用户只能同时在一台设备上登录。</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>',57),b={href:"https://jwt.io",target:"_blank",rel:"noopener noreferrer"};function g(k,f){const i=t("ExternalLinkIcon");return o(),s("div",null,[u,e("p",null,[a("那什么是JWT呢？以下是我对"),e("a",v,[a("jwt官网"),n(i)]),a("上对JWT介绍的翻译。")]),m,e("blockquote",null,[e("ul",null,[e("li",null,[e("a",b,[a("JWT官网"),n(i)])])])])])}const W=d(p,[["render",g],["__file","230841.html.vue"]]);export{W as default};
