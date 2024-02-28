package com.example.ecommerce.Controllers;

import com.example.ecommerce.DTO.LoginCredentials;
import com.example.ecommerce.Entity.User;
import com.example.ecommerce.Services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Auth {
    @Autowired
    AuthService authService;

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user)
    {
        try {
            return authService.registerUser(user);
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginCredentials Credentials)
    {
        try {
            return  authService.loginUser(Credentials);
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
