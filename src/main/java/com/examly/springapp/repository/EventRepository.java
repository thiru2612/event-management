package com.examly.springapp.repository;

import com.examly.springapp.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByTitleContainingIgnoreCase(String query);
    List<Event> findByOrganizerNameContainingIgnoreCase(String query);
    List<Event> findByDateTimeAfter(LocalDateTime dateTime);
    List<Event> findByDateTimeBefore(LocalDateTime dateTime);
}
