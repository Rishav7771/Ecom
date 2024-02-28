package com.example.ecommerce.Exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice

public class GlobalException {
    @ExceptionHandler(value = {MethodArgumentTypeMismatchException.class})
    public ResponseEntity<String> catchExceptionTypeMismatch()
    {
        return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not A Valid Request");
    }

@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, String>> myMethodArgumentNotValidException(MethodArgumentNotValidException e) {
    Map<String, String> res = new HashMap<>();

    e.getBindingResult().getAllErrors().forEach(err -> {
        String fieldName = ((FieldError) err).getField();
        String message = err.getDefaultMessage();

        res.put(fieldName, message);
    });

    return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
}

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, String>> myConstraintsVoilationException(ConstraintViolationException e) {
        Map<String, String> res = new HashMap<>();

        e.getConstraintViolations().forEach(voilation -> {
            String fieldName = voilation.getPropertyPath().toString();
            String message = voilation.getMessage();

            res.put(fieldName, message);
        });

        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {HttpRequestMethodNotSupportedException.class, NoResourceFoundException.class})
    public ResponseEntity<String> catchMethodNotAllowed()
    {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("Enter The Right Api Endpoint");
    }
}
