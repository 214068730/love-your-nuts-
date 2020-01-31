package com.love_your_nuts.services.implementation;

import java.util.List;
import com.love_your_nuts.entities.User;
import com.love_your_nuts.entities.UserRoles;
import com.love_your_nuts.repositories.repoInterface.UserRepository;
import com.love_your_nuts.services.UserService;

import java.util.Optional;


public class UserServiceImpl implements UserService{
	
	private UserRepository repository;

    public UserServiceImpl(UserRepository repository){this.repository = repository;}

    @Override
    public User save(User user) { return repository.save(user); }

    @Override
    public User create(User student) {
        student  = this.repository.save(student);
        return student;
    }

    @Override
    public User findById(Integer id) {
    	 Optional<User> optional = repository.findById(id);
         if (optional.isPresent()) {
             return optional.get();
         }
         return null;
    }

    @Override
    public User update(User student) {
        return repository.save(student);
    }

    @Override
	public void delete(User entity) 
	{
		if (entity != null)
		{
			repository.delete(entity);
		}
	}

    @Override
    public List<User> getAll() {
        return repository.findAll();
    }

	@Override
	public User readById(Integer s) {
        return this.repository.findById(s).orElse(null);
    }

	@Override
	public List<User> readAll() {
		return repository.findAll();
	}

	

	
}
