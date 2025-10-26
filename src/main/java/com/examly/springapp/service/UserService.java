package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers() { return userRepository.findAll(); }

    public Optional<User> getUserById(Long id) { return userRepository.findById(id); }

    public User updateUser(Long id, User updated) {
        return userRepository.findById(id).map(u -> {
            u.setName(updated.getName());
            u.setEmail(updated.getEmail());
            u.setRole(updated.getRole());
            return userRepository.save(u);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
