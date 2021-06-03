/**
 * 
 */
package com.in10s.service;

import java.util.List;

import com.in10s.entity.DcCompanyMaster;

/**
 * @author Abhishek Amar
 *
 */
public interface CommonService {
	List<DcCompanyMaster> getAllCompanyListByUid(Integer uId);
}
