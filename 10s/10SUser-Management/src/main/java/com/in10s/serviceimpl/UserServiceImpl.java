/**
 * 
 */
package com.in10s.serviceimpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.in10s.entity.*;
import com.in10s.enums.UserStatus;
import com.in10s.repository.ModuleRepository;
import com.in10s.repository.RoleRepository;
import com.in10s.repository.UpLoginRepository;
import com.in10s.response.ModuleResponse;
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
	@Autowired
	private ModuleRepository moduleRepository;
	@Autowired
	private UpLoginRepository upLoginRepository;
	@Override
	public CreateUserRequest saveUserDetails(CreateUserRequest customer) {
		/* setting values to entity */
		//##################################################
		UpLoginInfo upLoginInfo = new UpLoginInfo();
		upLoginInfo.setUSER_TYPE(customer.getUserType());
		upLoginInfo.setEMAIL_ID(customer.getEmailId());
		upLoginInfo.setEMPLOYEE_ID(customer.getUserId()+"");
		upLoginInfo.setCREATED_DATE(new Date());
		upLoginInfo.setFIRST_NAME(customer.getFirstName());
		upLoginInfo.setLAST_NAME(customer.getLastName());
		upLoginInfo.setMIDDLE_NAME(customer.getMiddleName());
		upLoginInfo.setMOBILE_NO(customer.getPhoneNo());
		upLoginInfo.setPASSWORD(customer.getPassword());

		upLoginInfo.setSTATUS(customer.getUserStatus().name());
		upLoginRepository.save(upLoginInfo);
		//##################################################
		return customer;
	}

	@Override
	public List<UserResponse> getAllUserDetails() {
		List<UserResponse> responseList = new ArrayList<>();
		List<UpLoginInfo> uploginList =upLoginRepository.findAll();
		for(UpLoginInfo info:uploginList){
			UserResponse response = new UserResponse();
			response.setCompanyName("");
			response.setEmailId(info.getEMAIL_ID());
			response.setFirstName(info.getFIRST_NAME());
			response.setLandingPage("");
			response.setLastName(info.getLAST_NAME());
			response.setLoginName(info.getFIRST_NAME());
			response.setMiddleName(info.getMIDDLE_NAME());
			response.setPassword(info.getPASSWORD());
			response.setPhoneNo(info.getMOBILE_NO());
			response.setRole(info.getUSER_TYPE()+"");
			response.setId(info.getID());
			response.setUserStatus(UserStatus.valueOf(info.getSTATUS()));
			responseList.add(response);
		}
		return responseList;
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

	@Override
	public List<ModuleResponse> getAllModule() {
		List<ModuleResponse> moduleList = new ArrayList<>();
		List<Object[]> objList =moduleRepository.getAllModule();
		for(Object [] obj: objList){
			ModuleResponse moduleResponse  = new ModuleResponse();
			moduleResponse.setModuleId(Integer.parseInt(obj[0].toString()));
			moduleResponse.setModuleName(obj[1].toString());
			moduleList.add(moduleResponse);
		}
		return moduleList;
	}

	@Override
	public UserResponse getEditedUserDetails(Integer id) {
		UserResponse response = new UserResponse();
		Optional<UpLoginInfo> uploginList =upLoginRepository.findById(id);
		UpLoginInfo info =uploginList.get();
		response.setCompanyName("");
		response.setEmailId(info.getEMAIL_ID());
		response.setFirstName(info.getFIRST_NAME());
		response.setLandingPage("");
		response.setLastName(info.getLAST_NAME());
		response.setLoginName(info.getFIRST_NAME());
		response.setMiddleName(info.getMIDDLE_NAME());
		response.setPassword(info.getPASSWORD());
		response.setPhoneNo(info.getMOBILE_NO());
		response.setRole(info.getUSER_TYPE()+"");
		response.setId(info.getU_ID());
		response.setUserStatus(UserStatus.valueOf(info.getSTATUS()));

		return response;
	}

	@Override
	public void deleteById(Integer id) {
		upLoginRepository.deleteById(id);
	}

}
