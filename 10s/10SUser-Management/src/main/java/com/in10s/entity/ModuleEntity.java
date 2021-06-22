package com.in10s.entity;

import javax.persistence.*;

@Entity
@Table(name="UP_MODULE_MASTER")
public class ModuleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer MR_ID;
	private String MR_NAME;
	private String MODULE_LINK;
	private Integer SUB_MODULES_LENGTH;
    private String SUB_MODULES_INFO;

    public Integer getMR_ID() {
        return MR_ID;
    }

    public void setMR_ID(Integer MR_ID) {
        this.MR_ID = MR_ID;
    }

    public String getMR_NAME() {
        return MR_NAME;
    }

    public void setMR_NAME(String MR_NAME) {
        this.MR_NAME = MR_NAME;
    }

    public String getMODULE_LINK() {
        return MODULE_LINK;
    }

    public void setMODULE_LINK(String MODULE_LINK) {
        this.MODULE_LINK = MODULE_LINK;
    }

    public Integer getSUB_MODULES_LENGTH() {
        return SUB_MODULES_LENGTH;
    }

    public void setSUB_MODULES_LENGTH(Integer SUB_MODULES_LENGTH) {
        this.SUB_MODULES_LENGTH = SUB_MODULES_LENGTH;
    }

    public String getSUB_MODULES_INFO() {
        return SUB_MODULES_INFO;
    }

    public void setSUB_MODULES_INFO(String SUB_MODULES_INFO) {
        this.SUB_MODULES_INFO = SUB_MODULES_INFO;
    }
}

