/**
 * 
 */
package com.in10s.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.in10s.exception.UserCustomExceptions;
import com.in10s.request.CreateUserRequest;
import com.in10s.service.UserService;

/**
 * @author Abhishek Amar
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping(value = "/user-management")
public class UserManagementController {
	@Value("${user.save.success}")
	private String successMessage;

	@Value("${user.exception.message}")
	private String errorMessage;

	@Value("${user.data.notfound}")
	private String dataNotFoundMessage;

	@Value("${user.wrong.payload}")
	private String somethingWentWrong;
	private Logger logger = LogManager.getLogger();
	
	@Autowired
	private UserService userService;

	/**
	 * saving create-user details from user-management
	 * 
	 * @param request
	 * @return
	 */
	@PostMapping("/save")
	public ResponseEntity<Object> saveUserDetails(@RequestBody CreateUserRequest request) {
		try {
			logger.info(":: /save :: saveUserDetails :: api called with payload ::"+ request);
			userService.saveUserDetails(request);
			return new ResponseEntity<>(request, HttpStatus.OK);
		} catch (Exception e) {
			logger.error(":: /save :: saveUserDetails ::", e);
			throw new UserCustomExceptions(somethingWentWrong);
		}
	}

	/**
	 *
	 * @return
	 */
	@GetMapping("/all-user-details")
	public ResponseEntity<Object> getAllUserDetails() {
		try {  
			logger.info(":: /all-user-details :: getAllUserDetails ::");
			return new ResponseEntity<>(userService.getAllUserDetails(), HttpStatus.OK);
		} catch (Exception e) {
			logger.error(":: /all-user-details :: getAllUserDetails ::", e);
			throw new UserCustomExceptions(somethingWentWrong);
		}
	}

	/***
	 *
	 * @return
	 */
	@GetMapping("roles-list")
	public ResponseEntity<Object> getRole(){
		try{
			logger.info(":: /roles-list :: getRole ::");
			return new ResponseEntity<>(userService.getAllRole(), HttpStatus.OK);
		}catch(Exception e){
			logger.error(":: /roles-list :: getRole ::", e);
			throw new UserCustomExceptions(somethingWentWrong);
		}
	}
	
}
