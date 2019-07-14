package com.iot.controller;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.iot.common.Client;
import com.iot.common.ComMsg;
import com.iot.util.ResponseUtil;
import com.iot.util.Timer;

import net.sf.json.JSONObject;


/**
 * messageCollect&PushAction 消息收集及推送Action
 * 
 *
 */
@Controller
@RequestMapping("/messageCp")
public class MessageCpController {
	
	private static Integer socketPort = 4031;
	private static ServerSocket server = null;
	private static Socket socket = null;
	private Client aclient;
	private JSONObject result = new JSONObject();
	private int num = -1;
	private boolean breakFlag = false;
	
	@RequestMapping("/open")
	public String MessageCp(HttpServletResponse response){
		listenCIS(socketPort, response);
	//	return "消息推送已启动";
		return null;
	}
	private void listenCIS(Integer socketPort, HttpServletResponse response) {
		InputStream is = null;
		num = -1;
		breakFlag = false;
		try {
			if (server == null) {
				server = new ServerSocket(socketPort);
				if(aclient ==null)
					aclient =new Client(Client.CIS_IP,Client.CIS_PORT);//监听创建
			}
			System.out.println("MessageCP is  Listening....");
		} catch (IOException e2) {
			System.out.println(e2.getMessage());
		}
		try {
			while(true) {
				socket = server.accept();
				System.out.println("客户端"
						+ socket.getInetAddress().getHostName()
						+ "(ip:"
						+ socket.getInetAddress().getHostAddress()
						+ ")连入,正在等待客户端的数据...");
				is = socket.getInputStream();
				num++;
				byte[] chars = new byte[1024];
				if (is.read(chars) != -1) {
					System.out.println("此次客户端数据包如下：");
					System.out.println(Arrays.toString(chars));// 按位输出
					System.out.println("一条记录读取完毕！");
					ComMsg aComMsg = new ComMsg(chars);
					try {
						pushmessage(aComMsg, response);
						if (breakFlag) {
							break;
						}
					} catch (Exception e1) {
						
					}
					
//					try {
//						Thread.sleep(5000);
//					} catch (InterruptedException e) {
//						e.printStackTrace();
//					}
				} 
			}
			socket.close();
		} catch (SocketException e) {
			//System.out.println(e.getMessage());
		} catch (IOException e) {
			//e.printStackTrace();
		}
		
	}
	
	private String pushmessage(ComMsg aComMsg, HttpServletResponse response) throws Exception {
		
		
		Map<Object, Object> maps = new HashMap<Object, Object>();
		maps.put("Net", aComMsg.getNodeIDs()[0]);
		maps.put("SubNet", aComMsg.getNodeIDs()[1]);
		maps.put("Node", aComMsg.getNodeIDs()[2]);
	    maps.put("NodeItem", aComMsg.getNodeItem());
	    maps.put("SSDT_VALUE",aComMsg.getSSDT_value());
		maps.put("MsgTime", Timer.timeOutput());
		result.put("MessageCp_" + num, maps);
		if (num == 4) {
			num = -1;
			breakFlag = true;
			System.out.println(result + "," + num + "," + breakFlag);
			ResponseUtil.write(response, result);
		}
		return null;
	}
	
	

}
