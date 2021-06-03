/**
 * 
 */
package com.in10s.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.in10s.repository.UserRepository;
import com.in10s.request.CreateUserRequest;
import com.in10s.response.UserResponse;
import com.in10s.service.UserService;
import com.in10s.util.Util;

/**
 * @author Abhishek Amar
 *
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public CreateUserRequest saveUserDetails(CreateUserRequest customer) {
		return customer;
	}

	@Override
	public List<UserResponse> getAllUserDetails() {
		return Util.getDummyUserDetails();
	}
}
