package com.example.cart.Sevices;

import com.example.cart.Entity.Cart;
import com.example.cart.Entity.CartItem;
import com.example.cart.Repository.CartItemRepository;
import com.example.cart.Repository.CartRepository;
import com.example.cart.Security.JWTFilter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional

@Component
public class CartService {

    @Autowired
    CartRepository cartRepo;

    @Autowired
    CartItemRepository cartItemRepo;
    @Autowired
    JWTFilter jwtFilter;

    public ResponseEntity<?> addProductToCart(Long userid, CartItem cartItem,HttpServletResponse response, HttpServletRequest request) {
        try {
            String email = Logedin(response,request);
            System.out.println(email);
            if(email==null)
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Please Log-In");
            boolean result = cartRepo.existsByUserid(userid);
            if(result==false)
            {
                CartItem newCartItem = new CartItem();
                newCartItem.setQuantity(cartItem.getQuantity());
                newCartItem.setProductPrice(cartItem.getProductPrice());
                newCartItem.setProductid(cartItem.getProductid());
                Cart cart = new Cart();
                cart.setUserid(userid);
                double totalPrice = 0 + (cartItem.getProductPrice() * cartItem.getQuantity());
                cart.setTotalPrice(totalPrice);
                List<CartItem> cartitem = new ArrayList<>();
                cartitem.add(newCartItem);
                cartRepo.save(cart);
                newCartItem.setCart(cart);
                cartItemRepo.save(newCartItem);
                return ResponseEntity.status(HttpStatus.CREATED).body("product added successfully");
            }
            Optional<Cart> cart = cartRepo.findByUserid(userid);
            CartItem Item = cartItemRepo.findByCart_CartIdAndProductid(cart.get().getCartId(), cartItem.getProductid());
            if(Item!=null){

                int quantity = Item.getQuantity() + cartItem.getQuantity();
               Item.setQuantity(Item.getQuantity() + cartItem.getQuantity());
               double Price = cart.get().getTotalPrice()+ (cartItem.getProductPrice() * cartItem.getQuantity());
               cart.get().setTotalPrice(Price);
               return ResponseEntity.status(HttpStatus.CREATED).body("Product Already Exist In The Cart , Product Quantity Updated \n Updated quantity of the product is = "+(quantity));
           }
            CartItem newCartItem = new CartItem();
            newCartItem.setQuantity(cartItem.getQuantity());
            newCartItem.setProductPrice(cartItem.getProductPrice());
            newCartItem.setProductid(cartItem.getProductid());
            double totalPrice = cart.get().getTotalPrice() + (cartItem.getProductPrice() * cartItem.getQuantity());
            Cart newcart = cart.get();
            List<CartItem> cartitem = new ArrayList<>();
            cartitem.add(newCartItem);
            newcart.setCartItems(cartitem);
            newcart.setTotalPrice(totalPrice);
            cartRepo.save(newcart);
            newCartItem.setCart(newcart);
            cartItemRepo.save(newCartItem);
         return ResponseEntity.status(HttpStatus.CREATED).body("Product Added Successfully");
        }catch (Exception e)
        {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    public ResponseEntity<?> getCart( Long userId,HttpServletResponse response, HttpServletRequest request) {
       try
       {
           String email = Logedin(response,request);
           if(email==null)
               return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Please Log-In");
           Optional<Cart> cart = cartRepo.findByUserid(userId);
           if (cart.isEmpty()) {
               return ResponseEntity.status(HttpStatus.OK).body("No Products In The Cart");
           }
           return ResponseEntity.status(HttpStatus.OK).body(cart.get());
       }catch (Exception e)
       {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
       }
    }
    public ResponseEntity<?> updateProductQuantityInCart(Long cartId , CartItem Item,HttpServletResponse response, HttpServletRequest request) {
        try
        {
            String email = Logedin(response,request);
            if(email==null)
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Please Log-In");
            Optional<Cart> cart = cartRepo.findById(cartId);
            if(cart.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Wrong Cart Id");
            CartItem cartItem = cartItemRepo.findByCart_CartIdAndProductid(cartId , Item.getProductid());
            if (cartItem == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product Not Exist");
            }
            if(Item.getQuantity()==0)
            {
                cartItemRepo.deleteCartItemByCartIdAndCartItemId(cartId,cartItem.getCartItemId());
            }
            if(Item.getQuantity()<0)
            {
                if(Item.getQuantity() < (-1*cartItem.getQuantity()))
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Entered Quantity Is More Than The Available Quantity");
                else
                {
                    int quantity = Item.getQuantity()*-1;
                    double cartPrice = cart.get().getTotalPrice() - (cartItem.getProductPrice() * quantity);
                    cart.get().setTotalPrice(cartPrice);
                    cartRepo.save(cart.get());
                    cartItem.setQuantity(cartItem.getQuantity()-quantity);
                    cartItemRepo.save(cartItem);
                    if(cartItem.getQuantity()==0)
                    {
                        cartItemRepo.deleteCartItemByCartIdAndCartItemId(cartId,cartItem.getCartItemId());
                    }
                }
            }
            else
            {
                double cartPrice = cart.get().getTotalPrice() + (cartItem.getProductPrice() * Item.getQuantity());
                cart.get().setTotalPrice(cartPrice);
                cartRepo.save(cart.get());
                cartItem.setQuantity(Item.getQuantity()+cartItem.getQuantity());
                cartItemRepo.save(cartItem);
            }
            return ResponseEntity.ok("Quantity updated");
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");

        }
    }
    public ResponseEntity<?> deleteCart(Long cartid,HttpServletResponse response, HttpServletRequest request)
    {
        try
        {
            String email = Logedin(response,request);
            if(email==null)
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Please Log-In");
            Optional<Cart> cart = cartRepo.findById(cartid);
            if(cart.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Wrong Cart Id");

            cartRepo.deleteById(cartid);
            return ResponseEntity.ok("Cart Deleted");
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    public ResponseEntity<?> checkout(Long userid,HttpServletResponse response, HttpServletRequest request)
    {
        try
        {
            String email = Logedin(response,request);
            if(email==null)
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Please Log-In");
            Optional<Cart> cart = cartRepo.findByUserid(userid);
            if(cart.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nothing To Checkout");
            cartRepo.deleteByUserid(userid);
            return ResponseEntity.ok(cart.get());
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    public String  Logedin (HttpServletResponse response, HttpServletRequest request)
    {
        String email;
        try
        {
             email = jwtFilter.check(request , response);
            if(email==null)
                return null;
        }catch (ServletException ex) {
            return null;
        }catch (Exception e)
        {
            return null;
        }
        return email ;
    }
}
