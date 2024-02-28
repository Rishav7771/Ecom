package com.example.ecommerce.Services;

import com.example.ecommerce.DTO.LoginCredentials;
import com.example.ecommerce.Entity.User;
import com.example.ecommerce.Repositry.UserRepositry;
import com.example.ecommerce.Security.JWTutils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuthService {
    @Autowired
    UserRepositry userRepositry;

    @Autowired
    JWTutils jwTutils;
    public ResponseEntity<?> registerUser(User user)
    {
        try
            {
                BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
                String encryptedPassword = bcrypt.encode(user.getPassword());
                user.setPassword(encryptedPassword);
                userRepositry.save(user);
                String token = jwTutils.generateToken(user.getEmail(), user.isIsadmin());
                return ResponseEntity.ok(token);
            }
        catch (DataIntegrityViolationException d)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email Already Exist");
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    public ResponseEntity<?> loginUser(LoginCredentials Credentials)
    {
       try {
           BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
           String email = Credentials.getEmail();
           String password = Credentials.getPassword();
           Optional<User> optionalUser = userRepositry.findByEmail(email);
           User user = optionalUser.get();
           if(userRepositry.existsByEmail(email))
           {
               if(bcrypt.matches(password,user.getPassword()))
               {
                   String token = jwTutils.generateToken(user.getEmail(),user.isIsadmin());
                   return ResponseEntity.status(HttpStatus.OK).body(token);
               }
           }
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Login Credentials");
       }catch (DataIntegrityViolationException d)
       {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
       }
       catch (Exception e)
       {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Login Credentials");
       }

    }
}
