package com.iot.entity;

public class Node {
	private String NODEINRID;
	private Integer NODEID;
	private Integer NDPHDR;
	private Integer NTID;
	private Integer SBNTID;
	private Float LCTN_X;
	private Float LCTN_Y;
	private Integer NDTP;
	private String NDDSPT;
	private Integer TRSMTPWR;
	private String PRDCR;
	private String VSN;
	private String MEMO;
	private String SNSRS;
	
	
	public Node() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Node(String nODEINRID, Integer nODEID, Integer nDPHDR, Integer nTID, Integer sBNTID, Float lCTN_X,
			Float lCTN_Y, Integer nDTP, String nDDSPT, Integer tRSMTPWR, String pRDCR, String vSN, String mEMO,
			String sNSRS) {
		super();
		NODEINRID = nODEINRID;
		NODEID = nODEID;
		NDPHDR = nDPHDR;
		NTID = nTID;
		SBNTID = sBNTID;
		LCTN_X = lCTN_X;
		LCTN_Y = lCTN_Y;
		NDTP = nDTP;
		NDDSPT = nDDSPT;
		TRSMTPWR = tRSMTPWR;
		PRDCR = pRDCR;
		VSN = vSN;
		MEMO = mEMO;
		SNSRS = sNSRS;
	}
	public String getNODEINRID() {
		return NODEINRID;
	}
	public void setNODEINRID(String nODEINRID) {
		NODEINRID = nODEINRID;
	}
	public Integer getNODEID() {
		return NODEID;
	}
	public void setNODEID(Integer nODEID) {
		NODEID = nODEID;
	}
	public Integer getNDPHDR() {
		return NDPHDR;
	}
	public void setNDPHDR(Integer nDPHDR) {
		NDPHDR = nDPHDR;
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
	public Float getLCTN_X() {
		return LCTN_X;
	}
	public void setLCTN_X(Float lCTN_X) {
		LCTN_X = lCTN_X;
	}
	public Float getLCTN_Y() {
		return LCTN_Y;
	}
	public void setLCTN_Y(Float lCTN_Y) {
		LCTN_Y = lCTN_Y;
	}
	public Integer getNDTP() {
		return NDTP;
	}
	public void setNDTP(Integer nDTP) {
		NDTP = nDTP;
	}
	public String getNDDSPT() {
		return NDDSPT;
	}
	public void setNDDSPT(String nDDSPT) {
		NDDSPT = nDDSPT;
	}
	public Integer getTRSMTPWR() {
		return TRSMTPWR;
	}
	public void setTRSMTPWR(Integer tRSMTPWR) {
		TRSMTPWR = tRSMTPWR;
	}
	public String getPRDCR() {
		return PRDCR;
	}
	public void setPRDCR(String pRDCR) {
		PRDCR = pRDCR;
	}
	public String getVSN() {
		return VSN;
	}
	public void setVSN(String vSN) {
		VSN = vSN;
	}
	public String getMEMO() {
		return MEMO;
	}
	public void setMEMO(String mEMO) {
		MEMO = mEMO;
	}
	public String getSNSRS() {
		return SNSRS;
	}
	public void setSNSRS(String sNSRS) {
		SNSRS = sNSRS;
	}
	
}
