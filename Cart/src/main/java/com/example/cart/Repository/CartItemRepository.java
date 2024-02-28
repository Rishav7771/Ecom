package com.example.cart.Repository;

import com.example.cart.Entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CartItemRepository extends JpaRepository<CartItem,Integer> {

    CartItem findByCart_CartIdAndProductid(Long cartid , String productId);

    CartItem findByCart_CartIdAndCartItemId(Long cartid , Long cartitemid);
    @Modifying
    @Query("delete from cart_item c where c.cart.cartId = ?1 AND c.cartItemId = ?2")
    void deleteCartItemByCartIdAndCartItemId(Long cartid, Long cartitemid);


//    @Query("SELECT ci.product FROM CartItem ci WHERE ci.product.id = ?1")
//    Product findProductById(Long productId);

//    @Modifying
//    @Query("DELETE FROM CartItem ci WHERE ci.cart.id = ?1 AND ci.product.id = ?2")
//    void deleteCartItemByProductIdAndCartId(Long productId, Long cartId);



}
