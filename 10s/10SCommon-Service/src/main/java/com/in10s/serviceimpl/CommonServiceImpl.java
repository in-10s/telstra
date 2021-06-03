/**
 * 
 */
package com.in10s.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.in10s.entity.DcCompanyMaster;
import com.in10s.repository.CountryRepository;
import com.in10s.service.CommonService;

/**
 * @author Abhishek Amar
 *
 */
@Service
public class CommonServiceImpl implements CommonService {
	@Autowired
	CountryRepository countryRepository;

	@Override
	public List<DcCompanyMaster> getAllCompanyListByUid(Integer uId) {
		return countryRepository.getCompanyList(uId);
	}

}
