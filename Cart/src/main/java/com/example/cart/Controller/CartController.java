package com.example.cart.Controller;
import com.example.cart.Entity.CartItem;
import com.example.cart.Sevices.CartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("cart/{userid}")
    public ResponseEntity<?> addProductToCart(@Valid @PathVariable Long userid, @RequestBody CartItem cartItem, HttpServletResponse response, HttpServletRequest request) {
        try
        {
           return cartService.addProductToCart(userid , cartItem,response,request);
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("get-cart/{userId}")
    public ResponseEntity<?> getCartById(@Valid @PathVariable Long userId,HttpServletResponse response, HttpServletRequest request) {
        try {
            return cartService.getCart(userId,response,request);
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PutMapping("carts/{cartId}")
    public ResponseEntity<?> updateCartProduct(@Valid @PathVariable Long cartId , @RequestBody CartItem cartItem,HttpServletResponse response, HttpServletRequest request) {
       try
       {
           return cartService.updateProductQuantityInCart(cartId , cartItem,response,request);
       }catch (Exception e)
       {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
       }
    }
    @DeleteMapping("delete-cart/{cartid}")
    public ResponseEntity<?> deleteCart(@PathVariable Long cartid,HttpServletResponse response, HttpServletRequest request)
    {
        try
        {
            return cartService.deleteCart(cartid,response,request);
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("checkout/{userid}")
    public ResponseEntity<?> checkout(@Valid @PathVariable Long userid,HttpServletResponse response, HttpServletRequest request)
    {
        try
        {
            return cartService.checkout(userid,response,request);
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
