import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as t,c as r,a as e,b as n,d as s,f as i}from"./app-52a8f7f8.js";const c="/images/230839/request-process.jpeg",u={},v=i('<h1 id="手把手教你如何优雅的使用aop记录带参数的复杂web接口日志" tabindex="-1"><a class="header-anchor" href="#手把手教你如何优雅的使用aop记录带参数的复杂web接口日志" aria-hidden="true">#</a> 手把手教你如何优雅的使用Aop记录带参数的复杂Web接口日志</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>不久前，因为需求的原因，需要实现一个操作日志。几乎每一个接口被调用后，都要记录一条跟这个参数挂钩的特定的日志到数据库。举个例子，就比如禁言操作，日志中需要记录因为什么禁言，被禁言的人的id和各种信息。方便后期查询。</p><p>这样的接口有很多个，而且大部分接口的参数都不一样。可能大家很容易想到的一个思路就是，实现一个日志记录的工具类，然后在需要记录日志的接口中，添加一行代码。由这个日志工具类去判断此时应该处理哪些参数。</p><p>但是这样有很大的问题。如果需要记日志的接口数量非常多，先不讨论这个工具类中需要做多少的类型判断，仅仅是给所有接口添加这样一行代码在我个人看来都是不能接受的行为。首先，这样对代码的侵入性太大。其次，后期万一有改动，维护的人将会十分难受。想象一下，全局搜索相同的代码，再一一进行修改。</p><p>所以我放弃了这个略显原始的方法。我最终采用了Aop的方式，采取拦截的请求的方式，来记录日志。但是即使采用这个方法，仍然面临一个问题，那就是如何处理大量的参数。以及如何对应到每一个接口上。</p><p>我最终没有拦截所有的controller，而是自定义了一个日志注解。所有打上了这个注解的方法，将会记录日志。同时，注解中会带有类型，来为当前的接口指定特定的日志内容以及参数。</p><p>那么如何从众多可能的参数中，为当前的日志指定对应的参数呢。我的解决方案是维护一个参数类，里面列举了所有需要记录在日志中的参数名。然后在拦截请求时，通过反射，获取到该请求的request和response中的所有参数和值，如果该参数存在于我维护的param类中，则将对应的值赋值进去。</p><p>然后在请求结束后，将模板中的所有预留的参数全部用赋了值的参数替换掉。这样一来，在不大量的侵入业务的前提下，满足了需求，同时也保证了代码的可维护性。</p><p>下面我将会把详细的实现过程列举出来。</p><h2 id="开始操作前" tabindex="-1"><a class="header-anchor" href="#开始操作前" aria-hidden="true">#</a> 开始操作前</h2><p>文章结尾我会给出这个demo项目的所有源码。所以不想看过程的兄台可移步到末尾，直接看源码。（听说和源码搭配，看文章更美味...）</p><h2 id="开始操作" tabindex="-1"><a class="header-anchor" href="#开始操作" aria-hidden="true">#</a> 开始操作</h2><h3 id="新建项目" tabindex="-1"><a class="header-anchor" href="#新建项目" aria-hidden="true">#</a> 新建项目</h3>',14),o={href:"https://detectivehlh.github.io./java/newSprintBootStarter/",target:"_blank",rel:"noopener noreferrer"},p=i(`<div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.1.1.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.aspectj/aspectjrt --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.aspectj<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>aspectjrt<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.9.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.aspectj<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>aspectjweaver<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.9.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.18.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>cn.hutool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>hutool-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>4.1.14<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="新建aop类" tabindex="-1"><a class="header-anchor" href="#新建aop类" aria-hidden="true">#</a> 新建Aop类</h3><p>新建<code>LogAspect</code>类。代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package spring.aop.log.demo.api.util;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

/**
 * LogAspect
 *
 * @author Lunhao Hu
 * @date 2019-01-30 16:21
 **/
@Aspect
@Component
public class LogAspect {
    /**
     * 定义切入点
     */
    @Pointcut(&quot;@annotation(spring.aop.log.demo.api.util.Log)&quot;)
    public void operationLog() {
    }
    
    /**
     * 新增结果返回后触发
     *
     * @param point
     * @param returnValue
     */
    @AfterReturning(returning = &quot;returnValue&quot;, pointcut = &quot;operationLog() &amp;&amp; @annotation(log)&quot;)
    public void doAfterReturning(JoinPoint point, Object returnValue, Log log) {
        System.out.println(&quot;test&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Pointcut</code>中传入了一个注解，表示凡是打上了这个注解的方法，都会触发由<code>Pointcut</code>修饰的<code>operationLog</code>函数。而<code>AfterReturning</code>则是在请求返回之后触发。</p><h3 id="自定义注解" tabindex="-1"><a class="header-anchor" href="#自定义注解" aria-hidden="true">#</a> 自定义注解</h3><p>上一步提到了自定义注解，这个自定义注解将打在controller的每个方法上。新建一个<code>annotation</code>的类。代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package spring.aop.log.demo.api.util;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Log
 *
 * @author Lunhao Hu
 * @date 2019-01-30 16:19
 **/
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
    String type() default &quot;&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Target</code>和<code>Retention</code>都属于元注解。共有4种，分别是<code>@Retention</code>、<code>@Target</code>、<code>@Document</code>、<code>@Inherited</code>。</p><p><code>Target</code>注解说明了该Annotation所修饰的范围。可以传入很多类型，参数为<code>ElementType</code>。例如<code>TYPE</code>，用于描述类、接口或者枚举类；<code>FIELD</code>用于描述属性；<code>METHOD</code>用于描述方法；<code>PARAMETER</code>用于描述参数；<code>CONSTRUCTOR</code>用于描述构造函数；<code>LOCAL_VARIABLE</code>用于描述局部变量；<code>ANNOTATION_TYPE</code>用于描述注解；<code>PACKAGE</code>用于描述包等。</p><p><code>Retention</code>注解定义了该Annotation被保留的时间长短。参数为<code>RetentionPolicy</code>。例如<code>SOURCE</code>表示只在源码中存在，不会在编译后的class文件存在；<code>CLASS</code>是该注解的默认选项。 即存在于源码，也存在于编译后的class文件，但不会被加载到虚拟机中去；<code>RUNTIME</code>存在于源码、class文件以及虚拟机中，通俗一点讲就是可以在运行的时候通过反射获取到。</p><h3 id="加上普通注解" tabindex="-1"><a class="header-anchor" href="#加上普通注解" aria-hidden="true">#</a> 加上普通注解</h3><p>给需要记录日志的接口加上<code>Log</code>注解。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package spring.aop.log.demo.api.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import spring.aop.log.demo.api.util.Log;

/**
 * HelloController
 *
 * @author Lunhao Hu
 * @date 2019-01-30 15:52
 **/
@RestController
public class HelloController {
    @Log
    @GetMapping(&quot;test/{id}&quot;)
    public String test(@PathVariable(name = &quot;id&quot;) Integer id) {
        return &quot;Hello&quot; + id;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加上之后，每一次调用<code>test/{id}</code>这个接口，都会触发拦截器中的<code>doAfterReturning</code>方法中的代码。</p><h3 id="加上带类型注解" tabindex="-1"><a class="header-anchor" href="#加上带类型注解" aria-hidden="true">#</a> 加上带类型注解</h3><p>上面介绍了记录普通日志的方法，接下来要介绍记录特定日志的方法。什么特定日志呢，就是每个接口要记录的信息不同。为了实现这个，我们需要实现一个操作类型的枚举类。代码如下。</p><h4 id="操作类型模板枚举" tabindex="-1"><a class="header-anchor" href="#操作类型模板枚举" aria-hidden="true">#</a> 操作类型模板枚举</h4><p>新建一个枚举类<code>Type</code>。代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package spring.aop.log.demo.api.util;

/**
 * Type
 *
 * @author Lunhao Hu
 * @date 2019-01-30 17:12
 **/
public enum Type {
    /**
     * 操作类型
     */
    WARNING(&quot;警告&quot;, &quot;因被其他玩家举报，警告玩家&quot;);

    /**
     * 类型
     */
    private String type;

    /**
     * 执行操作
     */
    private String operation;

    Type(String type, String operation) {
        this.type = type;
        this.operation = operation;
    }

    public String getType() { return type; }

    public String getOperation() { return operation; }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="给注解加上类型" tabindex="-1"><a class="header-anchor" href="#给注解加上类型" aria-hidden="true">#</a> 给注解加上类型</h4><p>给上面的controller中的注解加上type。代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package spring.aop.log.demo.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import spring.aop.log.demo.api.util.Log;

/**
 * HelloController
 *
 * @author Lunhao Hu
 * @date 2019-01-30 15:52
 **/
@RestController
public class HelloController {
    @Log(type = &quot;WARNING&quot;)
    @GetMapping(&quot;test/{id}&quot;)
    public String test(@PathVariable(name = &quot;id&quot;) Integer id) {
        return &quot;Hello&quot; + id;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改aop类" tabindex="-1"><a class="header-anchor" href="#修改aop类" aria-hidden="true">#</a> 修改aop类</h4><p>将aop类中的<code>doAfterReturning</code>为如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@AfterReturning(returning = &quot;returnValue&quot;, pointcut = &quot;operationLog() &amp;&amp; @annotation(log)&quot;)
public void doAfterReturning(JoinPoint point, Object returnValue, Log log) {
    // 注解中的类型
    String enumKey = log.type();
    System.out.println(Type.valueOf(enumKey).getOperation());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加上之后，每一次调用加了<code>@Log(type = &quot;WARNING&quot;)</code>这个注解的接口，都会打印这个接口所指定的日志。例如上述代码就会打印出如下代码。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>因被其他玩家举报，警告玩家
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="获取aop拦截的请求参数" tabindex="-1"><a class="header-anchor" href="#获取aop拦截的请求参数" aria-hidden="true">#</a> 获取aop拦截的请求参数</h4><p>为每个接口指定一个日志并不困难，只需要为每个接口指定一个类型即可。但是大家应该也注意到了，一个接口日志，只记录<code>因被其他玩家举报，警告玩家</code>这样的信息没有任何意义。</p><p>记录日志的人倒不觉得，而最后去查看日志的人就要吾日三省吾身了，被谁举报了？因为什么举报了？我警告的谁？</p><p>这样的日志做了太多的无用功，根本没有办法在出现问题之后溯源。所以我们下一步的操作就是给每个接口加上特定的参数。那么大家可能会有问题，如果每个接口的参数几乎都不一样，那这个工具类岂不是要传入很多参数，要怎么实现呢，甚至还要组织参数，这样会大量的侵入业务代码，并且会大量的增加冗余代码。</p><p>大家可能会想到，实现一个记录日志的方法，在要记日志的接口中调用，把参数传进去。如果类型很多的话，参数也会随之增多，每个接口的参数都不一样。处理起来十分麻烦，而且对业务的侵入性太高。几乎每个地方都要嵌入日志相关代码。一旦涉及到修改，将会变得十分难维护。</p><p>所以我直接利用反射获取aop拦截到的请求中的所有参数，如果我的参数类（所有要记录的参数）里面有请求中的参数，那么我就将参数的值写入参数类中。最后将日志模版中参数预留字段替换成请求中的参数。</p><p>流程图如下所示。</p><figure><img src="`+c+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="新建参数类" tabindex="-1"><a class="header-anchor" href="#新建参数类" aria-hidden="true">#</a> 新建参数类</h4><p>新建一个类<code>Param</code>，其中包含所有在操作日志中，可能会出现的参数。为什么要这么做？因为每个接口需要的参数都有可能完全不一样，与其去维护大量的判断逻辑，还不如<code>贪心</code>一点，直接传入所有的可能参数。当然后期如果有新的参数需要记录，则需要修改代码。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package spring.aop.log.demo.api.util;

import lombok.Data;

/**
 * Param
 *
 * @author Lunhao Hu
 * @date 2019-01-30 17:14
 **/
@Data
public class Param {
    /**
     * 所有可能参数
     */
    private String id;
    private String workOrderNumber;
    private String userId;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改模板" tabindex="-1"><a class="header-anchor" href="#修改模板" aria-hidden="true">#</a> 修改模板</h4><p>将模板枚举类中的<code>WARNING</code>修改为如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>WARNING(&quot;警告&quot;, &quot;因 工单号 [(%workOrderNumber)] /举报 ID [(%id)] 警告玩家 [(%userId)]&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中的参数，就是要在aop拦截阶段获取并且替换掉的参数。</p><h4 id="修改controller" tabindex="-1"><a class="header-anchor" href="#修改controller" aria-hidden="true">#</a> 修改controller</h4><p>我们给之前的controller加上上述模板中国呢的参数。部分代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@Log(type = &quot;WARNING&quot;)
@GetMapping(&quot;test/{id}&quot;)
public String test(
        @PathVariable(name = &quot;id&quot;) Integer id,
        @RequestParam(name = &quot;workOrderNumber&quot;) String workOrderNumber,
        @RequestParam(name = &quot;userId&quot;) String userId,
        @RequestParam(name = &quot;name&quot;) String name
) {
    return &quot;Hello&quot; + id;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过反射获取请求的参数" tabindex="-1"><a class="header-anchor" href="#通过反射获取请求的参数" aria-hidden="true">#</a> 通过反射获取请求的参数</h3><p>在此处分两种情况，一种是简单参数类型，另外一种是复杂参数类型，也就是参数中带了请求DTO的情况。</p><h3 id="获取简单参数类型" tabindex="-1"><a class="header-anchor" href="#获取简单参数类型" aria-hidden="true">#</a> 获取简单参数类型</h3><p>给aop类添加几个私有变量。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 请求中的所有参数
 */
private Object[] args;

/**
 * 请求中的所有参数名
 */
private String[] paramNames;

/**
 * 参数类
 */
private Param params;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后将<code>doAfterReturning</code>中的代码改成如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>try {
    // 获取请求详情
    ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
    HttpServletRequest request = attributes.getRequest();
    HttpServletResponse response = attributes.getResponse();
    // 获取所有请求参数
    Signature signature = point.getSignature();
    MethodSignature methodSignature = (MethodSignature) signature;
    this.paramNames = methodSignature.getParameterNames();
    this.args = point.getArgs();

    // 实例化参数类
    this.params = new Param();
    // 注解中的类型
    String enumKey = log.type();
    String logDetail = Type.valueOf(enumKey).getOperation();

    // 从请求传入参数中获取数据
    this.getRequestParam();
} catch (Exception e) {
    System.out.println(e.getMessage());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先要做的就是拦截打上了自定义注解的请求。我们可以获取到请求的详情，以及请求中的所有的参数名，以及参数。下面我们就来实现上述代码中的<code>getRequestParam</code>方法。</p><h4 id="getrequestparam" tabindex="-1"><a class="header-anchor" href="#getrequestparam" aria-hidden="true">#</a> getRequestParam</h4><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 获取拦截的请求中的参数
 * @param point
 */
private void getRequestParam() {
    // 获取简单参数类型
    this.getSimpleParam();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="getsimpleparam" tabindex="-1"><a class="header-anchor" href="#getsimpleparam" aria-hidden="true">#</a> getSimpleParam</h4><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 获取简单参数类型的值
 */
private void getSimpleParam() {
    // 遍历请求中的参数名
    for (String reqParam : this.paramNames) {
        // 判断该参数在参数类中是否存在
        if (this.isExist(reqParam)) {
            this.setRequestParamValueIntoParam(reqParam);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中，遍历请求所传入的参数名，然后我们实现<code>isExist</code>方法， 来判断这个参数在我们的<code>Param</code>类中是否存在，如果存在我们就再调用<code>setRequestParamValueIntoParam</code>方法，将这个参数名所对应的参数值写入到<code>Param</code>类的实例中。</p><h4 id="isexist" tabindex="-1"><a class="header-anchor" href="#isexist" aria-hidden="true">#</a> isExist</h4><p><code>isExist</code>的代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 判断该参数在参数类中是否存在（是否是需要记录的参数）
 * @param targetClass
 * @param name
 * @param &lt;T&gt;
 * @return
 */
private &lt;T&gt; Boolean isExist(String name) {
    boolean exist = true;
    try {
        String key = this.setFirstLetterUpperCase(name);
        Method targetClassGetMethod = this.params.getClass().getMethod(&quot;get&quot; + key);
    } catch (NoSuchMethodException e) {
        exist = false;
    }
    return exist;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面我们也提到过，在编译的时候会加上getter和setter，所以参数名的首字母都会变成大写，所以我们需要自己实现一个<code>setFirstLetterUpperCase</code>方法，来将我们传入的参数名的首字母变成大写。</p><h4 id="setfirstletteruppercase" tabindex="-1"><a class="header-anchor" href="#setfirstletteruppercase" aria-hidden="true">#</a> setFirstLetterUpperCase</h4><p>代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 将字符串的首字母大写
 *
 * @param str
 * @return
 */
private String setFirstLetterUpperCase(String str) {
    if (str == null) {
        return null;
    }
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="setrequestparamvalueintoparam" tabindex="-1"><a class="header-anchor" href="#setrequestparamvalueintoparam" aria-hidden="true">#</a> setRequestParamValueIntoParam</h4><p>代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 从参数中获取
 * @param paramName
 * @return
 */
private void setRequestParamValueIntoParam(String paramName) {
    int index = ArrayUtil.indexOf(this.paramNames, paramName);
    if (index != -1) {
        String value = String.valueOf(this.args[index]);
        this.setParam(this.params, paramName, value);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ArrayUtil</code>是<code>hutool</code>中的一个工具函数。用来判断在一个元素在数组中的下标。</p><h4 id="setparam" tabindex="-1"><a class="header-anchor" href="#setparam" aria-hidden="true">#</a> setParam</h4><p>代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 将数据写入参数类的实例中
 * @param targetClass
 * @param key
 * @param value
 * @param &lt;T&gt;
 */
private &lt;T&gt; void setParam(T targetClass, String key, String value) {
    try {
        Method targetClassParamSetMethod = targetClass.getClass().getMethod(&quot;set&quot; + this.setFirstLetterUpperCase(key), String.class);
        targetClassParamSetMethod.invoke(targetClass, value);
    } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
        e.printStackTrace();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数使用反射的方法，获取该参数的set方法，将<code>Param</code>类中对应的参数设置成传入的值。</p><h4 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h4><p>启动项目，并且请求controller中的方法。并且传入定义好的参数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://localhost:8080/test/8?workOrderNumber=3231732&amp;userId=748327843&amp;name=testName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该<code>GET</code>请求总共传入了4个参数，分别是<code>id</code>,<code>workOrderNumber</code>,<code>userId</code>, <code>name</code>。大家可以看到，在<code>Param</code>类中并没有定义<code>name</code>这个字段。这是特意加了一个不需要记录的参数，来验证我们接口的健壮性的。</p><p>运行之后，可以看到控制台打印的信息如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Param<span class="token punctuation">(</span>id<span class="token operator">=</span><span class="token number">8</span>, <span class="token assign-left variable">workOrderNumber</span><span class="token operator">=</span><span class="token number">3231732</span>, <span class="token assign-left variable">userId</span><span class="token operator">=</span><span class="token number">748327843</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们想让aop记录的参数全部记录到<code>Param</code>类中的实例中，而传入了意料之外的参数也没有让程序崩溃。接下里我们只需要将这些参数，将之前定义好的模板的参数预留字段替换掉即可。</p><h4 id="替换参数" tabindex="-1"><a class="header-anchor" href="#替换参数" aria-hidden="true">#</a> 替换参数</h4><p>在<code>doAfterReturning</code>中的<code>getRequestParam</code>函数后，加入以下代码。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>if (!logDetail.isEmpty()) {
    // 将模板中的参数全部替换掉
    logDetail = this.replaceParam(logDetail);
}
System.out.println(logDetail);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们实现<code>replaceParam</code>方法。</p><h4 id="replaceparam" tabindex="-1"><a class="header-anchor" href="#replaceparam" aria-hidden="true">#</a> replaceParam</h4><p>代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 将模板中的预留字段全部替换为拦截到的参数
 * @param template
 * @return
 */
private String replaceParam(String template) {
    // 将模板中的需要替换的参数转化成map
    Map&lt;String, String&gt; paramsMap = this.convertToMap(template);
    for (String key : paramsMap.keySet()) {
        template = template.replace(&quot;%&quot; + key, paramsMap.get(key)).replace(&quot;(&quot;, &quot;&quot;).replace(&quot;)&quot;, &quot;&quot;);
    }
    return template;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>convertToMap</code>方法将模板中的所有预留字段全部提取出来，当作一个Map的Key。</p><h4 id="converttomap" tabindex="-1"><a class="header-anchor" href="#converttomap" aria-hidden="true">#</a> convertToMap</h4><p>代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 将模板中的参数转换成map的key-value形式
 * @param template
 * @return
 */
private Map&lt;String, String&gt; convertToMap(String template) {
    Map&lt;String, String&gt; map = new HashMap&lt;&gt;();
    String[] arr = template.split(&quot;\\\\(&quot;);
    for (String s : arr) {
        if (s.contains(&quot;%&quot;)) {
            String key = s.substring(s.indexOf(&quot;%&quot;), s.indexOf(&quot;)&quot;)).replace(&quot;%&quot;, &quot;&quot;).replace(&quot;)&quot;, &quot;&quot;).replace(&quot;-&quot;, &quot;&quot;).replace(&quot;]&quot;, &quot;&quot;);
            String value = this.getParam(this.params, key);
            map.put(key, &quot;null&quot;.equals(value) ? &quot;(空)&quot; : value);
        }
    }
    return map;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中的<code>getParam</code>方法，类似于<code>setParam</code>，也是利用反射的方法，通过传入的Class和Key，获取对应的值。</p><h4 id="getparam" tabindex="-1"><a class="header-anchor" href="#getparam" aria-hidden="true">#</a> getParam</h4><p>代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 通过反射获取传入的类中对应key的值
 * @param targetClass
 * @param key
 * @param &lt;T&gt;
 */
private &lt;T&gt; String getParam(T targetClass, String key) {
    String value = &quot;&quot;;
    try {
        Method targetClassParamGetMethod = targetClass.getClass().getMethod(&quot;get&quot; + this.setFirstLetterUpperCase(key));
        value = String.valueOf(targetClassParamGetMethod.invoke(targetClass));
    } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
        e.printStackTrace();
    }
    return value;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="再次运行" tabindex="-1"><a class="header-anchor" href="#再次运行" aria-hidden="true">#</a> 再次运行</h4><p>再次请求上述的url，则可以看到控制台的输出如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>因 工单号 <span class="token punctuation">[</span><span class="token number">3231732</span><span class="token punctuation">]</span> /举报 ID <span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span> 警告玩家 <span class="token punctuation">[</span><span class="token number">748327843</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到，我们需要记录的所有的参数，都被正确的替换了。而不需要记录的参数，同样也没有对程序造成影响。</p><p>让我们试试传入不传入非必选参数，会是什么样。修改controller如下，把workOrderNumber改成非必须按参数。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@Log(type = &quot;WARNING&quot;)
@GetMapping(&quot;test/{id}&quot;)
public String test(
        @PathVariable(name = &quot;id&quot;) Integer id,
        @RequestParam(name = &quot;workOrderNumber&quot;, required = false) String workOrderNumber,
        @RequestParam(name = &quot;userId&quot;) String userId,
        @RequestParam(name = &quot;name&quot;) String name
) {
    return &quot;Hello&quot; + id;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请求如下url。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>http://localhost:8080/test/8?userId<span class="token operator">=</span><span class="token number">748327843</span><span class="token operator">&amp;</span><span class="token assign-left variable">name</span><span class="token operator">=</span>testName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后可以看到，控制台的输出如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>因 工单号 <span class="token punctuation">[</span>空<span class="token punctuation">]</span> /举报 ID <span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span> 警告玩家 <span class="token punctuation">[</span><span class="token number">748327843</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>并不会影响程序的正常运行。</p><h3 id="获取复杂参数类型" tabindex="-1"><a class="header-anchor" href="#获取复杂参数类型" aria-hidden="true">#</a> 获取复杂参数类型</h3><p>接下来要介绍的是如何记录复杂参数类型的日志。其实，大致的思路是不变的。我们看传入的类中的参数，有没有需要记录的。有的话就按照上面记录简单参数的方法来替换记录参数。</p><h4 id="定义测试复杂类型" tabindex="-1"><a class="header-anchor" href="#定义测试复杂类型" aria-hidden="true">#</a> 定义测试复杂类型</h4><p>新建<code>TestDTO</code>。代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package spring.aop.log.demo.api.util;

import lombok.Data;

/**
 * TestDto
 *
 * @author Lunhao Hu
 * @date 2019-02-01 15:02
 **/
@Data
public class TestDTO {
    private String name;
    
    private Integer age;

    private String email;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改param" tabindex="-1"><a class="header-anchor" href="#修改param" aria-hidden="true">#</a> 修改Param</h4><p>将上面的所有的参数全部添加到<code>Param</code>类中，全部定义成字符串类型。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package spring.aop.log.demo.api.util;

import lombok.Data;

/**
 * Param
 *
 * @author Lunhao Hu
 * @date 2019-01-30 17:14
 **/
@Data
public class Param {
    /**
     * 所有可能参数
     */
    private String id;
    private String age;
    private String workOrderNumber;
    private String userId;
    private String name;
    private String email;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改模板-1" tabindex="-1"><a class="header-anchor" href="#修改模板-1" aria-hidden="true">#</a> 修改模板</h4><p>将<code>WARNING</code>模板修改如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 操作类型
 */
WARNING(&quot;警告&quot;, &quot;因 工单号 [(%workOrderNumber)] /举报 ID [(%id)] 警告玩家 [(%userId)], 游戏名 [(%name)], 年龄 [(%age)]&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改controller-1" tabindex="-1"><a class="header-anchor" href="#修改controller-1" aria-hidden="true">#</a> 修改controller</h4><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@Log(type = &quot;WARNING&quot;)
@PostMapping(&quot;test/{id}&quot;)
public String test(
        @PathVariable(name = &quot;id&quot;) Integer id,
        @RequestParam(name = &quot;workOrderNumber&quot;, required = false) String workOrderNumber,
        @RequestParam(name = &quot;userId&quot;) String userId,
        @RequestBody TestDTO testDTO
) {
    return &quot;Hello&quot; + id;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改getrequestparam" tabindex="-1"><a class="header-anchor" href="#修改getrequestparam" aria-hidden="true">#</a> 修改getRequestParam</h4><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 获取拦截的请求中的参数
 * @param point
 */
private void getRequestParam() {
    // 获取简单参数类型
    this.getSimpleParam();

    // 获取复杂参数类型
    this.getComplexParam();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来实现<code>getComplexParam</code>方法。</p><h4 id="getcomplexparam" tabindex="-1"><a class="header-anchor" href="#getcomplexparam" aria-hidden="true">#</a> getComplexParam</h4><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 获取复杂参数类型的值
 */
private void getComplexParam() {
    for (Object arg : this.args) {
        // 跳过简单类型的值
        if (arg != null &amp;&amp; !this.isBasicType(arg)) {
           this.getFieldsParam(arg);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="getfieldsparam" tabindex="-1"><a class="header-anchor" href="#getfieldsparam" aria-hidden="true">#</a> getFieldsParam</h4><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 遍历一个复杂类型，获取值并赋值给param
 * @param target
 * @param &lt;T&gt;
 */
private &lt;T&gt; void getFieldsParam(T target) {
    Field[] fields = target.getClass().getDeclaredFields();
    for (Field field : fields) {
        String paramName = field.getName();
        if (this.isExist(paramName)) {
            String value = this.getParam(target, paramName);
            this.setParam(this.params, paramName, value);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行-1" tabindex="-1"><a class="header-anchor" href="#运行-1" aria-hidden="true">#</a> 运行</h4><p>启动项目。使用postman对上面的url发起POST请求。请求body中带上<code>TestDTO</code>中的参数。请求成功返回后就会看到控制台输出如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>因 工单号 <span class="token punctuation">[</span>空<span class="token punctuation">]</span> /举报 ID <span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span> 警告玩家 <span class="token punctuation">[</span><span class="token number">748327843</span><span class="token punctuation">]</span>, 游戏名 <span class="token punctuation">[</span>tom<span class="token punctuation">]</span>, 年龄 <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后就可以根据需求，将上面的日志记录到相应的地方。</p><p>到这可能有些哥们就觉得行了，万事具备，只欠东风。但其实这样的实现方式，还存在几个问题。</p><p>比如，如果请求失败了怎么办？请求失败，在需求上将，是根本不需要记录操作日志的，但是即使请求失败也会有返回值，就代表日志也会成功的记录。这就给后期查看日志带来了很大的困扰。</p><p>再比如，如果我需要的参数在返回值中怎么办？如果你没有用统一的生成唯一id的服务，就会遇到这个问题。就比如我需要往数据库中插入一条新的数据，我需要得到数据库自增id，而我们的日志拦截只拦截了请求中的参数。所以这就是我们接下来要解决的问题。</p><h3 id="判断请求是否成功" tabindex="-1"><a class="header-anchor" href="#判断请求是否成功" aria-hidden="true">#</a> 判断请求是否成功</h3><p>实现<code>success</code>函数，代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 根据http状态码判断请求是否成功
 *
 * @param response
 * @return
 */
private Boolean success(HttpServletResponse response) {
    return response.getStatus() == 200;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后将<code>getRequestParam</code>之后的所有操作，包括<code>getRequestParam</code>本身，用<code>success</code>包裹起来。如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>if (this.success(response)) {
    // 从请求传入参数中获取数据
    this.getRequestParam();
    if (!logDetail.isEmpty()) {
        // 将模板中的参数全部替换掉
        logDetail = this.replaceParam(logDetail);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一来，就可以保证只有在请求成功的前提下，才会记录日志。</p><h3 id="通过反射获取返回的参数" tabindex="-1"><a class="header-anchor" href="#通过反射获取返回的参数" aria-hidden="true">#</a> 通过反射获取返回的参数</h3><h4 id="新建result类" tabindex="-1"><a class="header-anchor" href="#新建result类" aria-hidden="true">#</a> 新建Result类</h4><p>在一个项目中，我们用一个类来统一返回值。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>package spring.aop.log.demo.api.util;

import lombok.Data;

/**
 * Result
 *
 * @author Lunhao Hu
 * @date 2019-02-01 16:47
 **/
@Data
public class Result {
    private Integer id;

    private String name;

    private Integer age;

    private String email;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改controller-2" tabindex="-1"><a class="header-anchor" href="#修改controller-2" aria-hidden="true">#</a> 修改controller</h4><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@Log(type = &quot;WARNING&quot;)
@PostMapping(&quot;test&quot;)
public Result test(
        @RequestParam(name = &quot;workOrderNumber&quot;, required = false) String workOrderNumber,
        @RequestParam(name = &quot;userId&quot;) String userId,
        @RequestBody TestDTO testDTO
) {
    Result result = new Result();
    result.setId(1);
    result.setAge(testDTO.getAge());
    result.setName(testDTO.getName());
    result.setEmail(testDTO.getEmail());
    return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行-2" tabindex="-1"><a class="header-anchor" href="#运行-2" aria-hidden="true">#</a> 运行</h4><p>启动项目，发起POST请求会发现，返回值如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
    <span class="token string">&quot;id&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
    <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;tom&quot;</span>,
    <span class="token string">&quot;age&quot;</span><span class="token builtin class-name">:</span> <span class="token number">12</span>,
    <span class="token string">&quot;email&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;test@test.com&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而控制台的输出如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>因 工单号 <span class="token punctuation">[</span><span class="token number">39424</span><span class="token punctuation">]</span> /举报 ID <span class="token punctuation">[</span>空<span class="token punctuation">]</span> 警告玩家 <span class="token punctuation">[</span><span class="token number">748327843</span><span class="token punctuation">]</span>, 游戏名 <span class="token punctuation">[</span>tom<span class="token punctuation">]</span>, 年龄 <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到，<code>id</code>没有被获取到。所以我们还需要添加一个函数，从返回值中获取id的数据。</p><h4 id="getresponseparam" tabindex="-1"><a class="header-anchor" href="#getresponseparam" aria-hidden="true">#</a> getResponseParam</h4><p>在<code>getRequestParam</code>后，添加方法<code>getResponseParam</code>，直接调用之前写好的函数。代码如下。</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>/**
 * 从返回值从获取数据
 */
private void getResponseParam(Object value) {
    this.getFieldsParam(value);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="运行-3" tabindex="-1"><a class="header-anchor" href="#运行-3" aria-hidden="true">#</a> 运行</h4><p>再次发起POST请求，可以发现控制台的输出如下。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>因 工单号 <span class="token punctuation">[</span><span class="token number">39424</span><span class="token punctuation">]</span> /举报 ID <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> 警告玩家 <span class="token punctuation">[</span><span class="token number">748327843</span><span class="token punctuation">]</span>, 游戏名 <span class="token punctuation">[</span>tom<span class="token punctuation">]</span>, 年龄 <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦得到了这条信息，我们就可以把它记录到任何我们想记录的地方。</p><h2 id="项目源码地址" tabindex="-1"><a class="header-anchor" href="#项目源码地址" aria-hidden="true">#</a> 项目源码地址</h2>`,160),m={href:"https://github.com/detectiveHLH/spring-aop-log-demo",target:"_blank",rel:"noopener noreferrer"};function b(g,h){const a=l("ExternalLinkIcon");return t(),r("div",null,[v,e("p",null,[n("大家可以参考我之前写的另一篇文章，"),e("a",o,[n("手把手教你从零开始搭建SpringBoot后端项目框架"),s(a)]),n("。只要能请求简单的接口就可以了。本项目的依赖如下。")]),p,e("p",null,[n("想要参考源码的大佬请戳 "),e("a",m,[n("->这里<-"),s(a)])])])}const x=d(u,[["render",b],["__file","230839.html.vue"]]);export{x as default};
