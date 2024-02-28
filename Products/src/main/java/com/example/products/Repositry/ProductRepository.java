package com.example.products.Repositry;

import com.example.products.Collections.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface ProductRepository extends MongoRepository<Product,String> {
    //Optional<Product> findBy_id(String _id);
    @Query("{ '_id': ?0 }")
    Product findByProductId(String productId);
    List<Product> findByCategory(String cat);

    boolean existsByCategory(String cat);
}
