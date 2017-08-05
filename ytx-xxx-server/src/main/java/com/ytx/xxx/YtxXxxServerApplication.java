package com.ytx.xxx;

import org.mvnsearch.spring.boot.dubbo.EnableDubboConfiguration;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * dubbo服务端
 */
@SpringBootApplication
@MapperScan("com.ytx.xxx.domain.infrastructure.domain")
@EnableDubboConfiguration("com.ytx.xxx.server")
@EnableDiscoveryClient
public class YtxXxxServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(YtxXxxServerApplication.class, args);
    }
}
