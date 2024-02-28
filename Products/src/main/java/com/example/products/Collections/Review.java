package com.example.products.Collections;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.Id;
@Data

public class Review {
    @Id
    private String id;
    @Size(min = 2 , message = "name can not be null")
    private String name;
    @Size(min = 1 , max = 5 )
    @NotNull(message = "Rating Can't Be Null")
    private Number rating;
    @NotBlank(message = "Comment Cant't Be Null")
    private String comment;
}
