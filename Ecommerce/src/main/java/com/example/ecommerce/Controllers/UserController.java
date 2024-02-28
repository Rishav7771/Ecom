package com.example.ecommerce.Controllers;


import com.example.ecommerce.DTO.UserDTO;
import com.example.ecommerce.Services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestController()
public class UserController {

    @Autowired
    private UserService userService;

    //Get User By ID
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserProfile(@Valid @PathVariable int id) {
        try {
            return userService.getUserProfile(id);
        }catch (MethodArgumentTypeMismatchException a)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please Enter A valid User Id");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    //update user by ID
    @PutMapping("/user/{userId}")
    public ResponseEntity<?> updateUserProfile(@Valid @PathVariable int userId, @RequestBody UserDTO userDTO) {
        try {
            return userService.updateUserProfile(userId, userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    //Get All User
    @GetMapping("/user/all")
    public ResponseEntity<?> getUsers(HttpServletResponse response, HttpServletRequest request) {
        try {
            return userService.getUsers(response, request);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    //Delete User By ID
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<?> deleteUser(@Valid @PathVariable int userId, HttpServletResponse response, HttpServletRequest request) {
        try {
            return userService.deleteUser(userId, response, request);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
}
