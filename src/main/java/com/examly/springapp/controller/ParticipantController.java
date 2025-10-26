package com.examly.springapp.controller;

import com.examly.springapp.model.Participant;
import com.examly.springapp.service.ParticipantService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/participants")
public class ParticipantController {
    private final ParticipantService service;
    public ParticipantController(ParticipantService s) { 
        this.service = s;
    }

    @PostMapping public Participant add(@RequestBody ParticipantRequest request) { 
        return service.addParticipantByEventId(request.getEventId(), request.toParticipant()); 
    }
    @GetMapping("/event/{id}") public List<Participant> get(@PathVariable Long id) { return service.getByEvent(id); }
    
    // Helper class for request
    public static class ParticipantRequest {
        private Long eventId;
        private Long userId;
        private String name;
        private String email;
        
        public Long getEventId() { return eventId; }
        public void setEventId(Long eventId) { this.eventId = eventId; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public Participant toParticipant() {
            Participant p = new Participant();
            p.setUserId(userId);
            p.setName(name);
            p.setEmail(email);
            return p;
        }
    }
}