/**
 * 
 */
package com.in10s.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import com.in10s.repository.RoleRepository;
import com.in10s.response.RoleResponse;
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
	@Autowired
	private RoleRepository roleRepository;
	@Override
	public CreateUserRequest saveUserDetails(CreateUserRequest customer) {
		return customer;
	}

	@Override
	public List<UserResponse> getAllUserDetails() {
		return Util.getDummyUserDetails();
	}

	@Override
	public List<RoleResponse> getAllRole() {
		List<RoleResponse> roleList = new ArrayList<>();
		List<Object[]> objList =roleRepository.findRoleIdAndRoleName();
		for(Object [] obj: objList){
			RoleResponse roleResponseObj  = new RoleResponse();
			roleResponseObj.setRoleId(Integer.parseInt(obj[0].toString()));
			roleResponseObj.setRoleName(obj[1].toString());
			roleList.add(roleResponseObj);
		}
		return roleList;
	}
}
