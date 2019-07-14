package com.iot.common;

import java.util.Arrays;

import com.iot.util.byteConvert;

/**
 * 
 * 
 */
public class packageBody {
	short valueSize;
	String keyName;
	byte[] keyValue;
	String[] nodeIDs = new String[3];
	String nodeItem;
	String SSDT_Value;
	String[] routeInfo;
/**
 * 拆包时构造函数
 * @param packagebody
 */
	public packageBody(byte[] packagebody) {
		valueSize = byteConvert.bytesToShort(packagebody, 0);
		keyName = new String(Arrays.copyOfRange(packagebody, 2, 12)).trim();

		if (keyName.equals("NODE_IDS")) {
			for (int i = 0; i < 3; i++) {
				nodeIDs[i] = String.valueOf(byteConvert.bytesToInt(packagebody, 12 + i * 4));
			}
		} 
		else if(keyName.equals("NODE_ITEM")){
			byte[] pkg = Arrays.copyOfRange(packagebody, 12, packagebody.length);
			nodeItem = String.valueOf(byteConvert.bytesToInt(pkg, 0));
			
		}
		else if(keyName.equals("VALUE")){
			byte[] pkg = Arrays.copyOfRange(packagebody, 12, packagebody.length);
			SSDT_Value = String.valueOf(byteConvert.byteToDouble(pkg));
		}
		/*else if (keyName.equals("V_ITEM"))  {//电压值 double 8
			byte[] pkg=Arrays.copyOfRange(packagebody, 12, packagebody.length);
			nodeValue=String.valueOf(byteConvert.byteToDouble(pkg));
		}
		else if (keyName.equals("R_INFO")) //[int][int]...4x
		{
			routeInfo=new String[valueSize/4];//获取路由int的长度//这个长度是要不要除4?
			for (int i = 0; i < routeInfo.length; i++) {
				routeInfo[i]=String.valueOf(byteConvert.bytesToInt(packagebody, 12 + i * 4));				
			}
		}*/
	}

	
	/**
	 * 组包时构造函数
	 * @param valueSize
	 * @param keyName
	 * @param keyValue
	 */
	public packageBody(short valueSize,String keyName,byte[] keyValue) {
		this.valueSize=valueSize;
		this.keyName=keyName;
		this.keyValue=keyValue;		
	}



	public short getValueSize() {
		return valueSize;
	}

	public void setValueSize(short valueSize) {
		this.valueSize = valueSize;
	}

	public String getKeyName() {
		return keyName;
	}

	public void setKeyName(String keyName) {
		this.keyName = keyName;
	}

	public byte[] getKeyValue() {
		return keyValue;
	}

	public void setKeyValue(byte[] keyValue) {
		this.keyValue = keyValue;
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


	public String getSSDT_Value() {
		return SSDT_Value;
	}


	public void setSSDT_Value(String sSDT_Value) {
		SSDT_Value = sSDT_Value;
	}


	public String[] getRouteInfo() {
		return routeInfo;
	}



	public void setRouteInfo(String[] routeInfo) {
		this.routeInfo = routeInfo;
	}

}
