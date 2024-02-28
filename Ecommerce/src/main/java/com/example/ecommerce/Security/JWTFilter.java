package com.example.ecommerce.Security;

import java.io.IOException;
import java.util.List;

import com.example.ecommerce.Repositry.UserRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class JWTFilter  {

    @Autowired
    private JWTutils jwtUtil;
    @Autowired
    private UserRepositry userRepositry;
    public String check(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        boolean result = false;

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && !authHeader.isBlank() && authHeader.startsWith("Bearer")) {
            String jwt = authHeader.substring(7);

            if (jwt == null || jwt.isBlank()) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invlaid JWT token in Bearer Header");
            } else {
                List<String > claim = jwtUtil.validateTokenAndRetrieveSubject(jwt);
                 result = userRepositry.existsByEmail(claim.get(0));
                 if(result==true)
                     return claim.get(1);
            }
        }
        return null;
    }

    }