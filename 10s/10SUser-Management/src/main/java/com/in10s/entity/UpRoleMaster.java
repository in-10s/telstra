package com.in10s.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="UP_ROLE_MASTER")
public class UpRoleMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer ROLE_ID;
    private String ROLE_NAME;
    private String ROLE_DESC;
    private String MOD_TEMP_ID;
    private String MOD_ROLE_ID;
    private Integer TYPE ;
    private Date CREATED_DATE;
    private Date MODIFIED_DATE;
    private Integer U_ID;
    private Integer ROLE_TYPE;
    private String SOL_ID;

    public Integer getROLE_ID() {
        return ROLE_ID;
    }

    public void setROLE_ID(Integer ROLE_ID) {
        this.ROLE_ID = ROLE_ID;
    }

    public String getROLE_NAME() {
        return ROLE_NAME;
    }

    public void setROLE_NAME(String ROLE_NAME) {
        this.ROLE_NAME = ROLE_NAME;
    }

    public String getROLE_DESC() {
        return ROLE_DESC;
    }

    public void setROLE_DESC(String ROLE_DESC) {
        this.ROLE_DESC = ROLE_DESC;
    }

    public String getMOD_TEMP_ID() {
        return MOD_TEMP_ID;
    }

    public void setMOD_TEMP_ID(String MOD_TEMP_ID) {
        this.MOD_TEMP_ID = MOD_TEMP_ID;
    }

    public String getMOD_ROLE_ID() {
        return MOD_ROLE_ID;
    }

    public void setMOD_ROLE_ID(String MOD_ROLE_ID) {
        this.MOD_ROLE_ID = MOD_ROLE_ID;
    }

    public Integer getTYPE() {
        return TYPE;
    }

    public void setTYPE(Integer TYPE) {
        this.TYPE = TYPE;
    }

    public Date getCREATED_DATE() {
        return CREATED_DATE;
    }

    public void setCREATED_DATE(Date CREATED_DATE) {
        this.CREATED_DATE = CREATED_DATE;
    }

    public Date getMODIFIED_DATE() {
        return MODIFIED_DATE;
    }

    public void setMODIFIED_DATE(Date MODIFIED_DATE) {
        this.MODIFIED_DATE = MODIFIED_DATE;
    }

    public Integer getU_ID() {
        return U_ID;
    }

    public void setU_ID(Integer u_ID) {
        U_ID = u_ID;
    }

    public Integer getROLE_TYPE() {
        return ROLE_TYPE;
    }

    public void setROLE_TYPE(Integer ROLE_TYPE) {
        this.ROLE_TYPE = ROLE_TYPE;
    }

    public String getSOL_ID() {
        return SOL_ID;
    }

    public void setSOL_ID(String SOL_ID) {
        this.SOL_ID = SOL_ID;
    }

    @Override
    public String toString() {
        return "UpRoleMaster{" +
                "ROLE_ID=" + ROLE_ID +
                ", ROLE_NAME='" + ROLE_NAME + '\'' +
                ", ROLE_DESC='" + ROLE_DESC + '\'' +
                ", MOD_TEMP_ID='" + MOD_TEMP_ID + '\'' +
                ", MOD_ROLE_ID='" + MOD_ROLE_ID + '\'' +
                ", TYPE=" + TYPE +
                ", CREATED_DATE=" + CREATED_DATE +
                ", MODIFIED_DATE=" + MODIFIED_DATE +
                ", U_ID=" + U_ID +
                ", ROLE_TYPE=" + ROLE_TYPE +
                ", SOL_ID='" + SOL_ID + '\'' +
                '}';
    }
}
