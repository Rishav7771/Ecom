package com.example.ecommerce.Services;
import com.example.ecommerce.DTO.UserDTO;
import com.example.ecommerce.Entity.User;
import com.example.ecommerce.Repositry.UserRepositry;
import com.example.ecommerce.Security.JWTFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Component
public class UserService {
    @Autowired
    UserRepositry userRepositry;

    @Autowired
    private JWTFilter jwtFilter;

    public ResponseEntity<?> getUserProfile(int id) {
        try {
            Optional<User> user = userRepositry.findById(id);
            if(user.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
            }
            UserDTO userResponse = new UserDTO();
            userResponse.setUserId(user.get().getUserId());
            userResponse.setName(user.get().getName());
            userResponse.setEmail(user.get().getEmail());
            userResponse.setMobileNumber(user.get().getMobileNumber());
            userResponse.setIsadmin(user.get().isIsadmin());
            return ResponseEntity.ok(userResponse);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    public ResponseEntity<?> updateUserProfile(int userId, UserDTO userDTO) {
        try {
            Optional<User> userOptional = userRepositry.findById(userId);
            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();
                if (userDTO.getName() != null)
                    existingUser.setName(userDTO.getName());
                if (userDTO.getEmail() != null)
                    existingUser.setEmail(userDTO.getEmail());
                if (userDTO.getMobileNumber() != null)
                    existingUser.setMobileNumber(userDTO.getMobileNumber());
                if(userOptional.get().isIsadmin()!=userDTO.isIsadmin())
                existingUser.setIsadmin(userDTO.isIsadmin());
                userRepositry.save(existingUser);
                return ResponseEntity.status(HttpStatus.CREATED).body("User Updated Successful");
            } else {

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    public ResponseEntity<?> getUsers(HttpServletResponse response, HttpServletRequest request) {
        try {
            List<User> allUser ;
            String role = isAdmin(response,request);
            if(role.equals("admin"))
            {
                allUser = userRepositry.findAll();
                if (allUser.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No User In The List");
                }
            }
            else
            {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User Not Authorized for this Activity");
            }
            List<UserDTO> users = new ArrayList<>();
            for(int i=0;i<allUser.size();i++)
            {
                UserDTO userResponse = new UserDTO();
                userResponse.setUserId(allUser .get(i).getUserId());
                userResponse.setName(allUser .get(i).getName());
                userResponse.setEmail(allUser .get(i).getEmail());
                userResponse.setMobileNumber(allUser .get(i).getMobileNumber());
                userResponse.setIsadmin(allUser.get(i).isIsadmin());
                users.add(userResponse);
            }
            return ResponseEntity.ok(users);
        }  catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    public ResponseEntity<?> deleteUser(int userId,HttpServletResponse response, HttpServletRequest request) {
        try{
            String role = isAdmin(response,request);
            if(role.equals("admin"))
            {
                if(userRepositry.existsByUserId(userId))
                 userRepositry.deleteById(userId);
                else
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
            }
            else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User Not Authorized for this Activity");

            return ResponseEntity.status(HttpStatus.OK).body("User Deleted ");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Interna Server Error");
        }
    }

    public String isAdmin(HttpServletResponse response, HttpServletRequest request)
    {

        try{
            String role = jwtFilter.check(request, response);
            if(role.equals("admin"))
                return role;
        }catch (ServletException ex) {
            throw new RuntimeException(ex);
        }catch (Exception e)
        {
            return e.getMessage();
        }
        return null;
    }

}



