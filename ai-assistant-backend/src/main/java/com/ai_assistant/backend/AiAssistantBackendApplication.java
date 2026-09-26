package com.ai_assistant.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AiAssistantBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(AiAssistantBackendApplication.class, args);
	}
}


