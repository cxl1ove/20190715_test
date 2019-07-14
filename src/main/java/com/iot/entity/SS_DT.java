package com.iot.entity;



public class SS_DT {
	private String IN_ID;
	private Integer NTID;
	private Integer SBNTID;
	private Integer NDPHDR;
	private String SNSR_INRID;
	private Integer DTITMID;
	private String MSGID;
	private Float MSGVL;
	private String DTM;
	
	
	public SS_DT() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SS_DT(String iN_ID, Integer nTID, Integer sBNTID, Integer nDPHDR, String sNSR_INRID, Integer dTITMID,
			String mSGID, Float mSGVL, String dTM) {
		super();
		IN_ID = iN_ID;
		NTID = nTID;
		SBNTID = sBNTID;
		NDPHDR = nDPHDR;
		SNSR_INRID = sNSR_INRID;
		DTITMID = dTITMID;
		MSGID = mSGID;
		MSGVL = mSGVL;
		DTM = dTM;
	}
	public String getIN_ID() {
		return IN_ID;
	}
	public void setIN_ID(String iN_ID) {
		IN_ID = iN_ID;
	}
    
	public Integer getNTID() {
		return NTID;
	}
	public void setNTID(Integer nTID) {
		NTID = nTID;
	}
	public Integer getSBNTID() {
		return SBNTID;
	}
	public void setSBNTID(Integer sBNTID) {
		SBNTID = sBNTID;
	}
	public Integer getNDPHDR() {
		return NDPHDR;
	}
	public void setNDPHDR(Integer nDPHDR) {
		NDPHDR = nDPHDR;
	}
	public String getSNSR_INRID() {
		return SNSR_INRID;
	}
	public void setSNSR_INRID(String sNSR_INRID) {
		SNSR_INRID = sNSR_INRID;
	}
	public Integer getDTITMID() {
		return DTITMID;
	}
	public void setDTITMID(Integer dTITMID) {
		DTITMID = dTITMID;
	}
	public String getMSGID() {
		return MSGID;
	}
	public void setMSGID(String mSGID) {
		MSGID = mSGID;
	}
	public Float getMSGVL() {
		return MSGVL;
	}
	public void setMSGVL(Float mSGVL) {
		MSGVL = mSGVL;
	}
	public String getDTM() {
		return DTM;
	}
	public void setDTM(String dTM) {
		DTM = dTM;
	}
	
	
	

}
