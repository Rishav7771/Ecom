package com.example.ecommerce.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data

@Entity(name = "user_details")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Size(min=2,message = "Name Can't Be Null")
    private String name;
    @Size(min=10,message = "Enter a Valid Phone Number")
    @Size(max = 10)
    private String mobileNumber;
    @Email(message = "Enter a Valid EmailId")
    @Column(unique = true)
    private String email;
    @NotBlank(message = "Password Can't Be Null")
    private String password;
    private boolean isadmin;

    protected User(){}

    public User(Long userId, String name,  String mobileNumber, String email, String password,boolean isadmin ) {
        this.userId = userId;
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.password = password;
        this.isadmin = isadmin;
    }
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Address> addresses;
   // @JoinTable(name = "address_details", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "address_id"))
}

