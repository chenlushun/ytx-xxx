package com.ytx.xxx.boot;

import com.alibaba.dubbo.config.spring.ReferenceBean;
import com.ytx.xxx.UserManager;
import org.mvnsearch.spring.boot.dubbo.DubboBasedAutoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * dubbo 配置类
 */
@Configuration
@EnableConfigurationProperties(YtxXxxProperties.class)
public class YtxXxxAutoconfiguration extends DubboBasedAutoConfiguration {

    private final YtxXxxProperties properties;

    @Autowired
    public YtxXxxAutoconfiguration(YtxXxxProperties properties) {
        this.properties = properties;
    }

    @Bean
    public ReferenceBean ytxUserManager() {
        return getConsumerBean(UserManager.class, properties.getVersion(), properties.getTimeout());
    }
}
