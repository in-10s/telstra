/**
 * 
 */
package com.in10s.config;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.in10s.exception.CommonExceptions;
import com.in10s.response.ExceptionsResponse;
import com.in10s.util.StatusConstants;

/**
 * @author Abhishek Amar
 *
 */
@ControllerAdvice
public class CustomizedExceptionHandlerConfig extends ResponseEntityExceptionHandler {
	/**
	 * 
	 * @param request
	 * @param commonExceptions
	 * @return
	 */
	@ExceptionHandler(value = { CommonExceptions.class })
	@ResponseStatus(HttpStatus.NOT_FOUND)
	protected ResponseEntity<Object> handleException(HttpServletRequest request,
			CommonExceptions commonExceptions) {
		ExceptionsResponse exception = new ExceptionsResponse(HttpStatus.NOT_FOUND, commonExceptions.getMessage(),
				new Date(), StatusConstants.NOT_FOUND_CODE);
		return new ResponseEntity<>(exception, HttpStatus.NOT_FOUND);
	}

	/**
	 * 
	 * @param request
	 * @param ex
	 * @return
	 */
	@ExceptionHandler(value = { Exception.class })
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	protected ResponseEntity<Object> handlerOtherException(HttpServletRequest request, Exception ex) {
		ExceptionsResponse exception = new ExceptionsResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(),
				new Date(), StatusConstants.INTERNAL_SERVER_ERROR);
		return new ResponseEntity<>(exception, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
