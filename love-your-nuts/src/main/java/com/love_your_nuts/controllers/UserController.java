package com.love_your_nuts.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.love_your_nuts.entities.User;
import com.love_your_nuts.entities.UserRoles;
import com.love_your_nuts.services.UserRolesService;
import com.love_your_nuts.services.UserService;

public class UserController {

	@Autowired
	UserService service;

	// find by ID
	@RequestMapping(value = "{userID}", method = RequestMethod.GET)
	public User findByID(@PathVariable Integer userID) 
	{
		return service.findById(userID);
	}
		
	// create
	@RequestMapping(value = "create", method = RequestMethod.POST)
	@ResponseStatus(code = HttpStatus.CREATED)
	public User create(@RequestBody User user) 
	{
		return service.create(user);
	}
	
	//update
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody User user)
	{
		service.update(user);
	}
	
	// find All
	@RequestMapping(value = "findAll", method = RequestMethod.GET)
	public List<User> findAll() 
	{
		return service.readAll();
	}

	// delete
	@RequestMapping(value = "delete/{id}", method = {RequestMethod.GET, RequestMethod.DELETE})
	@ResponseStatus(HttpStatus.OK)
	public void deleteUser(@PathVariable("id") Integer id) 
	{
		User user = service.findById(id);
		
		if(user != null)
		{
			service.delete(user);
		}
	}
	
	//Find by id
	@RequestMapping(value = "findById/{id}", method = RequestMethod.GET)
	public User findById(@PathVariable Integer id)
	{
		return service.findById(id);
	}
	
}
