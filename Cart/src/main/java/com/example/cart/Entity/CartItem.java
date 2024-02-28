package com.example.cart.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "cart_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;

    @ManyToOne()
    @JsonIgnore
    private Cart cart;
    //@NotBlank(message = "ProductId Can't Be Null")
    private String productid;
    //@Min(value = 1 , message = "Quantity Can't Be 0 or Negetive")
    private Integer quantity;
    //@Min(value = 1 , message = "Price Can't Be 0 or Negetive")
    private double productPrice;
}
