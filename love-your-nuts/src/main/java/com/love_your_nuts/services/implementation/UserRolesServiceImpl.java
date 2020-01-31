package com.love_your_nuts.services.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.love_your_nuts.entities.UserRoles;
import com.love_your_nuts.repositories.UserRolesRepo;
import com.love_your_nuts.services.UserRolesService;

@Service
public  class UserRolesServiceImpl implements UserRolesService 
{

	@Autowired
	private UserRolesRepo repo;

	@Override
	public UserRoles create(UserRoles entity)
	{
		UserRoles user = repo.findByUserRoleId(entity.getUserRoleId());
		
		if(user == null)
		{
			return repo.save(entity);
		}
		else
		{
			return null;
		}
		
	}
 
	@Override
	public void delete(UserRoles entity) 
	{
		if (entity != null)
		{
			repo.delete(entity);
		}
	}

	@Override
	public UserRoles readById(Long id) 
	{
		UserRoles user = repo.findByUserRoleId(id);
		
		if (user == null)
		{
			return null;
		}
		else
		{	
			return user;
		}
	}

	@Override
	public UserRoles update(UserRoles entity) 
	{
		UserRoles user = repo.findByUserRoleId(entity.getUserRoleId());
		
		if (user == null)
		{
			return null;
		}
		else
		{
			return repo.save(entity);
		}
	}

	@Override
	public List<UserRoles> readAll() {
		List<UserRoles> userRoleList = new ArrayList<UserRoles>();
		Iterable<UserRoles> userRoles = repo.findAll();
		for (UserRoles userRole : userRoles)
		{
			userRoleList.add(userRole);
		}
		return userRoleList;

	}

	@Override
	public UserRoles findByEmail(String user) 
	{
		UserRoles userR = repo.findByEmailEmail(user);
		
		if(userR == null)
		{
			return null;
		}
		else
		{
			return userR;
		}
	}
}
