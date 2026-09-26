package com.ai_assistant.backend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
public class GroqDirectServiceTest {

    @InjectMocks
    private GroqDirectService groqDirectService;

    @Test
    public void testServiceInitialization() {
        assertNotNull(groqDirectService, "GroqDirectService should successfully initialize");
    }
}