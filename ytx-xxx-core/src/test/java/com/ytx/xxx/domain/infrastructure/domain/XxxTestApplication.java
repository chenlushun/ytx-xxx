package com.ytx.xxx.domain.infrastructure.domain;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("/application.properties")
@MapperScan("com.ytx.xxx.domain.infrastructure.domain")
@ComponentScan(value = "com.ytx.xxx.domain")
@EnableAspectJAutoProxy
public class XxxTestApplication {
}
