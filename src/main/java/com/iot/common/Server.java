package com.iot.common;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;


public class Server extends Thread {
	ServerSocket server = null;
	Socket socket = null;
	private String dirMsg="";
	
	public Server(int socketPort) {
		try {
			server = new ServerSocket(socketPort);//监听主机
			server.setSoTimeout(5000);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@Override
	public void run() {		
			try {
				// 每个请求交给一个线程去处理
				socket = server.accept();
				ServerThread th = new ServerThread(socket,this);
				th.start();
				th.join();				//保证th线程中赋值给了主线程中的dirMsg之后再结束该子线程
				sleep(1000);
				server.close();
			} catch (Exception e) {
				//e.printStackTrace();
				System.out.println("目录服务获取失败：连接超时...");
				server = null;
			}
	
	}
	
	public String getDirMsg() {
		return dirMsg;
	}

	public void setDirMsg(String dirMsg) {
		this.dirMsg = dirMsg;
	}
}
