package com.love_your_nuts.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.love_your_nuts.entities.UserRoles;
import com.love_your_nuts.services.UserRolesService;

public class UserRolesController {

	@Autowired
	UserRolesService service;

	// find by ID
	@RequestMapping(value = "{userID}", method = RequestMethod.GET)
	public UserRoles findByID(@PathVariable Long userID) 
	{
		return service.readById(userID);
	}
		
	// create
	@RequestMapping(value = "create", method = RequestMethod.POST)
	@ResponseStatus(code = HttpStatus.CREATED)
	public UserRoles create(@RequestBody UserRoles user) 
	{
		return service.create(user);
	}
	
	//update
	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public void update(@RequestBody UserRoles user)
	{
		service.update(user);
	}
	
	// find All
	@RequestMapping(value = "findAll", method = RequestMethod.GET)
	public List<UserRoles> findAll() 
	{
		return service.readAll();
	}

	// delete
	@RequestMapping(value = "delete/{email}", method = {RequestMethod.GET, RequestMethod.DELETE})
	@ResponseStatus(HttpStatus.OK)
	public void deleteUser(@PathVariable("email") String email) 
	{
		UserRoles user = service.findByEmail(email);
		
		if(user != null)
		{
			service.delete(user);
		}
	}
	
	//Find by email
	@RequestMapping(value = "findByEmail/{email}", method = RequestMethod.GET)
	public UserRoles findByEmail(@PathVariable String email)
	{
		return service.findByEmail(email);
	}

}
