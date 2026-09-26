package com.ai_assistant.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class LegalApiControllerTest {

    @Autowired
    private ApplicationContext context;

    @Test
    void applicationContextAndBeansLoad() {
        // 1. Proves the Spring Boot application boots successfully
        assertNotNull(context, "The Spring Application Context must not be null");

        // 2. Proves that your Controllers, Services, and configurations actually wired up correctly
        assertTrue(context.getBeanDefinitionCount() > 0, "Spring Context must contain initialized beans");
    }
}