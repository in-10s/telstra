/**
 * 
 */
package com.in10s.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author Abhishek Amar
 *
 */
@Component
public class CustomWebSecurityConfig extends WebMvcConfigurerAdapter {

	private Logger log = LogManager.getLogger(CustomWebSecurityConfig.class);
	@Autowired
	private CustomInterceptor customInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		log.info(":: inside CustomWebSecurityConfig :: interceptor :: addInterceptor :: method:: ");
		registry.addInterceptor(customInterceptor);
	}
}
