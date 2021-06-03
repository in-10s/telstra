/**
 * 
 */
package com.in10s.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Abhishek Amar
 *
 */
@Entity
@Table(name = "address")
public class AddressEntity implements Serializable{
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column(name = "customer_permanent_address")
	private String customerPermanentAddress;
	@Column(name = "customer_temprory_address")
	private String customerTemproryAddress;

	@Column(name = "address_id")
	private Integer addressId;
	@Column(name = "pin_no")
	private String pinNo;
	@Column(name = "customer_id")
	private Integer customerId;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

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
		return addressId;
	}

	public void setAddressId(Integer addressId) {
		addressId = addressId;
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
