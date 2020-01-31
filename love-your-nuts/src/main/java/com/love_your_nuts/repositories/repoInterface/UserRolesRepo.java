package com.love_your_nuts.repositories.repoInterface;

import org.springframework.data.jpa.repository.JpaRepository;

import com.love_your_nuts.entities.UserRoles;

public interface UserRolesRepo extends JpaRepository<UserRoles, Long>  
{
	UserRoles findByUserRoleId(Long id);
	
	UserRoles findByEmailEmail(String user);
}
	
