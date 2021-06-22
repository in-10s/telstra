/**
 * 
 */
package com.in10s.controller;

import java.util.Date;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.in10s.exception.CommonExceptions;
import com.in10s.response.Response;
import com.in10s.service.CommonService;

/**
 * @author Abhishek Amar
 *
 */
@RestController
@RequestMapping(value = "/common")
public class CommonController {
	private Logger logger = LogManager.getLogger();
	
	@Autowired
	CommonService commonService;

	@GetMapping("/country/{uId}")
	public ResponseEntity<Object> getCountryList(@PathVariable("uId")Integer uId) {
		try {
			Response response = new Response(commonService.getAllCompanyListByUid(uId), HttpStatus.OK, new Date(), "success");
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			logger.error(":: /country :: getCountryList ::", e);
			throw new CommonExceptions("something went wrong");
		}
	}

	@GetMapping("/landing-page")
	public ResponseEntity<Object> getLandingPageList() {
		try {
			Response response = new Response(null, HttpStatus.OK, new Date(), null);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			logger.error(":: /landing-page :: getLandingPageList ::", e);
			throw new CommonExceptions("something went wrong");
		}
	}
}
