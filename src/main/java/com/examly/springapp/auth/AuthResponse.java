// package com.examly.springapp.auth;

// public class AuthResponse {
//     private final String jwt;

//     public AuthResponse(String jwt) {
//         this.jwt = jwt;
//     }

//     public String getJwt() {
//         return jwt;
//     }
// }


// src/main/java/com/examly/springapp/auth/AuthResponse.java
package com.examly.springapp.auth;
import com.examly.springapp.model.User;
public class AuthResponse {
    private String jwt;
    private User user;
    public AuthResponse(String jwt, User user){this.jwt=jwt; this.user=user;}
    public String getJwt(){return jwt;} public User getUser(){return user;}
}
