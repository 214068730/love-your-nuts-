package com.love_your_nuts.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue
	private Integer userId;
	
	@GeneratedValue
	private Long sessionId;
	
	private String userFirstName,userLastName,userEmail, userStory;
	private int userAge;
	
	public User() {
	}
	
	public User(Integer userId, Long sessionId, String userFirstName, String userLastName, String userEmail,
			String userStory, int userAge) {
		super();
		this.userId = userId;
		this.sessionId = sessionId;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userEmail = userEmail;
		this.userStory = userStory;
		this.userAge = userAge;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Long getSessionId() {
		return sessionId;
	}
	public void setSessionId(Long sessionId) {
		this.sessionId = sessionId;
	}
	public String getUserFirstName() {
		return userFirstName;
	}
	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}
	public String getUserLastName() {
		return userLastName;
	}
	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserStory() {
		return userStory;
	}
	public void setUserStory(String userStory) {
		this.userStory = userStory;
	}
	public int getUserAge() {
		return userAge;
	}
	public void setUserAge(int userAge) {
		this.userAge = userAge;
	}
	@Override
	public String toString() {
		return "User [userId=" + userId + ", sessionId=" + sessionId + ", userFirstName=" + userFirstName
				+ ", userLastName=" + userLastName + ", userEmail=" + userEmail + ", userStory=" + userStory
				+ ", userAge=" + userAge + "]";
	}
	
	
	
	
	
	

}
