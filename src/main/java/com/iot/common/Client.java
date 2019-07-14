package com.iot.common;

import java.io.OutputStream;
import java.net.Socket;

import com.iot.builder.DirPackageBuilder;
import com.iot.util.byteConvert;

//import org.xvolks.jnative.exceptions.NativeException;



public class Client{
	Socket socket = null;
	public static String CIS_IP = "210.35.32.172";//210.35.32.170
	public static Integer CIS_PORT = 4029;
	
	public Client(String ip , int port) {

		try {
			socket = new Socket(ip, port);//监听主机IP:"127.0.0.1" 端口:4029
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 向CIS发送请求
	 * 
	 * @param msgType
	 *            消息类型 1:目录消息 2:注册网络 3：注册子网 4:注册节点 5:注册传感器6:命令下发
	 * @param msg
	 *            具体的消息对象
	 */
	public void sendMsg(int msgType, Object msg)  {
		byte[] abyte;
		OutputStream osOutputStream;
		try {
			byte[] b={0,4,0,0};	//长度为1024
//			byte[] regLength = {0,8,0,0};	//长度为2048
			switch (msgType) {
			case 1:// send dir msg
				abyte = dirMessage();
				osOutputStream = socket.getOutputStream();
				osOutputStream.write(b);		
				osOutputStream.write(abyte); 
				break;
			/*case 2:// send regnet msg
				abyte = registNetMessage(msg);
				osOutputStream = sk.getOutputStream();
				osOutputStream.write(b);
				osOutputStream.write(abyte);
				break;
			case 3:// send reg subnet msg
				abyte = registSubnetMsg(msg);
				osOutputStream = sk.getOutputStream();
				osOutputStream.write(b);
				osOutputStream.write(abyte);
				break;
			case 4://send reg node msg
				abyte = registNodeMsg(msg);
				osOutputStream = sk.getOutputStream();
				osOutputStream.write(b);
				osOutputStream.write(abyte);
				break;
			case 5://send reg sensor msg
				abyte = registSensorMsg(msg);
				osOutputStream = sk.getOutputStream();
				osOutputStream.write(b);
				osOutputStream.write(abyte);
				break;*/
			case 6:
				abyte=(byte[])msg;
				byte[] firstPackage=byteConvert.intToBytes(abyte.length);
				osOutputStream=socket.getOutputStream();
				osOutputStream.write(firstPackage);		
				osOutputStream.write(abyte);
			default:
				break;
			}
			socket.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	

	// ===================================================================================

	/*private byte[] registSensorMsg(Object msg) {
		SENSOR asensorMsg = (SENSOR) msg;
//			return javaCallDll.JAVA_Register_Sensor(asensorMsg);
		return RegPackageBuilder.packSensorRegMessage(asensorMsg.getStrSensorName(), asensorMsg.getStrSenorDescription(), asensorMsg.getStrProducer(), asensorMsg.getStrVersion(), asensorMsg.getStrUnit(), asensorMsg.getStrFormula(), asensorMsg.getStrPrms(), asensorMsg.getStrMax(), asensorMsg.getStrMin(), asensorMsg.getStrPrecision(), asensorMsg.getnSensorType(), asensorMsg.getnAppId());
	}
	private byte[] registNodeMsg(Object msg) {
		NODE anodeMsg = (NODE) msg;
//			return javaCallDll.JAVA_Register_Node(anodeMsg);
		return RegPackageBuilder.packNodeRegMessage(anodeMsg.getStrDsption(), anodeMsg.getnNodeAddr(), anodeMsg.getStrProducer(), anodeMsg.getStrVersion(), anodeMsg.getnTransPower(), anodeMsg.getStrMemo(), anodeMsg.getfLctnX(), anodeMsg.getfLctnY(), anodeMsg.getnNetId(), anodeMsg.getnSubnetId(), anodeMsg.getnNodeTypeId(), anodeMsg.getnAppId());
	}

	private byte[] registSubnetMsg(Object msg) {
		SUBNET asubNetMsg = (SUBNET) msg;
//			return javaCallDll.JAVA_Register_SubNet(asubNetMsg);
		return RegPackageBuilder.packSubNetRegMessage(asubNetMsg.getnNetId(), asubNetMsg.getnSubnetId(), asubNetMsg.getStrSubnetName(), asubNetMsg.getStrSubnetDescrption(), asubNetMsg.getStrSinkIp(), asubNetMsg.getnChannel(), asubNetMsg.getnWorkCycle(), asubNetMsg.getStrAcsMethodName(), asubNetMsg.getStrMemo(), asubNetMsg.getfCvrg_LB_X(), asubNetMsg.getfCvrg_LB_Y(), asubNetMsg.getfCvrg_RU_X(), asubNetMsg.getfCvrg_RU_Y(), asubNetMsg.getnAppId());
	}

	private byte[] registNetMessage(Object msg) {
		NET aNetMsg = (NET) msg;
//			return javaCallDll.JAVA_Register_NET(aNetMsg);
		return RegPackageBuilder.packNetRegMessage(aNetMsg.getStrNetName(), aNetMsg.getStrNetDescrption(), aNetMsg.getStrAddress(), aNetMsg.getStrOrganUnit(), aNetMsg.getStrRepUnit(), aNetMsg.getStrLinkMan(), aNetMsg.getStrPhone(), aNetMsg.getStrMemo(), aNetMsg.getfCvrg_LB_X(), aNetMsg.getfCvrg_LB_Y(), aNetMsg.getfCvrg_RU_X(), aNetMsg.getfCvrg_RU_Y(), aNetMsg.getnAppId());
	}
*/
	private byte[] dirMessage() {
		return DirPackageBuilder.packDirRequest(-1, 2, 6, -1, -1, -1, -1);
	}

	public static void main(String[] args) {
		
		new Client("210.35.32.170",4029).sendMsg(1, 1);
	}
}
