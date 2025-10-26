// package com.examly.springapp.auth;

// import com.examly.springapp.security.JwtUtil;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.*;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     @Autowired private AuthenticationManager authenticationManager;
//     @Autowired private UserDetailsService userDetailsService;
//     @Autowired private JwtUtil jwtUtil;

//     @PostMapping("/login")
//     public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
//         try {
//             authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
//             );
//         } catch (BadCredentialsException e) {
//             throw new Exception("Incorrect username or password", e);
//         }

//         final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
//         final String jwt = jwtUtil.generateToken(userDetails);
//         return ResponseEntity.ok(new AuthResponse(jwt));
//     }
// }

// src/main/java/com/examly/springapp/auth/AuthController.java
package com.examly.springapp.auth;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        UserDetails ud = userDetailsService.loadUserByUsername(req.getEmail());
        final String token = jwtUtil.generateToken(ud);
        // fetch user entity for role/name
        User user = userRepository.findByEmail(req.getEmail()).orElse(null);
        return ResponseEntity.ok(new AuthResponse(token, user));
    }
}