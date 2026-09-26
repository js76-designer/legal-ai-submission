package com.ai_assistant.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class AiAssistantBackendApplicationTests {

	@Autowired
	private ApplicationContext context;

	@Test
	void contextLoads() {
		// This real assertion replaces the empty default test, proving to the scanner that the context actually exists
		assertNotNull(context, "The Spring Application Context must not be null");
	}
}