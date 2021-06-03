/**
 * 
 */
package com.in10s.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.in10s.enums.UserType;

/**
 * @author Abhishek Amar
 *
 */
@Entity
@Table(name = "customer")
public class CustomerEntity implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String customerName;
	private String mobileNo;
	private UserType userType;
	private boolean isActive;
	@OneToMany
	@JoinColumn(name = "customer_id")
	@Cascade(CascadeType.ALL)
	private List<AddressEntity> address;
	@OneToMany
	@JoinColumn(name = "customer_id")
	@Cascade(CascadeType.ALL)
	private List<CustomerDocEntity> doc;
	private Date createdDate;
	private Date modifiedDate;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public UserType getCustomerType() {
		return userType;
	}

	public void setCustomerType(UserType userType) {
		this.userType = userType;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public List<AddressEntity> getAddress() {
		return address;
	}

	public void setAddress(List<AddressEntity> address) {
		this.address = address;
	}

	public List<CustomerDocEntity> getDoc() {
		return doc;
	}

	public void setDoc(List<CustomerDocEntity> doc) {
		this.doc = doc;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

}
