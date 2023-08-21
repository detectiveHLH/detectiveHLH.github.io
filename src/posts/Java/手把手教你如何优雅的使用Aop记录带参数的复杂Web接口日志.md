---
date: 2019-02-11
permalink: /posts/230839.html
category:
- Java
tag:
- AOP
---

# 手把手教你如何优雅的使用Aop记录带参数的复杂Web接口日志


## 前言
不久前，因为需求的原因，需要实现一个操作日志。几乎每一个接口被调用后，都要记录一条跟这个参数挂钩的特定的日志到数据库。举个例子，就比如禁言操作，日志中需要记录因为什么禁言，被禁言的人的id和各种信息。方便后期查询。

这样的接口有很多个，而且大部分接口的参数都不一样。可能大家很容易想到的一个思路就是，实现一个日志记录的工具类，然后在需要记录日志的接口中，添加一行代码。由这个日志工具类去判断此时应该处理哪些参数。

但是这样有很大的问题。如果需要记日志的接口数量非常多，先不讨论这个工具类中需要做多少的类型判断，仅仅是给所有接口添加这样一行代码在我个人看来都是不能接受的行为。首先，这样对代码的侵入性太大。其次，后期万一有改动，维护的人将会十分难受。想象一下，全局搜索相同的代码，再一一进行修改。

所以我放弃了这个略显原始的方法。我最终采用了Aop的方式，采取拦截的请求的方式，来记录日志。但是即使采用这个方法，仍然面临一个问题，那就是如何处理大量的参数。以及如何对应到每一个接口上。

我最终没有拦截所有的controller，而是自定义了一个日志注解。所有打上了这个注解的方法，将会记录日志。同时，注解中会带有类型，来为当前的接口指定特定的日志内容以及参数。

那么如何从众多可能的参数中，为当前的日志指定对应的参数呢。我的解决方案是维护一个参数类，里面列举了所有需要记录在日志中的参数名。然后在拦截请求时，通过反射，获取到该请求的request和response中的所有参数和值，如果该参数存在于我维护的param类中，则将对应的值赋值进去。

然后在请求结束后，将模板中的所有预留的参数全部用赋了值的参数替换掉。这样一来，在不大量的侵入业务的前提下，满足了需求，同时也保证了代码的可维护性。

下面我将会把详细的实现过程列举出来。

## 开始操作前
文章结尾我会给出这个demo项目的所有源码。所以不想看过程的兄台可移步到末尾，直接看源码。（听说和源码搭配，看文章更美味...）

