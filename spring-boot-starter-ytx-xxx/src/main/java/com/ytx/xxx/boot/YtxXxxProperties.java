package com.ytx.xxx.boot;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * 配置
 */
@ConfigurationProperties(prefix = "spring.ytx.xxx")
public class YtxXxxProperties {
    /**
     * dubbo服务版本号,默认值为空
     */
    private String version = "";
    /**
     * rpc服务调用超时时间
     */
    private Integer timeout = 10000;

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Integer getTimeout() {
        return timeout;
    }

    public void setTimeout(Integer timeout) {
        this.timeout = timeout;
    }
}
