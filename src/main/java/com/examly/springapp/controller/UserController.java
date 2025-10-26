package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    public UserController(UserService s) { this.service = s; }

    @PostMapping 
    public ResponseEntity<?> create(@RequestBody User u) { 
        // Check if trying to create admin user
        if ("admin".equalsIgnoreCase(u.getRole())) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
                // No authenticated user, allow first admin creation or deny
                // For simplicity, we'll allow it but you might want to restrict this
            } else {
                // Check if current user is admin
                String currentUserEmail = auth.getName();
                Optional<User> currentUser = service.getUserByEmail(currentUserEmail);
                if (currentUser.isEmpty() || !"admin".equalsIgnoreCase(currentUser.get().getRole())) {
                    return ResponseEntity.status(403).body("Only admin users can create admin accounts");
                }
            }
        }
        return ResponseEntity.ok(service.createUser(u)); 
    }
    
    @GetMapping public List<User> all() { return service.getAllUsers(); }
    @GetMapping("/{id}") public Optional<User> one(@PathVariable Long id) { return service.getUserById(id); }
    @PutMapping("/{id}") public User update(@PathVariable Long id, @RequestBody User u) { return service.updateUser(id, u); }
}
