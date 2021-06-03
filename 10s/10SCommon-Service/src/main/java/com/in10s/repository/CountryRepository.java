/**
 * 
 */
package com.in10s.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.in10s.entity.DcCompanyMaster;

/**
 * @author Abhishek Amar
 * @param <T>
 *
 */
@Repository
public interface CountryRepository extends JpaRepository<DcCompanyMaster, Integer> {
	/**
	 * selecting the company details by uid *
	 */
	@Query("SELECT DISTINCT A.COMPANY_ID,B.COMPANY_NAME FROM DcAccessPermission A JOIN DcCompanyMaster B ON A.COMPANY_ID=B.COMPANY_ID WHERE A.U_ID=?1")
	List<DcCompanyMaster> getCompanyList(Integer uId);
}
