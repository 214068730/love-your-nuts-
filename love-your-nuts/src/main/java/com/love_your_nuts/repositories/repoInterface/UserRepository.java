package com.love_your_nuts.repositories.repoInterface;

import org.springframework.data.jpa.repository.JpaRepository;

import com.love_your_nuts.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>{

}
