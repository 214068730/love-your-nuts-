package com.love_your_nuts.repositories.repoInterface;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.love_your_nuts.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	List<User> findByFirstName(String name);
	
	List<User> findByLastName(String lastName);
	
    User findByEmail(String email);

}
