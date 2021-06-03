package com.in10s.response;

import java.util.Date;

import org.springframework.http.HttpStatus;

public class ExceptionsResponse {
	private HttpStatus status;
	private String message;
	private Date timeStamp;
	private String statusCode;

	public ExceptionsResponse(HttpStatus status, String message, Date timeStamp, String statusCode) {
		this.status = status;
		this.message = message;
		this.timeStamp = timeStamp;
		this.statusCode = statusCode;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

}
