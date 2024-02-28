package com.example.ecommerce.Controllers;

import com.example.ecommerce.Entity.Address;
import com.example.ecommerce.Services.AddressService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AddressControler {

    @Autowired
    AddressService addressService;
    @PostMapping("/address")
    public ResponseEntity<?> addAddress(@Valid @RequestBody Address address)
    {
        try
        {
            return addressService.addAddress(address);
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");

        }
    }
    @GetMapping("/user/address/{id}")
    public ResponseEntity<?> getAddress(@Valid @PathVariable long id)
    {

        try{
            return addressService.getAddress(id);
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");

        }
    }
}
