/**
 * 
 */
package com.in10s.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Abhishek Amar
 *
 */
@Entity
@Table(name = "DC_ACCESS_PERMISSION")
public class DcAccessPermission {
	@Id
	private Integer U_ID;
	private Integer CC_ID;
	private String ACCOUNT_NO;
	private Integer COMPANY_ID;
	private String FLAG;

	public Integer getU_ID() {
		return U_ID;
	}

	public void setU_ID(Integer u_ID) {
		U_ID = u_ID;
	}

	public Integer getCC_ID() {
		return CC_ID;
	}

	public void setCC_ID(Integer cC_ID) {
		CC_ID = cC_ID;
	}

	public String getACCOUNT_NO() {
		return ACCOUNT_NO;
	}

	public void setACCOUNT_NO(String aCCOUNT_NO) {
		ACCOUNT_NO = aCCOUNT_NO;
	}

	public Integer getCOMPANY_ID() {
		return COMPANY_ID;
	}

	public void setCOMPANY_ID(Integer cOMPANY_ID) {
		COMPANY_ID = cOMPANY_ID;
	}

	public String getFLAG() {
		return FLAG;
	}

	public void setFLAG(String fLAG) {
		FLAG = fLAG;
	}

}
