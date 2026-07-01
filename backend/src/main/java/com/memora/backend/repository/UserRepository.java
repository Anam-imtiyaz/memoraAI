package com.memora.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.memora.backend.model.User;

public interface UserRepository extends JpaRepository<User, String> {

    User findByEmail(String email);

}