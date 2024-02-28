package com.example.ecommerce.DTO;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data

public class LoginCredentials {
    @Email
    @Column(unique = true, nullable = false)
    private String email;

    private String password;
}
