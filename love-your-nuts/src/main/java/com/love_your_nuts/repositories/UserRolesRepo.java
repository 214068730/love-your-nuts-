package com.love_your_nuts.repositories;

import org.springframework.data.repository.CrudRepository;

import com.love_your_nuts.entities.UserRoles;

public interface UserRolesRepo extends CrudRepository<UserRoles, Long>  
{
	UserRoles findByUserRoleId(Long id);
	
	UserRoles findByEmailEmail(String user);
}
	
