package com.fintech.backend.dto;

public class AuthRequestDTO{

    private String email;
    private String password;

    // 🔹 Default constructor (required for JSON parsing)
    public AuthRequestDTO() {}

    // 🔹 Parameterized constructor
    public AuthRequestDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // 🔹 Getters & Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}