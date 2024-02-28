package com.example.products.Controller;

import com.example.products.Collections.Product;
import com.example.products.Collections.Review;
import com.example.products.Service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@Valid @RequestBody Product product, HttpServletRequest request, HttpServletResponse response)
    {
        try {
                return productService.addProduct(product,request,response);
            }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    @GetMapping("/all/products")
    public ResponseEntity<?> getAllProducts()
    {
        try
        {
            return productService.getAllProducts();

        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@Valid @PathVariable String id)
    {
        try{

           return productService.getProductById(id);

        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    @GetMapping("/products/category/{cat}")
    public ResponseEntity<?> getProductByCategory(@Valid @PathVariable String cat)
    {
        try
        {
            return productService.getProductByCategory(cat);
        }catch (RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");

        }
    }
    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteProductById(@Valid @PathVariable String productId,HttpServletRequest request, HttpServletResponse response)
    {
        try{
               return productService.deleteProductById(productId,request,response);
            }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<?> updateProduct(@Valid @PathVariable String productId , @RequestBody Product updatedProduct,HttpServletRequest request, HttpServletResponse response)
    {
        try
        {
            return productService.updateProduct(productId,updatedProduct,request,response);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");

        }
    }
    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<?> addReviewToProduct(@Valid @PathVariable String productId, @RequestBody Review review)
    {
        try
        {
            return productService.addReviewToProduct(productId,review);
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
}
