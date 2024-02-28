package com.example.ecommerce.Repositry;

import com.example.ecommerce.Entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface AddressRepositry extends JpaRepository<Address,Long> {
    @Query("SELECT u FROM address_details u JOIN FETCH u.user a WHERE a.userId = ?1")
    List<Address> findAllByUserId(Long addressId);
}
