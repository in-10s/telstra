/**
 * 
 */
package com.in10s.response;

import org.springframework.http.HttpStatus;

import com.in10s.enums.ProjectModule;

/**
 * @author Abhishek Amar
 *
 */
public class ApiResponse {
	private HttpStatus code;
	private String message;
	private String token;
	private boolean readAccess;
	private boolean writeAccess;
	private boolean updateAccess;
	private boolean deleteAccess;
	private Object data; 
	private ProjectModule[] moduleAccess;
	private int limit;
	private int offSet;

	public ApiResponse(HttpStatus code, String message, Object data, String token) {
		this.code = code;
		this.message = message;
		this.data = data;
		this.token = token;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getOffSet() {
		return offSet;
	}

	public void setOffSet(int offSet) {
		this.offSet = offSet;
	}

	public HttpStatus getCode() {
		return code;
	}

	public void setCode(HttpStatus code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public boolean isReadAccess() {
		return readAccess;
	}

	public void setReadAccess(boolean readAccess) {
		this.readAccess = readAccess;
	}

	public boolean isWriteAccess() {
		return writeAccess;
	}

	public void setWriteAccess(boolean writeAccess) {
		this.writeAccess = writeAccess;
	}

	public boolean isUpdateAccess() {
		return updateAccess;
	}

	public void setUpdateAccess(boolean updateAccess) {
		this.updateAccess = updateAccess;
	}

	public boolean isDeleteAccess() {
		return deleteAccess;
	}

	public void setDeleteAccess(boolean deleteAccess) {
		this.deleteAccess = deleteAccess;
	}

	public ProjectModule[] getModuleAccess() {
		return moduleAccess;
	}

	public void setModuleAccess(ProjectModule[] moduleAccess) {
		this.moduleAccess = moduleAccess;
	}

}
