package com.in10s.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="UP_LOGIN_INFO")
public class UpLoginInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer ID;
    private String UP_LOGIN_INFO;
	private String PASSWORD;
	private Integer PARENT_ID;
	private Date PWD_MOD_DATE;
	private String SESSION_ID;
    private String HINT_QUES;
    private String HINT_ANSWER;
    private String PREV_PWDS;
    private Date  LAST_LOGIN;
    private Integer SP_ID;
    private Integer FAIL_COUNT;
    private Integer U_ID;
    private Integer DEPT_ID;
    private Integer DESG_ID;
	private Integer AT_ID;
    private String  FIRST_NAME;
    private String LAST_NAME;
    private String MIDDLE_NAME;
    private String MOBILE_NO;
    private String EMAIL_ID;
    private Integer CREATED_BY;
    private Date CREATED_DATE;
    private Date MODIFIED_DATE;
    private String STATUS;
    private String LOCKED_STATUS;
    private Integer REPORT_HEAD;
    private Integer USER_TYPE;
    private Integer ACCOUNT_HEAD;
    private String ACCOUNT_NO;
	private String THEME_NAME;

    private Integer LGINATTEMPTS;//" NUMBER DEFAULT 0,
    private Integer USER_FLAG;//" NUMBER DEFAULT 1,
    private String EMP_NO;
    private String EMPLOYEE_ID;
    private String GENDER;
    private String OTHER_EMAIL_ID;

    public String getUP_LOGIN_INFO() {
        return UP_LOGIN_INFO;
    }

    public void setUP_LOGIN_INFO(String UP_LOGIN_INFO) {
        this.UP_LOGIN_INFO = UP_LOGIN_INFO;
    }

    public String getPASSWORD() {
        return PASSWORD;
    }

    public void setPASSWORD(String PASSWORD) {
        this.PASSWORD = PASSWORD;
    }

    public Integer getPARENT_ID() {
        return PARENT_ID;
    }

    public void setPARENT_ID(Integer PARENT_ID) {
        this.PARENT_ID = PARENT_ID;
    }

    public Date getPWD_MOD_DATE() {
        return PWD_MOD_DATE;
    }

    public void setPWD_MOD_DATE(Date PWD_MOD_DATE) {
        this.PWD_MOD_DATE = PWD_MOD_DATE;
    }

    public String getSESSION_ID() {
        return SESSION_ID;
    }

    public void setSESSION_ID(String SESSION_ID) {
        this.SESSION_ID = SESSION_ID;
    }

    public String getHINT_QUES() {
        return HINT_QUES;
    }

    public void setHINT_QUES(String HINT_QUES) {
        this.HINT_QUES = HINT_QUES;
    }

    public String getHINT_ANSWER() {
        return HINT_ANSWER;
    }

    public void setHINT_ANSWER(String HINT_ANSWER) {
        this.HINT_ANSWER = HINT_ANSWER;
    }

    public String getPREV_PWDS() {
        return PREV_PWDS;
    }

    public void setPREV_PWDS(String PREV_PWDS) {
        this.PREV_PWDS = PREV_PWDS;
    }

    public Date getLAST_LOGIN() {
        return LAST_LOGIN;
    }

    public void setLAST_LOGIN(Date LAST_LOGIN) {
        this.LAST_LOGIN = LAST_LOGIN;
    }

    public Integer getSP_ID() {
        return SP_ID;
    }

    public void setSP_ID(Integer SP_ID) {
        this.SP_ID = SP_ID;
    }

    public Integer getFAIL_COUNT() {
        return FAIL_COUNT;
    }

    public void setFAIL_COUNT(Integer FAIL_COUNT) {
        this.FAIL_COUNT = FAIL_COUNT;
    }

    public Integer getU_ID() {
        return U_ID;
    }

    public void setU_ID(Integer u_ID) {
        U_ID = u_ID;
    }

    public Integer getDEPT_ID() {
        return DEPT_ID;
    }

    public void setDEPT_ID(Integer DEPT_ID) {
        this.DEPT_ID = DEPT_ID;
    }

    public Integer getDESG_ID() {
        return DESG_ID;
    }

    public void setDESG_ID(Integer DESG_ID) {
        this.DESG_ID = DESG_ID;
    }

    public Integer getAT_ID() {
        return AT_ID;
    }

    public void setAT_ID(Integer AT_ID) {
        this.AT_ID = AT_ID;
    }

    public String getFIRST_NAME() {
        return FIRST_NAME;
    }

    public void setFIRST_NAME(String FIRST_NAME) {
        this.FIRST_NAME = FIRST_NAME;
    }

    public String getLAST_NAME() {
        return LAST_NAME;
    }

    public void setLAST_NAME(String LAST_NAME) {
        this.LAST_NAME = LAST_NAME;
    }

    public String getMIDDLE_NAME() {
        return MIDDLE_NAME;
    }

    public void setMIDDLE_NAME(String MIDDLE_NAME) {
        this.MIDDLE_NAME = MIDDLE_NAME;
    }

    public String getMOBILE_NO() {
        return MOBILE_NO;
    }

    public void setMOBILE_NO(String MOBILE_NO) {
        this.MOBILE_NO = MOBILE_NO;
    }

    public String getEMAIL_ID() {
        return EMAIL_ID;
    }

    public void setEMAIL_ID(String EMAIL_ID) {
        this.EMAIL_ID = EMAIL_ID;
    }

    public Integer getCREATED_BY() {
        return CREATED_BY;
    }

    public void setCREATED_BY(Integer CREATED_BY) {
        this.CREATED_BY = CREATED_BY;
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

    public String getSTATUS() {
        return STATUS;
    }

    public void setSTATUS(String STATUS) {
        this.STATUS = STATUS;
    }

    public String getLOCKED_STATUS() {
        return LOCKED_STATUS;
    }

    public void setLOCKED_STATUS(String LOCKED_STATUS) {
        this.LOCKED_STATUS = LOCKED_STATUS;
    }

    public Integer getREPORT_HEAD() {
        return REPORT_HEAD;
    }

    public void setREPORT_HEAD(Integer REPORT_HEAD) {
        this.REPORT_HEAD = REPORT_HEAD;
    }

    public Integer getUSER_TYPE() {
        return USER_TYPE;
    }

    public void setUSER_TYPE(Integer USER_TYPE) {
        this.USER_TYPE = USER_TYPE;
    }

    public Integer getACCOUNT_HEAD() {
        return ACCOUNT_HEAD;
    }

    public void setACCOUNT_HEAD(Integer ACCOUNT_HEAD) {
        this.ACCOUNT_HEAD = ACCOUNT_HEAD;
    }

    public String getACCOUNT_NO() {
        return ACCOUNT_NO;
    }

    public void setACCOUNT_NO(String ACCOUNT_NO) {
        this.ACCOUNT_NO = ACCOUNT_NO;
    }

    public String getTHEME_NAME() {
        return THEME_NAME;
    }

    public void setTHEME_NAME(String THEME_NAME) {
        this.THEME_NAME = THEME_NAME;
    }

    public Integer getLGINATTEMPTS() {
        return LGINATTEMPTS;
    }

    public void setLGINATTEMPTS(Integer LGINATTEMPTS) {
        this.LGINATTEMPTS = LGINATTEMPTS;
    }

    public Integer getUSER_FLAG() {
        return USER_FLAG;
    }

    public void setUSER_FLAG(Integer USER_FLAG) {
        this.USER_FLAG = USER_FLAG;
    }

    public String getEMP_NO() {
        return EMP_NO;
    }

    public void setEMP_NO(String EMP_NO) {
        this.EMP_NO = EMP_NO;
    }

    public String getEMPLOYEE_ID() {
        return EMPLOYEE_ID;
    }

    public void setEMPLOYEE_ID(String EMPLOYEE_ID) {
        this.EMPLOYEE_ID = EMPLOYEE_ID;
    }

    public String getGENDER() {
        return GENDER;
    }

    public void setGENDER(String GENDER) {
        this.GENDER = GENDER;
    }

    public String getOTHER_EMAIL_ID() {
        return OTHER_EMAIL_ID;
    }

    public void setOTHER_EMAIL_ID(String OTHER_EMAIL_ID) {
        this.OTHER_EMAIL_ID = OTHER_EMAIL_ID;
    }

    public Integer getID() {
        return ID;
    }

    public void setID(Integer ID) {
        this.ID = ID;
    }

    @Override
    public String toString() {
        return "UpLoginInfo{" +
                "ID=" + ID +
                ", UP_LOGIN_INFO='" + UP_LOGIN_INFO + '\'' +
                ", PASSWORD='" + PASSWORD + '\'' +
                ", PARENT_ID=" + PARENT_ID +
                ", PWD_MOD_DATE=" + PWD_MOD_DATE +
                ", SESSION_ID='" + SESSION_ID + '\'' +
                ", HINT_QUES='" + HINT_QUES + '\'' +
                ", HINT_ANSWER='" + HINT_ANSWER + '\'' +
                ", PREV_PWDS='" + PREV_PWDS + '\'' +
                ", LAST_LOGIN=" + LAST_LOGIN +
                ", SP_ID=" + SP_ID +
                ", FAIL_COUNT=" + FAIL_COUNT +
                ", U_ID=" + U_ID +
                ", DEPT_ID=" + DEPT_ID +
                ", DESG_ID=" + DESG_ID +
                ", AT_ID=" + AT_ID +
                ", FIRST_NAME='" + FIRST_NAME + '\'' +
                ", LAST_NAME='" + LAST_NAME + '\'' +
                ", MIDDLE_NAME='" + MIDDLE_NAME + '\'' +
                ", MOBILE_NO='" + MOBILE_NO + '\'' +
                ", EMAIL_ID='" + EMAIL_ID + '\'' +
                ", CREATED_BY=" + CREATED_BY +
                ", CREATED_DATE=" + CREATED_DATE +
                ", MODIFIED_DATE=" + MODIFIED_DATE +
                ", STATUS='" + STATUS + '\'' +
                ", LOCKED_STATUS='" + LOCKED_STATUS + '\'' +
                ", REPORT_HEAD=" + REPORT_HEAD +
                ", USER_TYPE=" + USER_TYPE +
                ", ACCOUNT_HEAD=" + ACCOUNT_HEAD +
                ", ACCOUNT_NO='" + ACCOUNT_NO + '\'' +
                ", THEME_NAME='" + THEME_NAME + '\'' +
                ", LGINATTEMPTS=" + LGINATTEMPTS +
                ", USER_FLAG=" + USER_FLAG +
                ", EMP_NO='" + EMP_NO + '\'' +
                ", EMPLOYEE_ID='" + EMPLOYEE_ID + '\'' +
                ", GENDER='" + GENDER + '\'' +
                ", OTHER_EMAIL_ID='" + OTHER_EMAIL_ID + '\'' +
                '}';
    }
}
