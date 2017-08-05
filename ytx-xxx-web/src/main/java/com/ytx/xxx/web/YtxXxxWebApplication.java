package com.ytx.xxx.web;

import org.jsondoc.spring.boot.starter.EnableJSONDoc;
import org.sitemesh.builder.SiteMeshFilterBuilder;
import org.sitemesh.config.ConfigurableSiteMeshFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.DispatcherType;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.EnumSet;

@SpringBootApplication
@EnableJSONDoc
public class YtxXxxWebApplication extends WebMvcConfigurerAdapter {

    public static void main(String[] args) {
        SpringApplication.run(YtxXxxWebApplication.class, args);
    }

    /**
     * character encoding filter
     *
     * @return character encoding filter
     */
    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);
        return filter;
    }

    /**
     * sitemesh filter
     *
     * @return sitemesh filter
     */
    @Bean
    public FilterRegistrationBean siteMeshFilter() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new ConfigurableSiteMeshFilter() {
            protected void applyCustomConfiguration(SiteMeshFilterBuilder builder) {
                builder.addExcludedPath("/jsondoc-ui.html");
                builder.addDecoratorPath("/*", "/layout.html");
            }
        });
        filterRegistrationBean.setDispatcherTypes(EnumSet.allOf(DispatcherType.class));
        return filterRegistrationBean;
    }

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if (!registry.hasMappingForPattern("/static/**")) {
            registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
        }
        if (!registry.hasMappingForPattern("/FEtest/**")) {
            registry.addResourceHandler("/FEtest/**").addResourceLocations("classpath:/FEtest/");
        }
    }

    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptorAdapter() {
            public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
                return true;
            }
        });
    }

}
