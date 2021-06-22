/**
 * 
 */
package com.in10s.util;

import java.util.ArrayList;
import java.util.List;

import com.in10s.enums.UserStatus;
import com.in10s.response.UserResponse;

/**
 * @author Abhishek Amar
 *
 */
public class Util {
	public static List<UserResponse> getDummyUserDetails() {
		List<UserResponse> responseList = new ArrayList<>();
		UserResponse response = new UserResponse();
		response.setCompanyName("in10s");
		response.setEmailId("abhishek.a@abc.com");
		response.setFirstName("Amar");
		response.setLandingPage("xyz");
		response.setLastName("Kumar");
		response.setLoginName("Abhi");
		response.setMiddleName("-");
		response.setPassword("pwd");
		response.setPhoneNo("9876656569");
		response.setRole("ADMIN");
		response.setId(100);
		response.setUserStatus(UserStatus.ACTIVE);
		responseList.add(response);
		return responseList;
	}
}
