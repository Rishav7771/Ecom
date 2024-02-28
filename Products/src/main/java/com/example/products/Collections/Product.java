package com.example.products.Collections;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "Product")
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    private String id;
    @Size(min = 2,message = "name can not be null")
    @NotBlank
    private String name;
    private ArrayList<String> image;
    @NotBlank(message = "Brand Name Can't Be Null")
    private String brand;
    @NotBlank(message = "Product Description Can't Be Null")
    private String description;
    private Number rating = 0;
    private Number numReviews = 0;
    @NotNull
    @Min(value = 1 ,message = "Price Can't Be 0 or Negative")
    private Double price;
    @NotBlank(message = "Category Can't Be Null")
    private String category;
    @NotNull(message = "Quantity Can't Be 0 or Negative")
    @Min(value = 1)
    private int quantity;

    @DBRef
    private  List<Review> reviews = new ArrayList<>();
}
