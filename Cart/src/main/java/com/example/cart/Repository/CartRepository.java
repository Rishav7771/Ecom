package com.example.cart.Repository;

import com.example.cart.Entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface CartRepository extends JpaRepository<Cart,Long> {

    boolean existsByUserid(Long userId);
    Optional<Cart> findByUserid(Long userId);
    void deleteByUserid(Long userid);
}
