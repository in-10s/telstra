/**
 * 
 */
package com.in10s.request;

import java.io.Serializable;

import com.in10s.enums.UserStatus;

/**
 * @author Abhishek Amar
 *
 */
public class CreateUserRequest implements Serializable {
	private String loginName;
	private String password;
	private String firstName;
	private String middleName;
	private String lastName;
	private String emailId;
	private String phoneNo;
	private String role;
	private String landingPage;
	private String companyName;
	private UserStatus userStatus;
	private String moduleName;
	private Integer userType;
	private Integer id;
	private Integer userId;
	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getLandingPage() {
		return landingPage;
	}

	public void setLandingPage(String landingPage) {
		this.landingPage = landingPage;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public UserStatus getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(UserStatus userStatus) {
		this.userStatus = userStatus;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public Integer getUserType() {
		return userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "CreateUserRequest{" +
				"loginName='" + loginName + '\'' +
				", password='" + password + '\'' +
				", firstName='" + firstName + '\'' +
				", middleName='" + middleName + '\'' +
				", lastName='" + lastName + '\'' +
				", emailId='" + emailId + '\'' +
				", phoneNo='" + phoneNo + '\'' +
				", role='" + role + '\'' +
				", landingPage='" + landingPage + '\'' +
				", companyName='" + companyName + '\'' +
				", userStatus=" + userStatus +
				", moduleName='" + moduleName + '\'' +
				", userType='" + userType + '\'' +
				", id=" + id +
				", userId="+userId+
				'}';
	}
}