## 开始操作
### 新建项目
大家可以参考我之前写的另一篇文章，[手把手教你从零开始搭建SpringBoot后端项目框架](https://detectivehlh.github.io./java/newSprintBootStarter/)。只要能请求简单的接口就可以了。本项目的依赖如下。
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>2.1.1.RELEASE</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.aspectj/aspectjrt -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjrt</artifactId>
    <version>1.9.2</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.aspectj/aspectjweaver -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.2</version>
</dependency>


<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.2</version>
</dependency>

<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>4.1.14</version>
</dependency>

```

### 新建Aop类
新建`LogAspect`类。代码如下。
```Java
package spring.aop.log.demo.api.util;

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
    @Pointcut("@annotation(spring.aop.log.demo.api.util.Log)")
    public void operationLog() {
    }
    
    /**
     * 新增结果返回后触发
     *
     * @param point
     * @param returnValue
     */
    @AfterReturning(returning = "returnValue", pointcut = "operationLog() && @annotation(log)")
    public void doAfterReturning(JoinPoint point, Object returnValue, Log log) {
        System.out.println("test");
    }
}
```
`Pointcut`中传入了一个注解，表示凡是打上了这个注解的方法，都会触发由`Pointcut`修饰的`operationLog`函数。而`AfterReturning`则是在请求返回之后触发。

### 自定义注解
上一步提到了自定义注解，这个自定义注解将打在controller的每个方法上。新建一个`annotation`的类。代码如下。
```Java
package spring.aop.log.demo.api.util;

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
    String type() default "";
}
```
`Target`和`Retention`都属于元注解。共有4种，分别是`@Retention`、`@Target`、`@Document`、`@Inherited`。

`Target`注解说明了该Annotation所修饰的范围。可以传入很多类型，参数为`ElementType`。例如`TYPE`，用于描述类、接口或者枚举类；`FIELD`用于描述属性；`METHOD`用于描述方法；`PARAMETER`用于描述参数；`CONSTRUCTOR`用于描述构造函数；`LOCAL_VARIABLE`用于描述局部变量；`ANNOTATION_TYPE`用于描述注解；`PACKAGE`用于描述包等。

`Retention`注解定义了该Annotation被保留的时间长短。参数为`RetentionPolicy`。例如`SOURCE`表示只在源码中存在，不会在编译后的class文件存在；`CLASS`是该注解的默认选项。 即存在于源码，也存在于编译后的class文件，但不会被加载到虚拟机中去；`RUNTIME`存在于源码、class文件以及虚拟机中，通俗一点讲就是可以在运行的时候通过反射获取到。

### 加上普通注解
给需要记录日志的接口加上`Log`注解。
```Java
package spring.aop.log.demo.api.controller;
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
    @GetMapping("test/{id}")
    public String test(@PathVariable(name = "id") Integer id) {
        return "Hello" + id;
    }
}
```
加上之后，每一次调用`test/{id}`这个接口，都会触发拦截器中的`doAfterReturning`方法中的代码。

### 加上带类型注解
上面介绍了记录普通日志的方法，接下来要介绍记录特定日志的方法。什么特定日志呢，就是每个接口要记录的信息不同。为了实现这个，我们需要实现一个操作类型的枚举类。代码如下。

#### 操作类型模板枚举
新建一个枚举类`Type`。代码如下。
```Java
package spring.aop.log.demo.api.util;

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
    WARNING("警告", "因被其他玩家举报，警告玩家");

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
```
#### 给注解加上类型
给上面的controller中的注解加上type。代码如下。
```Java
package spring.aop.log.demo.api.controller;

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
    @Log(type = "WARNING")
    @GetMapping("test/{id}")
    public String test(@PathVariable(name = "id") Integer id) {
        return "Hello" + id;
    }
}
```

#### 修改aop类
将aop类中的`doAfterReturning`为如下。
```Java
@AfterReturning(returning = "returnValue", pointcut = "operationLog() && @annotation(log)")
public void doAfterReturning(JoinPoint point, Object returnValue, Log log) {
    // 注解中的类型
    String enumKey = log.type();
    System.out.println(Type.valueOf(enumKey).getOperation());
}
```
加上之后，每一次调用加了`@Log(type = "WARNING")`这个注解的接口，都会打印这个接口所指定的日志。例如上述代码就会打印出如下代码。
```bash
因被其他玩家举报，警告玩家
```

#### 获取aop拦截的请求参数
为每个接口指定一个日志并不困难，只需要为每个接口指定一个类型即可。但是大家应该也注意到了，一个接口日志，只记录`因被其他玩家举报，警告玩家`这样的信息没有任何意义。

记录日志的人倒不觉得，而最后去查看日志的人就要吾日三省吾身了，被谁举报了？因为什么举报了？我警告的谁？

这样的日志做了太多的无用功，根本没有办法在出现问题之后溯源。所以我们下一步的操作就是给每个接口加上特定的参数。那么大家可能会有问题，如果每个接口的参数几乎都不一样，那这个工具类岂不是要传入很多参数，要怎么实现呢，甚至还要组织参数，这样会大量的侵入业务代码，并且会大量的增加冗余代码。

大家可能会想到，实现一个记录日志的方法，在要记日志的接口中调用，把参数传进去。如果类型很多的话，参数也会随之增多，每个接口的参数都不一样。处理起来十分麻烦，而且对业务的侵入性太高。几乎每个地方都要嵌入日志相关代码。一旦涉及到修改，将会变得十分难维护。

所以我直接利用反射获取aop拦截到的请求中的所有参数，如果我的参数类（所有要记录的参数）里面有请求中的参数，那么我就将参数的值写入参数类中。最后将日志模版中参数预留字段替换成请求中的参数。

流程图如下所示。

![img](/images/230839/request-process.jpeg)


#### 新建参数类
新建一个类`Param`，其中包含所有在操作日志中，可能会出现的参数。为什么要这么做？因为每个接口需要的参数都有可能完全不一样，与其去维护大量的判断逻辑，还不如`贪心`一点，直接传入所有的可能参数。当然后期如果有新的参数需要记录，则需要修改代码。
```Java
package spring.aop.log.demo.api.util;

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
```

#### 修改模板
将模板枚举类中的`WARNING`修改为如下。
```Java
WARNING("警告", "因 工单号 [(%workOrderNumber)] /举报 ID [(%id)] 警告玩家 [(%userId)]");
```
其中的参数，就是要在aop拦截阶段获取并且替换掉的参数。

#### 修改controller
我们给之前的controller加上上述模板中国呢的参数。部分代码如下。
```Java
@Log(type = "WARNING")
@GetMapping("test/{id}")
public String test(
        @PathVariable(name = "id") Integer id,
        @RequestParam(name = "workOrderNumber") String workOrderNumber,
        @RequestParam(name = "userId") String userId,
        @RequestParam(name = "name") String name
) {
    return "Hello" + id;
}
```

### 通过反射获取请求的参数
在此处分两种情况，一种是简单参数类型，另外一种是复杂参数类型，也就是参数中带了请求DTO的情况。

### 获取简单参数类型
给aop类添加几个私有变量。
```Java
/**
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
```
然后将`doAfterReturning`中的代码改成如下。
```Java
try {
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
```
首先要做的就是拦截打上了自定义注解的请求。我们可以获取到请求的详情，以及请求中的所有的参数名，以及参数。下面我们就来实现上述代码中的`getRequestParam`方法。

#### getRequestParam
```Java
/**
 * 获取拦截的请求中的参数
 * @param point
 */
