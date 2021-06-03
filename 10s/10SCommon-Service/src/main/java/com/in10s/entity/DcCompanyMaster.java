/**
 * 
 */
package com.in10s.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Abhishek Amar
 *
 */
@Entity
@Table(name = "DC_COMPANY_MASTER")
public class DcCompanyMaster {
	@Id
	private Integer COMPANY_ID;
	private String COMPANY_NAME;
	private String COPANY_ADDRESS;
	private String EMAIL_ADDRESS;
	private String STREET_ADDRESS;
	private String CITY;
	private String PROVINCE;
	private Integer COMPANY_STATUS;
	private Integer TAX_HELD;
	private String ALIAS_NAME;
	private String U_ID;
	private Date CREATED_DATE;
	private Integer COUNTRY_ID;
	private Date MODIFIED_DATE;

	public Integer getCOMPANY_ID() {
		return COMPANY_ID;
	}

	public void setCOMPANY_ID(Integer cOMPANY_ID) {
		COMPANY_ID = cOMPANY_ID;
	}

	public String getCOMPANY_NAME() {
		return COMPANY_NAME;
	}

	public void setCOMPANY_NAME(String cOMPANY_NAME) {
		COMPANY_NAME = cOMPANY_NAME;
	}

	public String getCOPANY_ADDRESS() {
		return COPANY_ADDRESS;
	}

	public void setCOPANY_ADDRESS(String cOPANY_ADDRESS) {
		COPANY_ADDRESS = cOPANY_ADDRESS;
	}

	public String getEMAIL_ADDRESS() {
		return EMAIL_ADDRESS;
	}

	public void setEMAIL_ADDRESS(String eMAIL_ADDRESS) {
		EMAIL_ADDRESS = eMAIL_ADDRESS;
	}

	public String getSTREET_ADDRESS() {
		return STREET_ADDRESS;
	}

	public void setSTREET_ADDRESS(String sTREET_ADDRESS) {
		STREET_ADDRESS = sTREET_ADDRESS;
	}

	public String getCITY() {
		return CITY;
	}

	public void setCITY(String cITY) {
		CITY = cITY;
	}

	public String getPROVINCE() {
		return PROVINCE;
	}

	public void setPROVINCE(String pROVINCE) {
		PROVINCE = pROVINCE;
	}

	public Integer getCOMPANY_STATUS() {
		return COMPANY_STATUS;
	}

	public void setCOMPANY_STATUS(Integer cOMPANY_STATUS) {
		COMPANY_STATUS = cOMPANY_STATUS;
	}

	public Integer getTAX_HELD() {
		return TAX_HELD;
	}

	public void setTAX_HELD(Integer tAX_HELD) {
		TAX_HELD = tAX_HELD;
	}

	public String getALIAS_NAME() {
		return ALIAS_NAME;
	}

	public void setALIAS_NAME(String aLIAS_NAME) {
		ALIAS_NAME = aLIAS_NAME;
	}

	public String getU_ID() {
		return U_ID;
	}

	public void setU_ID(String u_ID) {
		U_ID = u_ID;
	}

	public Date getCREATED_DATE() {
		return CREATED_DATE;
	}

	public void setCREATED_DATE(Date cREATED_DATE) {
		CREATED_DATE = cREATED_DATE;
	}

	public Integer getCOUNTRY_ID() {
		return COUNTRY_ID;
	}

	public void setCOUNTRY_ID(Integer cOUNTRY_ID) {
		COUNTRY_ID = cOUNTRY_ID;
	}

	public Date getMODIFIED_DATE() {
		return MODIFIED_DATE;
	}

	public void setMODIFIED_DATE(Date mODIFIED_DATE) {
		MODIFIED_DATE = mODIFIED_DATE;
	}

}
