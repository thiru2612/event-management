package com.examly.springapp.controller;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    private final FeedbackService service;
    public FeedbackController(FeedbackService s) { this.service = s; }

    @PostMapping public Feedback add(@RequestBody Feedback f) { return service.addFeedback(f); }
    @GetMapping("/event/{id}") public List<Feedback> byEvent(@PathVariable Long id) { return service.getFeedbackByEvent(id); }
}