/**
 * 
 */
package com.in10s.beans;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import com.in10s.enums.DocType;

/**
 * @author Abhishek Amar
 *
 */
public class CustomerDocBean {
	private MultipartFile file;
	private Integer customerId;
	private DocType docType;
	private Date createdDate;
	private Date modifiedDate;

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public DocType getDocType() {
		return docType;
	}

	public void setDocType(DocType docType) {
		this.docType = docType;
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
