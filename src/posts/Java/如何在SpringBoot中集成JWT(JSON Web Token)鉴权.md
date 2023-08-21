---
date: 2019-03-18
permalink: /posts/230841.html
category:
- Java
tag:
- Spring Boot
- JWT
---

# 如何在SpringBoot中集成JWT(JSON Web Token)鉴权


这篇博客主要是简单介绍了一下什么是JWT，以及如何在Spring Boot项目中使用JWT(JSON Web Token)。

## 关于JWT

### 什么是JWT
老生常谈的开头，我们要用这样一种工具，首先得知道以下几个问题。
- 这个工具是什么，这个工具解决了什么问题
- 是否适用于当前我们所处得业务场景
- 用了之后是否会带来任何其他问题
- 怎么用才是最佳实践

那什么是JWT呢？以下是我对[jwt官网](https://jwt.io/introduction/)上对JWT介绍的翻译。

> JSON Web Token （JWT）是一种定义了一种紧凑并且独立的，用于在各方之间使用JSON对象安全的传输信息的一个开放标准（RFC 7519）。

现在我们知道，JWT其实是一种开放标准，用于在多点之间安全地传输用JSON表示的数据。在传输的过程中，JWT以字符串的形式出现在我们的视野中。该字符串中的信息可以通过数字签名进行验证和信任。

### 应用场景
JWT在实际的开发中，有哪些应用场景呢？

#### 授权
这应该算是JWT最常见的使用场景。在前端界面中，一旦用户登录成功，会接收到后端返回的JWT。后续的请求都会包含后端返回的JWT，作为对后端路由、服务以及资源的访问的凭证。

#### 信息交换
利用JWT在多方之间相互传递信息具有一定的安全性，例如JWT可以用HMAC、RSA非对称加密算法以及ECDSA数字签名算法对JWT进行签名，可以确保消息的发送者是真的发送者，而且使用header和payload进行的签名计算，我们还可以验证发送的消息是否被篡改了。

## JWT的结构
通俗来讲JWT由`header.payload.signature`三部分组成的字符串，网上有太多帖子介绍这一块了，所以在这里就简单介绍一下就好了。

### header
`header`由使用的签名算法和令牌的类型的组成，例如令牌的类型就是JWT这种开放标准，而使用的签名算法就是`HS256`，也就是`HmacSHA256`算法。其他的加密算法还有`HmacSHA512`、`SHA512withECDSA`等等。

然后将这个包含两个属性的JSON对象转化为字符串然后使用Base64编码，最终形成了JWT的header。

### payload
`payload`说直白一些就类似你的requestBody中的数据。只不过是分了三种类型，预先申明好的、自定义的以及私有的。像`iss`发件人，`exp`过期时间都是预先注册好的申明。

预先申明在载荷中的数据不是强制性的使用，但是官方建议使用。然后这串类似于requestBody的JSON经过Base64编码形成了JWT的第二部分。

### signature
如果要生成`signature`，就需要使用jwt自定义配置项中的secret，也就是Hmac算法加密所需要的密钥。将之前经过Base64编码的header和payload用`.`相连，再使用自定义的密钥，对该消息进行签名，最终生成了签名。

生成的签名用于验证消息在传输的过程中没有被更改。在使用非对称加密算法进行签名的时候，还可以用于验证JWT的发件人是否与payload中申明的发件人是同一个人。


## JWT在Spring项目中的应用场景

### 生成JWT
代码如下。
```Java
public String createJwt(String userId, String projectId) throws IllegalArgumentException, UnsupportedEncodingException {
    Algorithm al = Algorithm.HMAC256(secret);
    Instant instant = LocalDateTime.now().plusHours(outHours).atZone(ZoneId.systemDefault()).toInstant();
    Date expire = Date.from(instant);
    String token = JWT.create()
            .withIssuer(issuer)
            .withSubject("userInfo")
            .withClaim("user_id", userId)
            .withClaim("project_id", projectId)
            .withExpiresAt(expire)
            .sign(al);
    return token;
}
```
传入的两个Claim是项目里自定义的payload，`al`是选择的算法，而`secret`就是对信息签名的密钥，`subject`则是该token的主题，`withExpiresAt`标识了该token的过期时间。

### 返回JWT
在用户登录系统成功之后，将token作为返回参数，返回给前端。

### 验证token
在token返回给前端之后，后端要做的就是验证这个token是否是合法的，是否可以访问服务器的资源。主要可以通过以下几种方式去验证。

#### 解析token
使用`JWTVerifier`解析token，这是验证token是否合法的第一步，例如前端传过来的token是一串没有任何意义的字符串，在这一步就可以抛出错误。示例代码如下。
```Java
try {
    Algorithm algorithm = Algorithm.HMAC256(secret);
    JWTVerifier verifier = JWT.require(algorithm).build();
    DecodedJWT jwt = verifier.verify(token);
} catch (JWTVerificationException e) {
    e.printStackTrace();
}
```
JWTVerifier可以使用用制定secret签名的算法，指定的claim来验证token的合法性。

#### 判断token时效性
判断了token是有效的之后，再对token的时效性进行验证。
```Java
try {
    Algorithm algorithm = Algorithm.HMAC256(secret);
    JWTVerifier verifier = JWT.require(algorithm).build();
    DecodedJWT jwt = verifier.verify(token);
    if (jwt.getExpiresAt().before(new Date())) {
        System.out.println("token已过期");
        return null;
    }
} catch (JWTVerificationException e) {
    e.printStackTrace();
    return null;
}
```
如果该token过期了，则不允许访问服务器资源。具体的流程如下。

![img](/images/230841/process-detail.jpeg)

#### 刷新过期时间
上面创建token的有效时间是可以配置的，假设是2个小时，并且用户登录进来连续工作了1小时59分钟，在进行一个很重要的操作的时候，点击确定，这个时候token过期了。如果程序没有保护策略，那么用户接近两个小时的工作就成为了无用功。

遇到这样的问题，我们之前的流程设计必然面对一次重构。可能大家会有疑问，不就是在用户登录之后，每次操作对去刷新一次token的过期时间吗？

那么问题来了，我们知道token是由`header.payload.signature`三段内容组成的，而过期时间则是属于payload，如果改变了过期的时间，那么最终生成的payload的hash则势必与上一次生成的不同。

换句话说，这是一个全新的token。前端要怎么接收这个全新的token呢？可想到的解决方案无非就是每次请求，根据response header中的返回不断的刷新的token。但是这样的方式侵入了前端开发的业务层。使其每一个接口都需要去刷新token。

大家可能会说，无非就是加一个拦截器嘛，对业务侵入不大啊。即使这部分逻辑是写在拦截器里的，但是前端因为token鉴权的逻辑而多出了这部分代码。而这部分代码从职能分工上来说，其实是后端的逻辑。

说的直白一些，刷新token，对token的时效性进行管理，应该是由后端来做。前端不需要也不应该去关心这一部分的逻辑。

#### redis大法好
综上所述，刷新token的过期时间势必要放到后端，并且不能通过判断JWT中payload中的expire来判断token是否有效。

所以，在用户登录成功之后并将token返回给前端的同时，需要以某一个唯一表示为key，当前的token为value，写入Redis缓存中。并且在每次用户请求成功后，刷新token的过期时间，流程如下所示。

![img](/images/230841/use-redis.jpeg)

经过这样的重构之后，流程就变成了这样。

![img](/images/230841/parse-token.jpeg)

在流程中多了一个刷新token的流程。只要用户登录了系统，每一次的操作都会刷新token的过期时间，就不会出现之前说的在进行某个操作时突然失效所造成数据丢失的情况。

在用户登录之后的两个小时内，如果用户没有进行任何操作，那么2小时后再次请求接口就会直接被服务器拒绝访问。

## 总结
总的来说，JWT中是不建议放特别敏感信息的。如果没有用非对称加密算法的话，把token复制之后直接可以去jwt官网在线解析。如果请求被拦截到了，里面的所有信息等于是透明的。

但是JWT可以用来当作一段时间内运行访问服务器资源的凭证。例如JWT的payload中带有userId这个字段，那么就可以对该token标识的用户的合法性进行验证。例如，该用户当前状态是否被锁定？该userId所标识的用户是否存在于我们的系统？等等。

并且通过实现token的公用，可以实现用户的多端同时登录。像之前的登录之后创建token，就限定了用户只能同时在一台设备上登录。




## 参考
> - [JWT官网](https://jwt.io)








