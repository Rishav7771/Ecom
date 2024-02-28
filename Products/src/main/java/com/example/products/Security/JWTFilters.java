package com.example.products.Security;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class JWTFilters  {

    @Autowired
    private JWTutils jwtUtil;
    public String check(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && !authHeader.isBlank() && authHeader.startsWith("Bearer")) {
            String jwt = authHeader.substring(7);

            //string utils:

            if (jwt == null || jwt.isBlank()) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invlaid JWT token in Bearer Header");
            } else {
                List<String > claim = jwtUtil.validateTokenAndRetrieveSubject(jwt);
                    return claim.get(1);
            }
        }
        return null;
    }

}