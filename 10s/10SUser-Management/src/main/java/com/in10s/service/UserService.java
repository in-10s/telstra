/**
 * 
 */
package com.in10s.service;

import java.util.List;

import com.in10s.request.CreateUserRequest;
import com.in10s.response.ModuleResponse;
import com.in10s.response.RoleResponse;
import com.in10s.response.UserResponse;

/**
 * @author Abhishek Amar
 *
 */
public interface UserService {
	public CreateUserRequest saveUserDetails(CreateUserRequest userRequest); 
	public List<UserResponse> getAllUserDetails();
	public List<RoleResponse> getAllRole();
	public List<ModuleResponse> getAllModule();
	public UserResponse getEditedUserDetails(Integer id);
	public void deleteById(Integer id);
}
