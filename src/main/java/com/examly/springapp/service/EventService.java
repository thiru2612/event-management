package com.examly.springapp.service;

import com.examly.springapp.model.Event;
import com.examly.springapp.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        Event existing = getEventById(id);
        existing.setTitle(updatedEvent.getTitle());
        existing.setDescription(updatedEvent.getDescription());
        existing.setDate(updatedEvent.getDate());
        existing.setLocation(updatedEvent.getLocation());
        existing.setDateTime(updatedEvent.getDateTime());
        existing.setOrganizerName(updatedEvent.getOrganizerName());
        existing.setEventLink(updatedEvent.getEventLink());
        existing.setAttendees(updatedEvent.getAttendees());
        return eventRepository.save(existing);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public Event rsvpToEvent(Long id, String attendee) {
        Event event = getEventById(id);
        event.getAttendees().add(attendee);
        return eventRepository.save(event);
    }

    public Event cancelRsvp(Long id, String attendee) {
        Event event = getEventById(id);
        event.getAttendees().remove(attendee);
        return eventRepository.save(event);
    }

    public List<Event> searchEvents(String query) {
        List<Event> byTitle = eventRepository.findByTitleContainingIgnoreCase(query);
        List<Event> byOrganizer = eventRepository.findByOrganizerNameContainingIgnoreCase(query);
        Set<Event> result = new HashSet<>();
        result.addAll(byTitle);
        result.addAll(byOrganizer);
        return new ArrayList<>(result);
    }

    public Set<String> getAttendees(Long id) {
        return getEventById(id).getAttendees();
    }

    public List<Event> getUpcomingEvents() {
        return eventRepository.findByDateTimeAfter(LocalDateTime.now());
    }

    public List<Event> getPastEvents() {
        return eventRepository.findByDateTimeBefore(LocalDateTime.now());
    }
}
