/**
 * 
 */
package com.in10s.exceptionhandler;

import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.in10s.response.ExceptionResponse;

/**
 * @author Abhishek Amar
 *
 */
@RestController
@ControllerAdvice
public class CustomisedExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(PlayerNotFoundException.class)
	protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		ExceptionResponse response = new ExceptionResponse(ex.getMessage(), HttpStatus.ACCEPTED, new Date());
		return new ResponseEntity<>(response, HttpStatus.NOT_IMPLEMENTED);
	}

	@ExceptionHandler(Exception.class)
	protected ResponseEntity<Object> allException(HttpRequestMethodNotSupportedException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		ExceptionResponse response = new ExceptionResponse(ex.getMessage(), HttpStatus.NOT_ACCEPTABLE, new Date());
		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}
}