private void getRequestParam() {
    // 获取简单参数类型
    this.getSimpleParam();
}
```


#### getSimpleParam
```Java
/**
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
```
上述代码中，遍历请求所传入的参数名，然后我们实现`isExist`方法， 来判断这个参数在我们的`Param`类中是否存在，如果存在我们就再调用`setRequestParamValueIntoParam`方法，将这个参数名所对应的参数值写入到`Param`类的实例中。

#### isExist
`isExist`的代码如下。
```Java
/**
 * 判断该参数在参数类中是否存在（是否是需要记录的参数）
 * @param targetClass
 * @param name
 * @param <T>
 * @return
 */
private <T> Boolean isExist(String name) {
    boolean exist = true;
    try {
        String key = this.setFirstLetterUpperCase(name);
        Method targetClassGetMethod = this.params.getClass().getMethod("get" + key);
    } catch (NoSuchMethodException e) {
        exist = false;
    }
    return exist;
}
```
在上面我们也提到过，在编译的时候会加上getter和setter，所以参数名的首字母都会变成大写，所以我们需要自己实现一个`setFirstLetterUpperCase`方法，来将我们传入的参数名的首字母变成大写。

#### setFirstLetterUpperCase
代码如下。
```Java
/**
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
```

#### setRequestParamValueIntoParam
代码如下。
```Java
/**
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
```
`ArrayUtil`是`hutool`中的一个工具函数。用来判断在一个元素在数组中的下标。

#### setParam
代码如下。
```Java
/**
 * 将数据写入参数类的实例中
 * @param targetClass
 * @param key
 * @param value
 * @param <T>
 */
private <T> void setParam(T targetClass, String key, String value) {
    try {
        Method targetClassParamSetMethod = targetClass.getClass().getMethod("set" + this.setFirstLetterUpperCase(key), String.class);
        targetClassParamSetMethod.invoke(targetClass, value);
    } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
        e.printStackTrace();
    }
}
```
该函数使用反射的方法，获取该参数的set方法，将`Param`类中对应的参数设置成传入的值。

#### 运行
启动项目，并且请求controller中的方法。并且传入定义好的参数。
```
http://localhost:8080/test/8?workOrderNumber=3231732&userId=748327843&name=testName
```
该`GET`请求总共传入了4个参数，分别是`id`,`workOrderNumber`,`userId`, `name`。大家可以看到，在`Param`类中并没有定义`name`这个字段。这是特意加了一个不需要记录的参数，来验证我们接口的健壮性的。

运行之后，可以看到控制台打印的信息如下。
```bash
Param(id=8, workOrderNumber=3231732, userId=748327843)
```
我们想让aop记录的参数全部记录到`Param`类中的实例中，而传入了意料之外的参数也没有让程序崩溃。接下里我们只需要将这些参数，将之前定义好的模板的参数预留字段替换掉即可。

#### 替换参数
在`doAfterReturning`中的`getRequestParam`函数后，加入以下代码。
```Java
if (!logDetail.isEmpty()) {
    // 将模板中的参数全部替换掉
    logDetail = this.replaceParam(logDetail);
}
System.out.println(logDetail);
```
下面我们实现`replaceParam`方法。

#### replaceParam
代码如下。
```Java
/**
 * 将模板中的预留字段全部替换为拦截到的参数
 * @param template
 * @return
 */
