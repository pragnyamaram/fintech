package com.fintech.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();

        // ✅ Set timeouts (VERY IMPORTANT)
        factory.setConnectTimeout(5000);  // 5 sec
        factory.setReadTimeout(5000);     // 5 sec

        return new RestTemplate(factory);
    }
}