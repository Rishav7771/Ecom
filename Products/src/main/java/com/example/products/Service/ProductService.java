package com.example.products.Service;

import com.example.products.Collections.Product;
import com.example.products.Collections.Review;
import com.example.products.Repositry.ProductRepository;
import com.example.products.Repositry.ReviewRepositry;
import com.example.products.Security.JWTFilters;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    ReviewRepositry reviewRepositry;

    @Autowired
    JWTFilters jwtFilters;

    public ResponseEntity<?> addProduct(Product product,HttpServletRequest request, HttpServletResponse response)
    {
        try {
            String role = isAdmin(response, request);
            if (role.equals("admin")) {
                productRepository.save(product);
            } else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User Is Not Authorized for the activity");
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    public ResponseEntity<?> getAllProducts()
    {
        try {
            List<Product> products = productRepository.findAll();
            if(products.isEmpty())
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Products In The List");
            return ResponseEntity.ok(products);
        }
        catch (Exception e)
        {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    public ResponseEntity<?> getProductById(String id)
    {
        try{
            Product product = productRepository.findByProductId(id);
            if(product==null)
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product Not Found");
            }
            return ResponseEntity.ok(product);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server Error");

        }
    }

    public ResponseEntity<?> getProductByCategory(String cat)
    {
        try {
             List<Product> products = new ArrayList<>();
            boolean present = productRepository.existsByCategory(cat);
               if(present==true)
               {
                   products = productRepository.findByCategory(cat);
                   if(products.isEmpty())
                       return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Products In The Given Category");
               }
               else
                   return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category Not Exist");
            return ResponseEntity.ok(products);
        }catch (Exception a)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server Error");
        }
    }
    public ResponseEntity<?> deleteProductById(String productId, HttpServletRequest request, HttpServletResponse response)
    {
        try
        {
            String role = isAdmin(response,request);
            if(role.equals("admin"))
            {
                if(productRepository.existsById(productId))
                {
                    productRepository.deleteById(productId);
                }
                else
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product With This Id Not Exist");
            }
            else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User Is Not Authorized for this activity");
            return ResponseEntity.status(HttpStatus.OK).body("Producted Deleted Successfully");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server Error");
        }
    }
    public ResponseEntity<?> updateProduct(String productId , Product updatedProduct,HttpServletRequest request, HttpServletResponse response)
    {
        try
        {
            String role = isAdmin(response,request);
            if(role.equals("admin"))
            {
                if(productRepository.existsById(productId))
                {
                    Optional<Product> product = productRepository.findById(productId);
                    Product existingProduct = product.get();
                    if(updatedProduct.getName()!=null)
                        existingProduct.setName(updatedProduct.getName());
                    if(updatedProduct.getBrand()!=null)
                        existingProduct.setBrand(updatedProduct.getBrand());
                    if(updatedProduct.getImage()!=null)
                        existingProduct.setImage(updatedProduct.getImage());
                    if(updatedProduct.getDescription()!=null)
                        existingProduct.setDescription(updatedProduct.getDescription());
                    if(updatedProduct.getCategory()!=null)
                        existingProduct.setCategory(updatedProduct.getCategory());
                    if(updatedProduct.getQuantity()>0)
                        existingProduct.setQuantity(updatedProduct.getQuantity());
                    if(updatedProduct.getPrice()!=null)
                        existingProduct.setPrice(updatedProduct.getPrice());
                    updatedProduct.setId(productId);
                    productRepository.save(existingProduct);
                }
                else
                   return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product Not Found");
            }
            else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User Is Not Authorized for this activity");

            return ResponseEntity.ok("Product Updated ");
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server Error");
        }
    }

    public ResponseEntity<?> addReviewToProduct(String productId , Review review)
    {
       try
       {
           Optional<Product> product = productRepository.findById(productId);
           if(product.isEmpty())
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product Doesn't Exist");
           Number previousRating = product.get().getRating();
           Number currentNumberOfReviews = product.get().getReviews().size();
           Number newRating = ((previousRating.doubleValue() * currentNumberOfReviews.doubleValue())+ review.getRating().doubleValue())/(currentNumberOfReviews.doubleValue()+1);
           product.get().setRating(newRating);
           product.get().setNumReviews(currentNumberOfReviews.doubleValue()+1);

           Review newReview = new Review();
           newReview.setName(review.getName());
           newReview.setRating(review.getRating());
           newReview.setComment(review.getComment());

           newReview = reviewRepositry.save(newReview);

           product.get().getReviews().add(newReview);
           productRepository.save(product.get());
           return ResponseEntity.ok("Review Added ");
       }
       catch (Exception e)
       {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server Error");
       }
    }
    public String isAdmin(HttpServletResponse response, HttpServletRequest request)
    {

        try{
            String role = jwtFilters.check(request, response);
            if(role.equals("admin"))
                return role;
        }catch (ServletException ex) {
            throw new RuntimeException(ex);
        }catch (Exception e)
        {
            return e.getMessage();
        }
        return null;
    }
}
