package com.iot.controller;

import java.nio.ByteBuffer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.iot.builder.CommandPackageBuilder;
import com.iot.common.Client;
import com.iot.common.packageBody;
import com.iot.util.byteConvert;

/**
 *命令下发action函数 主要是节点探测、参数设置、从起Slink
 */
@Controller
@RequestMapping("/CMD_Issued")
public class NetCmdController{
	private int cmd_NetID;
	private int cmd_SubNetID;
	private int cmd_NodeID;
	private int cmd_StateTP;
	private int cmd_PValue;
	private int cmd_isFlag;
	private int cmd_paramType;
	private int cmdType;
	/**
	 * 节点探测
	 */
	@RequestMapping("/nodeDetection")
	public void nodeDetection() {
		//命令包的组装
		int pkgLength=30;		//前30为包的信息如：包名、appid、时间... 从第30开始的
		
		short valueSize=12;		
		pkgLength+=(valueSize+12);
		
		byte[] nodeIDS=netInfo2nodeIds(cmd_NetID,cmd_SubNetID,cmd_NodeID);
		packageBody netInfoPackageBody=new packageBody(valueSize, "NODE_IDS",nodeIDS);
		
		valueSize=4;
		pkgLength+=(valueSize+12);
		
		byte[] cmd_state_ip=byteConvert.intToBytes(cmd_StateTP);//探测类型   节点探测和邻居探测
		packageBody stateIPpPackageBody=new packageBody(valueSize,"STATE_TP",cmd_state_ip);
		
		byte[] commMSg=CommandPackageBuilder.packCmdRequest(pkgLength,"NT_CMD_DEC", netInfoPackageBody,stateIPpPackageBody);
		
		new Client(Client.CIS_IP,Client.CIS_PORT).sendMsg(6, commMSg); 
		System.out.println(commMSg);		
	}
	/**
	 * 参数设置
	 */
	public void paramSet() {
		short valueSize=12;
		byte[] nodeIDS=netInfo2nodeIds(cmd_NetID,cmd_SubNetID,-1);
		packageBody netInfoPackageBody=new packageBody(valueSize, "NODE_IDS",nodeIDS);
		valueSize=4;
		byte[] cmd_state_ip=byteConvert.intToBytes(cmd_paramType);//参数类型
		packageBody stateIPpPackageBody=new packageBody(valueSize,"STATE_TP",cmd_state_ip);
		byte[] cmd_p_value=byteConvert.intToBytes(cmd_PValue);//参数值
		packageBody pValuePackageBody=new packageBody(valueSize,"P_VALUE",cmd_p_value);
		byte[] s_flag=byteConvert.intToBytes(cmd_isFlag);//是否休眠
		packageBody sFlagPackageBody=new packageBody(valueSize,"S_FLAG",s_flag);
		byte[] commMSg=CommandPackageBuilder.packCmdRequest(1024,"NT_CMD_SET", netInfoPackageBody,stateIPpPackageBody,pValuePackageBody,sFlagPackageBody);
		new Client(Client.CIS_IP,Client.CIS_PORT).sendMsg(6, commMSg);

	}
	/**
	 * sink重启
	 * @param args
	 */
	public void resetSink() {
		short valueSize=12;
		byte[] nodeIDS=netInfo2nodeIds(cmd_NetID,cmd_SubNetID,cmd_NodeID);
		packageBody netInfoPackageBody=new packageBody(valueSize, "NODE_IDS",nodeIDS);
		valueSize=4;
		byte[] cmd_state_ip=byteConvert.intToBytes(cmdType);
		packageBody stateIPpPackageBody=new packageBody(valueSize,"STATE_TP",cmd_state_ip);
		byte[] commMSg=CommandPackageBuilder.packCmdRequest(1024,"NT_CMD_REUP", netInfoPackageBody,stateIPpPackageBody);
		new Client(Client.CIS_IP,Client.CIS_PORT).sendMsg(6, commMSg);
		System.out.println(commMSg);
	}
	public static void main(String[] args) {
		NetCmdController nca=new NetCmdController();	
		nca.setCmd_NetID(31);
		nca.setCmd_SubNetID(5);
		nca.setCmd_NodeID(1);
		nca.setCmd_StateIP(0);
		nca.nodeDetection();
		
	}
	
	private byte[] netInfo2nodeIds(int NetID, int SubNetID,
			int NodeID) {
		byte[] nodeIds=new byte[12];
		ByteBuffer buf = ByteBuffer.allocate(12);
		byte[] b;
		b=byteConvert.intToBytes(NetID);
		buf.put(b);
		b=byteConvert.intToBytes(SubNetID);
		buf.put(b);
		b=byteConvert.intToBytes(NodeID);
		buf.put(b);
		nodeIds=buf.array();
		return nodeIds;
	}
	
	public int getCmdType() {
		return cmdType;
	}
	public void setCmdType(int cmdType) {
		this.cmdType = cmdType;
	}
	public int getCmd_isFlag() {
		return cmd_isFlag;
	}
	public void setCmd_isFlag(int cmd_isFlag) {
		this.cmd_isFlag = cmd_isFlag;
	}
	public int getCmd_paramType() {
		return cmd_paramType;
	}
	public void setCmd_paramType(int cmd_paramType) {
		this.cmd_paramType = cmd_paramType;
	}
	public int getCmd_PValue() {
		return cmd_PValue;
	}
	public void setCmd_PValue(int cmd_PValue) {
		this.cmd_PValue = cmd_PValue;
	}
	public int getCmd_NetID() {
		return cmd_NetID;
	}
	public void setCmd_NetID(int cmd_NetID) {
		this.cmd_NetID = cmd_NetID;
	}
	public int getCmd_SubNetID() {
		return cmd_SubNetID;
	}
	public void setCmd_SubNetID(int cmd_SubNetID) {
		this.cmd_SubNetID = cmd_SubNetID;
	}
	public int getCmd_NodeID() {
		return cmd_NodeID;
	}
	public void setCmd_NodeID(int cmd_NodeID) {
		this.cmd_NodeID = cmd_NodeID;
	}
	public int getCmd_StateTP() {
		return cmd_StateTP;
	}
	public void setCmd_StateIP(int cmd_StateTP) {
		this.cmd_StateTP = cmd_StateTP;
	} 
	
	

}