private String replaceParam(String template) {
    // 将模板中的需要替换的参数转化成map
    Map<String, String> paramsMap = this.convertToMap(template);
    for (String key : paramsMap.keySet()) {
        template = template.replace("%" + key, paramsMap.get(key)).replace("(", "").replace(")", "");
    }
    return template;
}
```
`convertToMap`方法将模板中的所有预留字段全部提取出来，当作一个Map的Key。

#### convertToMap
代码如下。
```Java
/**
 * 将模板中的参数转换成map的key-value形式
 * @param template
 * @return
 */
private Map<String, String> convertToMap(String template) {
    Map<String, String> map = new HashMap<>();
    String[] arr = template.split("\\(");
    for (String s : arr) {
        if (s.contains("%")) {
            String key = s.substring(s.indexOf("%"), s.indexOf(")")).replace("%", "").replace(")", "").replace("-", "").replace("]", "");
            String value = this.getParam(this.params, key);
            map.put(key, "null".equals(value) ? "(空)" : value);
        }
    }
    return map;
}
```
其中的`getParam`方法，类似于`setParam`，也是利用反射的方法，通过传入的Class和Key，获取对应的值。

#### getParam
代码如下。
```Java
/**
 * 通过反射获取传入的类中对应key的值
 * @param targetClass
 * @param key
 * @param <T>
 */
private <T> String getParam(T targetClass, String key) {
    String value = "";
    try {
        Method targetClassParamGetMethod = targetClass.getClass().getMethod("get" + this.setFirstLetterUpperCase(key));
        value = String.valueOf(targetClassParamGetMethod.invoke(targetClass));
    } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
        e.printStackTrace();
    }
    return value;
}
```

#### 再次运行
再次请求上述的url，则可以看到控制台的输出如下。
```bash
因 工单号 [3231732] /举报 ID [8] 警告玩家 [748327843]
```
可以看到，我们需要记录的所有的参数，都被正确的替换了。而不需要记录的参数，同样也没有对程序造成影响。

让我们试试传入不传入非必选参数，会是什么样。修改controller如下，把workOrderNumber改成非必须按参数。
```Java
@Log(type = "WARNING")
@GetMapping("test/{id}")
public String test(
        @PathVariable(name = "id") Integer id,
        @RequestParam(name = "workOrderNumber", required = false) String workOrderNumber,
        @RequestParam(name = "userId") String userId,
        @RequestParam(name = "name") String name
) {
    return "Hello" + id;
}
```
请求如下url。
```bash
http://localhost:8080/test/8?userId=748327843&name=testName
```
然后可以看到，控制台的输出如下。
```bash
因 工单号 [空] /举报 ID [8] 警告玩家 [748327843]
```
并不会影响程序的正常运行。

### 获取复杂参数类型
接下来要介绍的是如何记录复杂参数类型的日志。其实，大致的思路是不变的。我们看传入的类中的参数，有没有需要记录的。有的话就按照上面记录简单参数的方法来替换记录参数。

#### 定义测试复杂类型
新建`TestDTO`。代码如下。
```Java
package spring.aop.log.demo.api.util;

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
```

#### 修改Param
将上面的所有的参数全部添加到`Param`类中，全部定义成字符串类型。
```Java
package spring.aop.log.demo.api.util;

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
```

#### 修改模板
将`WARNING`模板修改如下。
```Java
/**
 * 操作类型
 */
WARNING("警告", "因 工单号 [(%workOrderNumber)] /举报 ID [(%id)] 警告玩家 [(%userId)], 游戏名 [(%name)], 年龄 [(%age)]");
```

#### 修改controller

```Java
@Log(type = "WARNING")
@PostMapping("test/{id}")
public String test(
        @PathVariable(name = "id") Integer id,
        @RequestParam(name = "workOrderNumber", required = false) String workOrderNumber,
        @RequestParam(name = "userId") String userId,
        @RequestBody TestDTO testDTO
) {
    return "Hello" + id;
}
```
#### 修改getRequestParam
```Java
/**
 * 获取拦截的请求中的参数
 * @param point
 */
