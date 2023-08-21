---
date: 2018-08-28
permalink: /posts/230836.html
category:
- Java
tag:
- Java Web
---

# 使用IntelliJ IDEA新建Java Web后端resfulAPI模板


初始化项目
---------
打开IntelliJ IDEA，我的版本是Version 2018.1.4。点击Create New Project。在左侧的列表中选择Maven。然后在右侧勾选Create from archetype。

然后在右侧的列表中选择org.apache.maven.archetypes:maven-archetype-webapp。点击next。

填写GroupId和ArtifactId。GroupId定义了项目属于哪个组织，例如，我们需要使用一个包，名字叫做fastjson，用户在项目中返回json数据的，是阿里的开源框架，被不少企业使用，是一个极其优秀的Json框架。它的groupId是com.alibaba，artifactId是fastjson。

简单理解一下，拿Github举个例子。GroupId就相当于是你的用户名，而ArtifactId就相当于是你的具体某个项目的名称，也是我们当前的项目的根目录名称。例子如下。
```json
GroupId: com.detectivehlh.test
ArtifactId: testDemo
```
点击next，下两页不用设置，直接点击next。此时新建项目成功，右下角会弹出一个提示框，上面写着Maven projects need to be imported.此时选择Enable Auto-Import。就可以看到项目开始自动的去加载依赖包了。加载完成之后，项目会多出一个src目录。

引入jersey和servlet
------------------
打开根目录下pom.xml文件，在dependencies标签中添加如下代码，引入servlet。
```xml
<dependency>
    <groupId>org.glassfish.jersey.containers</groupId>
    <artifactId>jersey-container-servlet</artifactId>
    <version>2.22.2</version>
</dependency>
```

打开/src/main/webapp/WEB_INF/web.xml。在web-app标签之间添加如下代码。
```xml
<servlet>
    <servlet-name>JAX-RS Servlet</servlet-name>
    <servlet-class>org.glassfish.jersey.servlet.ServletContainer</servlet-class>
    <init-param>
        <param-name>jersey.config.server.provider.packages</param-name>
        <param-value>com.detectivehlh.test</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>JAX-RS Servlet</servlet-name>
    <url-pattern>/api/*</url-pattern>
</servlet-mapping>
```
新建项目目录和文件
---------
在/src/main目录下新建java、resources目录，java放项目java源代码，resources放项目的静态资源文件。

打开File中的Project Structure，或者使用快捷键，command + ;就可以快捷打开了。将刚刚创建的名为java目录设置为Sources，resources设置为Resources。然后Apply。然后在java目录下依次新建com.detectivehlh.test三个包，就是我们的GroupId.

然后在com.detectivehlh.test中新建Hello类。代码如下。
```javascript
package com.detectivehlh.test;

import com.alibaba.fastjson.JSONObject;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/hello")
public class Hello {
    @Path("get")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStudent() {
        List<Student> lists = new ArrayList<Student>();
        lists.add(new Student("1","mayun",23));
        lists.add(new Student("2","mahuateng",24));
        lists.add(new Student("3","zhouhongyi",25));
        JSONObject json = new JSONObject();
        return Response.status(Response.Status.OK).entity(json.toJSONString(lists)).build();
    }
}

```
同样的地方新建Student类。代码如下。
```javascript
package com.detectivehlh.test;

public class Student {
    private String id;
    private String name;
    private int age;

    public Student(String id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

}
```

引入fastjson
-----------
这个时候可以看到，Hello的class中有报错。是因为没有在pom.xml中没有引入对fastjson的依赖。在根目录下的pom.xml中添加如下依赖。
```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.21</version>
</dependency>
```
再回到Hello中就可以看到没有错误信息了。

配置Tomcat
----------
选择顶部菜单栏中的Run->Edit Configurations。点击左侧的+，选择Tomcat Server->local。配置好Tomcat后，选择Server旁边的Deployment标签，点击下方的+，选择Artifact，选择testDemo:war exploded。点击Apply。然后点击右上角的长得像播放键的按钮，启动项目。
就可以看到会新建一个浏览器标签页。显示"Hello World!"，然后改变浏览器中的路由为我们写的接口的路由，/api/hello/get。就可以看到返回的json数据了。




