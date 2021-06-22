/**
 * 
 */
package com.in10s.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Abhishek Amar
 *
 */
@Component
public class CustomInterceptor implements HandlerInterceptor {
	private Logger log = LogManager.getLogger(CustomInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		log.info(":: inside custom interceptor :: prehandle :: method ");
		log.info(":: inside custom interceptor :: preHandle :: method " + request.getHeader("Authorization"));
		log.info(":: inside custom interceptor :: preHandle :: method " + request.getHeader("apiKey"));
		//if (request.getHeader("Authorization") != null && request.getHeader("apiKey") != null) {
			return true;
		//} else {
		//	return false;
	    //}
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable ModelAndView modelAndView) throws Exception {
		log.info(" :: ::" + request.getRequestURI());
		log.info(":: inside custom interceptor :: posthandle :: method " + request.getHeader("Authorization"));
		log.info(":: inside custom interceptor :: posthandle :: method " + request.getHeader("apiKey"));
		
	}
}
