package com.iot.common;

import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.util.Arrays;



public class ServerThread extends Thread {
	Server parentThread;
	Socket socket = null;
	String xmlFileString="";
	int packageNum=0;
	
	public String getXmlFileString() {
		return xmlFileString;
	}

	public void setXmlFileString(String xmlFileString) {
		this.xmlFileString = xmlFileString;
	}
	
	public ServerThread(Socket socket,Server parentThread) {
		this.socket = socket;
		this.parentThread = parentThread;
	}

	@Override
	public void run() {
		try {
			InputStream is = null;
			byte[] chars = new byte[1024];
			is = socket.getInputStream();
			String xmlTemp=null;
 			while(is.read(chars)!=-1) {	
				if(packageNum==0)
				{
					
					packageNum++;
					continue;
				}
			System.out.println(Arrays.toString(chars));
//			String a = new String(chars,"gb2312").trim();
//			System.out.println(a);
			xmlTemp=new String(chars,"gb2312").substring(35).trim();
			System.out.println(xmlTemp);
			
			xmlFileString+=xmlTemp;			
			}
			xmlFileString=xmlFileString.replaceAll("\r|\n", "");
			System.out.println(xmlFileString);
			parentThread.setDirMsg(xmlFileString);
		/*	String jsons = JsonUtils.xml2json(xmlFileString);
			System.out.println(jsons);*/
		//	mapAction.mapMsg=JsonMapper.xml2JSON(xmlFileString);
			
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	

}
