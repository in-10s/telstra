package com.in10s.exceptionhandler;

public class PlayerNotFoundException extends RuntimeException {

	public PlayerNotFoundException() {
		super();
	}

	public PlayerNotFoundException(String exception) {
		super(exception);
	}
}
