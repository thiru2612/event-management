package com.examly.springapp.service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class FeedbackService {
    @Autowired private FeedbackRepository repo;

    public Feedback addFeedback(Feedback f) { 
        return repo.save(f); 
    }

    public List<Feedback> getFeedbackByEvent(Long id) {
        return repo.findByEventId(id);
    }
}