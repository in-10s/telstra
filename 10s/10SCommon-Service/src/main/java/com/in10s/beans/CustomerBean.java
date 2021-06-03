/**
 * 
 */
package com.in10s.beans;

import com.in10s.enums.CustomerType;

/**
 * @author Abhishek Amar
 *
 */
public class CustomerBean {
	private String customerName;
	private CustomerType customerType;
	private Integer customerId;
	private String mobileNumber;
	private AddressBean address;
	private CustomerDocBean customerDocBean;

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public CustomerType getCustomerType() {
		return customerType;
	}

	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public AddressBean getAddress() {
		return address;
	}

	public void setAddress(AddressBean address) {
		this.address = address;
	}

	public CustomerDocBean getCustomerDocBean() {
		return customerDocBean;
	}

	public void setCustomerDocBean(CustomerDocBean customerDocBean) {
		this.customerDocBean = customerDocBean;
	}

}
