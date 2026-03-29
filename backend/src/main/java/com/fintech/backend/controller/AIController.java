// package com.fintech.backend.controller;

// import com.fintech.backend.dto.AIAnalysisResponseDTO;
// import com.fintech.backend.service.AIService;
// import org.springframework.web.bind.annotation.*;

// import java.util.HashMap;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/ai")
// public class AIController {

//     private final AIService aiService;

//     public AIController(AIService aiService) {
//         this.aiService = aiService;
//     }

//     // =========================
//     // 🔹 ANALYZE
//     // =========================
//     @PostMapping("/analyze/{userId}")
//     public AIAnalysisResponseDTO analyze(@PathVariable Long userId) {
//         return aiService.analyze(userId);
//     }

//     // =========================
//     // 🔹 CHAT (FIXED)
//     // =========================
//    @PostMapping("/chat")
//     public Map<String, String> chat(@RequestBody Map<String, Object> body) {

//         String message = body.get("message") != null
//                 ? body.get("message").toString()
//                 : "";

//         Long userId = body.get("userId") != null
//                 ? Long.parseLong(body.get("userId").toString())
//                 : 1L;

//         String reply = aiService.chat(userId, message);

//         Map<String, String> response = new HashMap<>();
//         response.put("reply", reply);

//         return response;
//     }
// }


package com.fintech.backend.controller;

import com.fintech.backend.dto.AIAnalysisResponseDTO;
import com.fintech.backend.service.AIService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/analyze/{userId}")
    public AIAnalysisResponseDTO analyze(@PathVariable Long userId) {
        return aiService.analyze(userId);
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, Object> body) {
        String message = body.get("message") != null
                ? body.get("message").toString()
                : "";

        Long userId = body.get("userId") != null
                ? Long.parseLong(body.get("userId").toString())
                : 1L;

        String reply = aiService.chat(userId, message);

        Map<String, String> response = new HashMap<>();
        response.put("reply", reply);
        return response;
    }
}