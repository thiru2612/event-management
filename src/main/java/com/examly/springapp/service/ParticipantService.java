package com.examly.springapp.service;

import com.examly.springapp.model.Participant;
import com.examly.springapp.model.Event;
import com.examly.springapp.repository.ParticipantRepository;
import com.examly.springapp.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ParticipantService {
    @Autowired private ParticipantRepository repo;
    @Autowired private EventRepository eventRepo;

    public Participant addParticipant(Participant p) { return repo.save(p); }
    
    public Participant addParticipantByEventId(Long eventId, Participant p) {
        Event event = eventRepo.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"));
        p.setEvent(event);
        return repo.save(p);
    }

    public List<Participant> getByEvent(Long eventId) {
        return repo.findByEvent_Id(eventId);
    }
}