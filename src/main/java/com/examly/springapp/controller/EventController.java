package com.examly.springapp.controller;

import com.examly.springapp.model.Event;
import com.examly.springapp.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

// @RestController
// @RequestMapping("/api/events")
// public class EventController {

//     @Autowired
//     private EventService eventService;

//     @GetMapping
//     public ResponseEntity<List<Event>> getAllEvents() {
//         return ResponseEntity.ok(eventService.getAllEvents());
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Event> getEventById(@PathVariable Long id) {
//         return ResponseEntity.ok(eventService.getEventById(id));
//     }

//     // @PostMapping
//     // public ResponseEntity<Event> createEvent(@RequestBody Event event) {
//     //     return ResponseEntity.ok(eventService.createEvent(event));
//     // }

//     @PostMapping
//     @PreAuthorize("hasRole('ADMIN')")
//     public ResponseEntity<Event> createEvent(@RequestBody Event event) {
//         return ResponseEntity.ok(eventService.createEvent(event));
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
//         return ResponseEntity.ok(eventService.updateEvent(id, event));
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
//         eventService.deleteEvent(id);
//         return ResponseEntity.noContent().build();
//     }

//     @PostMapping("/{id}/rsvp")
//     public ResponseEntity<Event> rsvpToEvent(@PathVariable Long id, @RequestParam String attendee) {
//         return ResponseEntity.ok(eventService.rsvpToEvent(id, attendee));
//     }

//     @DeleteMapping("/{id}/rsvp")
//     public ResponseEntity<Event> cancelRsvp(@PathVariable Long id, @RequestParam String attendee) {
//         return ResponseEntity.ok(eventService.cancelRsvp(id, attendee));
//     }

//     @GetMapping("/{id}/attendees")
//     public ResponseEntity<Set<String>> getAttendees(@PathVariable Long id) {
//         return ResponseEntity.ok(eventService.getAttendees(id));
//     }

//     @GetMapping("/search")
//     public ResponseEntity<List<Event>> searchEvents(@RequestParam String query) {
//         return ResponseEntity.ok(eventService.searchEvents(query));
//     }

//     @GetMapping("/upcoming")
//     public ResponseEntity<List<Event>> getUpcomingEvents() {
//         return ResponseEntity.ok(eventService.getUpcomingEvents());
//     }

//     @GetMapping("/past")
//     public ResponseEntity<List<Event>> getPastEvents() {
//         return ResponseEntity.ok(eventService.getPastEvents());
//     }
// }

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.createEvent(event));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return ResponseEntity.ok(eventService.updateEvent(id, event));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    // Normal users (no restriction)
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping("/{id}/rsvp")
    public ResponseEntity<Event> rsvpToEvent(@PathVariable Long id, @RequestParam String attendee) {
        return ResponseEntity.ok(eventService.rsvpToEvent(id, attendee));
    }
}
