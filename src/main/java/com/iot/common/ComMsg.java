package com.iot.common;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.iot.util.byteConvert;

public class ComMsg {
	
	private String DataPackageName;
	private Integer UserAppID;
	private String Time;
	private short KeyNum;
	private String[] nodeIDs = new String[3];
	private String nodeItem;
	private String SSDT_value;
	
	List<packageBody> dataPackageBody;
	@SuppressWarnings("unused")
	public ComMsg(byte[] inputMsg){
		
		dataPackageBody = new ArrayList<packageBody>();
		DataPackageName = new String(Arrays.copyOfRange(inputMsg, 0, 16))
				.trim();
		UserAppID = byteConvert.bytesToInt(inputMsg, 16);
		Time = new String(Arrays.copyOfRange(inputMsg, 20, 28)).trim();
		KeyNum = byteConvert.bytesToShort(inputMsg, 28);
		int pos = 30;
		for (int i = 0; i < KeyNum; i++) {
			packageBody aPackageBody = new packageBody(Arrays.copyOfRange(
					inputMsg, pos,
					pos + 12 + byteConvert.bytesToShort(inputMsg, pos)));
			switch (i) {
			case 0:
				nodeIDs = aPackageBody.getNodeIDs();
				break;
			case 1:
				nodeItem = aPackageBody.getNodeItem();
				break;
			case 2:
				SSDT_value= aPackageBody.getSSDT_Value();
				break;
			}
			if (i == 1) {
				pos = pos + 8 + byteConvert.bytesToShort(inputMsg, pos);
			} else {
				pos = pos + 12 + byteConvert.bytesToShort(inputMsg, pos);
			}
		}
		
	}
	
	public String getDataPackageName() {
		return DataPackageName;
	}
	public void setDataPackageName(String dataPackageName) {
		DataPackageName = dataPackageName;
	}
	public Integer getUserAppID() {
		return UserAppID;
	}
	public void setUserAppID(Integer userAppID) {
		UserAppID = userAppID;
	}
	public String getTime() {
		return Time;
	}
	public void setTime(String time) {
		Time = time;
	}
	
	public short getKeyNum() {
		return KeyNum;
	}

	public void setKeyNum(short keyNum) {
		KeyNum = keyNum;
	}

	public String[] getNodeIDs() {
		return nodeIDs;
	}
	public void setNodeIDs(String[] nodeIDs) {
		this.nodeIDs = nodeIDs;
	}
	
	public String getNodeItem() {
		return nodeItem;
	}

	public void setNodeItem(String nodeItem) {
		this.nodeItem = nodeItem;
	}

	public String getSSDT_value() {
		return SSDT_value;
	}
	public void setSSDT_value(String sSDT_value) {
		SSDT_value = sSDT_value;
	}
	
}
