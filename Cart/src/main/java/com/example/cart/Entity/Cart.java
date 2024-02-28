package com.example.cart.Entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "cart_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    private Double totalPrice = 0.0;

    private Long userid;


    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
//    @JsonIgnore
    private List<CartItem> cartItems = new ArrayList<>();
}
