/**
 * 
 */
package com.in10s.beans;

/**
 * @author Abhishek Amar
 *
 */
public class AddressBean {
	private String customerPermanentAddress;
	private String customerTemproryAddress;
	private Integer AddressId;
	private String pinNo;
	private Integer customerId;
	
	public String getCustomerPermanentAddress() {
		return customerPermanentAddress;
	}

	public void setCustomerPermanentAddress(String customerPermanentAddress) {
		this.customerPermanentAddress = customerPermanentAddress;
	}

	public String getCustomerTemproryAddress() {
		return customerTemproryAddress;
	}

	public void setCustomerTemproryAddress(String customerTemproryAddress) {
		this.customerTemproryAddress = customerTemproryAddress;
	}

	public Integer getAddressId() {
		return AddressId;
	}

	public void setAddressId(Integer addressId) {
		AddressId = addressId;
	}

	public String getPinNo() {
		return pinNo;
	}

	public void setPinNo(String pinNo) {
		this.pinNo = pinNo;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

}
