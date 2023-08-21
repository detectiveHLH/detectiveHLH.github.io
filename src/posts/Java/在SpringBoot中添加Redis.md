---
date: 2018-10-11
permalink: /posts/230837.html
category:
- Java
tag:
- Spring Boot
- Redis
---

# 在SpringBoot中添加Redis


## 前言
在实际的开发中，会有这样的场景。有一个微服务需要提供一个查询的服务，但是需要查询的数据库表的数据量十分庞大，查询所需要的时间很长。
此时就可以考虑在项目中加入缓存。

## 引入依赖
在maven项目中引入如下依赖。并且需要在本地安装redis。
```xmlls
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <version>2.0.5.RELEASE</version>
</dependency>
```

## 配置redis
在SpringBoot的配置文件中添加如下代码。
```xml
redis:
    host: 127.0.0.1
    port: 6379
    timeout: 5000
    database: 0
    jedis:
      pool:
        max-idle: 8
        max-wait:
        min-idle: 0
```

## 添加redis配置文件
新建名为RedisConfig的配置类。

```java
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.cache.RedisCacheWriter;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;

import java.time.Duration;

/**
 * RedisConfig
 *
 * @author detectiveHLH
 * @date 2018-10-11 14:39
 **/
@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport {
    @Bean
    @Override
    public KeyGenerator keyGenerator() {
        return (target, method, params) -> {
            StringBuilder sb = new StringBuilder();
            sb.append(target.getClass().getName());
            sb.append(method.getName());
            for (Object obj : params) {
                sb.append(obj.toString());
            }
            return sb.toString();
        };
    }

    @Bean
    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory factory) {
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        //redis序列化
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        jackson2JsonRedisSerializer.setObjectMapper(om);

        StringRedisTemplate template = new StringRedisTemplate(factory);
        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.afterPropertiesSet();
        return template;
    }

    /**
     * 自定义CacheManager
     */
    @Bean
    public CacheManager cacheManager(RedisTemplate redisTemplate) {
        //全局redis缓存过期时间
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig().entryTtl(Duration.ofDays(1));
        RedisCacheWriter redisCacheWriter = RedisCacheWriter.nonLockingRedisCacheWriter(redisTemplate.getConnectionFactory());
        return new RedisCacheManager(redisCacheWriter, redisCacheConfiguration);
    }
}
```

## 添加缓存配置
在项目的service层中的实现类中，添加@Cacheable注解。
```java
import java.util.HashMap;

/**
 * UserLoginServiceImpl
 *
 * @author detectiveHLH
 * @date 2018-10-10 17:20
 **/
@Service
public class UserLoginServiceImpl implements UserLoginService {
    @Autowired
    private UserLoginMapper userLoginMapper;

    @Override
    @Cacheable(value = "usercache")
    public HashMap getByUserName(String userName) {
        System.out.println("此时没有走缓存");
        return userLoginMapper.getByUserName(userName);
    }
}
```
然后调用一次该接口。就可以在redis中看到如下的key。
```
"usercache::com.detectiveHLH.api.service.impl.UserLoginServiceImplgetByUserNameSolarFarm"
```
同时，可以在控制台中看到有"此时没有走缓存"的输出。然后再次调用该接口，就可以看到返回的速度明显变快，并且没有"此时没有走缓存"输出。说明
此时的接口走的是缓存。

博客： [个人博客地址](https://leonsh.cn/)



