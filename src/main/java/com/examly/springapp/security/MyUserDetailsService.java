// package com.examly.springapp.security;

// import com.examly.springapp.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.*;
// import org.springframework.stereotype.Service;

// @Service
// public class MyUserDetailsService implements UserDetailsService {

//     @Autowired
//     private UserRepository repo;

//     @Override
//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         return repo.findByEmail(email)
//                 .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
//     }
// }

// src/main/java/com/examly/springapp/security/MyUserDetailsService.java
package com.examly.springapp.security;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No user: " + email));
        // map role -> authority
        List<SimpleGrantedAuthority> auth = List.of(new SimpleGrantedAuthority("ROLE_" + (u.getRole() == null ? "USER" : u.getRole())));
        return new org.springframework.security.core.userdetails.User(u.getEmail(), u.getPassword(), auth);
    }
}
