package com.love_your_nuts.services;

import com.love_your_nuts.entities.User;
import java.util.List;

public interface UserService extends Service<User, Integer>{

	public User findById(Integer id);
    List<User> getAll();
    User save(User user);
    
    List<User> findByFirstName(String name);
	
	List<User> findByLastName(String lastName);
	
	User findByEmail(String email);

}
