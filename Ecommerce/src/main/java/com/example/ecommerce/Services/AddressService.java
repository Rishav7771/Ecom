package com.example.ecommerce.Services;

import com.example.ecommerce.Entity.Address;
import com.example.ecommerce.Entity.User;
import com.example.ecommerce.Repositry.AddressRepositry;
import com.example.ecommerce.Repositry.UserRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Component

public class AddressService {
    @Autowired
    AddressRepositry addressRepositry;
    @Autowired
    UserRepositry userRepositry;

    public ResponseEntity<?> addAddress(Address address)
    {
        try {
            addressRepositry.save(address);
            return ResponseEntity.status(HttpStatus.CREATED).body("address Added Successfully");
        }catch (DataIntegrityViolationException e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some Thing Wrong");
        }
    }
    public ResponseEntity<?> getAddress(Long id)
    {
        try{
            List<Address> addresses = addressRepositry.findAllByUserId(id);
            if(addresses.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Address For This User");
            return ResponseEntity.ok(addresses);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some Thing Wrong");

        }
    }
}
