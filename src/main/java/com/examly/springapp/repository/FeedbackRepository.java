package com.examly.springapp.repository;

import com.examly.springapp.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByEventId(Long eventId);
}