package com.example.products.Repositry;

import com.example.products.Collections.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepositry extends MongoRepository<Review,String> {

}
