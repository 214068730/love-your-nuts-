package com.love_your_nuts.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_roles")
public class UserRoles
{
	@Id
	@GeneratedValue
	private Long userRoleId;
	
//	@OneToOne
//	@JoinColumn(name = "userEmail", referencedColumnName= "userEmail")
	private User email;
	private String role;
	
	public UserRoles() {}
	
	public UserRoles(Long id, User email, String role)
	{
		this.userRoleId = id;
		this.email = email;
		this.role = role;
	}

	public Long getUserRoleId() 
	{
		return userRoleId;
	}

	public void setUserRoleId(Long userRoleId) 
	{
		this.userRoleId = userRoleId;
	}

	public String getRole() 
	{
		return role;
	}

	public void setRole(String role) 
	{
		this.role = role;
	}

	public User getEmail() {
		return email;
	}

	public void setEmail(User email) {
		this.email = email;
	}	
}
