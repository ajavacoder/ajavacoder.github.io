package com.nguyenhuu.testserver;

import javax.sql.DataSource;

import org.h2.jdbcx.JdbcDataSource;
import org.h2.server.web.WebServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class AppConfig {
    @Autowired
    private Environment env;
    @Bean
    DataSource dataSource() throws Exception {
        JdbcDataSource dts = new JdbcDataSource();
        dts.setUrl(env.getProperty("datasource.url"));
        dts.setUser(env.getProperty("datasource.username"));
        dts.setPassword(env.getProperty("datasource.password")==null?"":env.getProperty("datasource.password"));
        return dts;
    }
    
    @Bean
    ServletRegistrationBean h2servletRegistration(){
        ServletRegistrationBean registrationBean = new ServletRegistrationBean( new WebServlet());
        registrationBean.addUrlMappings("/database/*");
        return registrationBean;
    }
}
