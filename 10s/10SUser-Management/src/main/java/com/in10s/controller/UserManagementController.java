/**
 * 
 */
package com.in10s.controller;

import com.in10s.response.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.in10s.exception.UserCustomExceptions;
import com.in10s.request.CreateUserRequest;
import com.in10s.service.UserService;

import java.util.Date;

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

	@Value("${user.id.not.avaibale}")
	private String invalidIdMessage; 
	private static final Logger logger = Logger.getLogger(UserManagementController.class.getName());
	@Autowired
	private UserService userService;

	/**
	 * saving create-user details from user-management
	 *  to do  as cors issue is there so temp kept put for saving the details
	 * @param request
	 * @return
	 */
	@PutMapping("/save")
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
	@GetMapping("/roles-list")
	public ResponseEntity<Object> getRole(){
		try{
			logger.info(":: /roles-list :: getRole ::");
			return new ResponseEntity<>(userService.getAllRole(), HttpStatus.OK);
		}catch(Exception e){
			logger.error(":: /roles-list :: getRole ::", e);
			throw new UserCustomExceptions(somethingWentWrong);
		}
	}

	/**
	 *
	 * @return
	 */
	@GetMapping("/module-list")
	public ResponseEntity<Object> getModuleList(){
		try{
			logger.info(":: /module-list :: getModuleList ::");
			return new ResponseEntity<>(userService.getAllModule(), HttpStatus.OK);
		}catch(Exception e){
			logger.error(":: /module-list :: getModuleList ::", e);
			throw new UserCustomExceptions(somethingWentWrong);
		}
	}

	/**
	 *
	 * @param id
	 * @return
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Object> getEditedValById(@PathVariable("id") Integer id){
		try{
			logger.info(":: /{id} :: getEditedValById ::");
			return new ResponseEntity<>(userService.getEditedUserDetails(id), HttpStatus.OK);
		}catch(Exception e){
			logger.error(":: /{id} :: getEditedValById ::", e);
			throw new UserCustomExceptions(invalidIdMessage);
		}
	}

	/**
	 *
 	 * @param request
	 * @return
	 */
	/** to do
	 * as cors issue is there , so kept put to delete , leter i need to change this
	 * @param id
	 * @return
	 */
	@GetMapping("/delete/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id")Integer id){
		try{
			logger.info(":: /{id} :: deleteById ::");
			userService.deleteById(id);
			return new ResponseEntity<Object>(new Response(null, HttpStatus.OK,new Date(), "Deleted successfully!!"), HttpStatus.OK);
		}catch(Exception e){
			logger.error(":: /{id}:: deleteById ::", e);
			throw new UserCustomExceptions(invalidIdMessage);
		}
	}
}