private void getRequestParam() {
    // 获取简单参数类型
    this.getSimpleParam();

    // 获取复杂参数类型
    this.getComplexParam();
}
```
接下来实现`getComplexParam`方法。

#### getComplexParam
```Java
/**
 * 获取复杂参数类型的值
 */
private void getComplexParam() {
    for (Object arg : this.args) {
        // 跳过简单类型的值
        if (arg != null && !this.isBasicType(arg)) {
           this.getFieldsParam(arg);
        }
    }
}
```

#### getFieldsParam
```Java
/**
 * 遍历一个复杂类型，获取值并赋值给param
 * @param target
 * @param <T>
 */
private <T> void getFieldsParam(T target) {
    Field[] fields = target.getClass().getDeclaredFields();
    for (Field field : fields) {
        String paramName = field.getName();
        if (this.isExist(paramName)) {
            String value = this.getParam(target, paramName);
            this.setParam(this.params, paramName, value);
        }
    }
}
```

#### 运行
启动项目。使用postman对上面的url发起POST请求。请求body中带上`TestDTO`中的参数。请求成功返回后就会看到控制台输出如下。
```bash
因 工单号 [空] /举报 ID [8] 警告玩家 [748327843], 游戏名 [tom], 年龄 [12]
```
然后就可以根据需求，将上面的日志记录到相应的地方。

到这可能有些哥们就觉得行了，万事具备，只欠东风。但其实这样的实现方式，还存在几个问题。

比如，如果请求失败了怎么办？请求失败，在需求上将，是根本不需要记录操作日志的，但是即使请求失败也会有返回值，就代表日志也会成功的记录。这就给后期查看日志带来了很大的困扰。

再比如，如果我需要的参数在返回值中怎么办？如果你没有用统一的生成唯一id的服务，就会遇到这个问题。就比如我需要往数据库中插入一条新的数据，我需要得到数据库自增id，而我们的日志拦截只拦截了请求中的参数。所以这就是我们接下来要解决的问题。

### 判断请求是否成功
实现`success`函数，代码如下。
```Java
/**
 * 根据http状态码判断请求是否成功
 *
 * @param response
 * @return
 */
private Boolean success(HttpServletResponse response) {
    return response.getStatus() == 200;
}
```
然后将`getRequestParam`之后的所有操作，包括`getRequestParam`本身，用`success`包裹起来。如下。
```Java
if (this.success(response)) {
    // 从请求传入参数中获取数据
    this.getRequestParam();
    if (!logDetail.isEmpty()) {
        // 将模板中的参数全部替换掉
        logDetail = this.replaceParam(logDetail);
    }
}
```
这样一来，就可以保证只有在请求成功的前提下，才会记录日志。

### 通过反射获取返回的参数

#### 新建Result类
在一个项目中，我们用一个类来统一返回值。
```Java
package spring.aop.log.demo.api.util;

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
```

#### 修改controller
```Java
@Log(type = "WARNING")
@PostMapping("test")
public Result test(
        @RequestParam(name = "workOrderNumber", required = false) String workOrderNumber,
        @RequestParam(name = "userId") String userId,
        @RequestBody TestDTO testDTO
) {
    Result result = new Result();
    result.setId(1);
    result.setAge(testDTO.getAge());
    result.setName(testDTO.getName());
    result.setEmail(testDTO.getEmail());
    return result;
}
```

#### 运行
启动项目，发起POST请求会发现，返回值如下。
```bash
{
    "id": 1,
    "name": "tom",
    "age": 12,
    "email": "test@test.com"
}
```
而控制台的输出如下。
```bash
因 工单号 [39424] /举报 ID [空] 警告玩家 [748327843], 游戏名 [tom], 年龄 [12]
```
可以看到，`id`没有被获取到。所以我们还需要添加一个函数，从返回值中获取id的数据。

#### getResponseParam
在`getRequestParam`后，添加方法`getResponseParam`，直接调用之前写好的函数。代码如下。
```Java
/**
 * 从返回值从获取数据
 */
private void getResponseParam(Object value) {
    this.getFieldsParam(value);
}
```

#### 运行
再次发起POST请求，可以发现控制台的输出如下。
```bash
因 工单号 [39424] /举报 ID [1] 警告玩家 [748327843], 游戏名 [tom], 年龄 [12]
```
一旦得到了这条信息，我们就可以把它记录到任何我们想记录的地方。

## 项目源码地址
想要参考源码的大佬请戳 [->这里<-](https://github.com/detectiveHLH/spring-aop-log-demo)




