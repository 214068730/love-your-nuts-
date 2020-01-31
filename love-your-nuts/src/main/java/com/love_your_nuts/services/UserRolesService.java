package com.love_your_nuts.services;

import com.love_your_nuts.entities.UserRoles;

public interface UserRolesService extends Service<UserRoles, Long>
{	
	UserRoles findByEmail(String user);
}
