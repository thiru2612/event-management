package com.examly.springapp.model;

import javax.persistence.*;

@Entity
public class Participant {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne private Event event;
    private Long userId;
    private String name;
    private String email;
    private String roleInEvent;
    private String attendanceStatus;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Event getEvent() {
        return event;
    }
    public void setEvent(Event event) {
        this.event = event;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getRoleInEvent() {
        return roleInEvent;
    }
    public void setRoleInEvent(String roleInEvent) {
        this.roleInEvent = roleInEvent;
    }
    public String getAttendanceStatus() {
        return attendanceStatus;
    }
    public void setAttendanceStatus(String attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}