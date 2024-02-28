package com.example.cart.Security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

@Component
public class JWTutils {

    //    public static String generateToken(String email , boolean role) throws IllegalArgumentException, JWTCreationException {
//        String newRole;
//        if(role==true)
//            newRole = "admin";
//        else
//            newRole = "user";
//        return JWT.create()
//                .withSubject("User Details")
//                .withClaim("email", email)
//                .withClaim("role",newRole)
//                .withIssuedAt(new Date())
//                .withIssuer("Event Scheduler")
//                .sign(Algorithm.HMAC256("Rishav is the greatest of all time"));
//    }
    public List<String> validateTokenAndRetrieveSubject(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256("Rishav is the greatest of all time"))
                .withSubject("User Details")
                .withIssuer("Event Scheduler").build();

        DecodedJWT jwt = verifier.verify(token);
        String email = jwt.getClaim("email").asString();
        String role = jwt.getClaim("role").asString();
        List<String > claim = new ArrayList<>();
        claim.add(email);
        claim.add(role);
        return claim;
    }
}