/**
 * 
 */
package com.in10s.response;

import java.util.Date;

import org.springframework.http.HttpStatus;

/**
 * @author Abhishek Amar
 *
 */
public class Response {
	private Object data;
	private HttpStatus status;
	private Date timeStamp;
	private String message;

	public Response(Object data, HttpStatus status, Date timeStamp, String message) {
		this.data = data;
		this.status = status;
		this.timeStamp = timeStamp;
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
