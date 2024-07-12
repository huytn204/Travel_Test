package com.example.travel_test.reponse;

import com.example.travel_test.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRep extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
