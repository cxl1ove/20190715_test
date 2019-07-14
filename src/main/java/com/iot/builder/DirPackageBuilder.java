package com.iot.builder;

import java.nio.ByteBuffer;

import com.iot.util.Timer;
import com.iot.util.byteConvert;

/*
         目录包的封装
           20190715 1:37
          author :cxl1ove
*/

public class DirPackageBuilder {
			public static byte[] packDirRequest(int nUseID,int nHighLevel,int nLowLevel,int nNetID,int nSubNetID,int nNodeID,int nSensorID){
				String PackageName = "DIRS";
				short  KeyNum=41;
				ByteBuffer buf = ByteBuffer.allocate(1024);
				byte[]  b = byteConvert.StringtoByte(PackageName, 16);
				buf.put(b);
				b = byteConvert.intToBytes(nUseID);
				buf.put(b);
				b = byteConvert.StringtoByte(Timer.getTimer(), 8);
				buf.put(b);
				b = byteConvert.shortToByte(KeyNum);
				buf.put(b);
				b = byteConvert.intToBytes(nHighLevel);
				buf.put(b);
				b = byteConvert.intToBytes(nLowLevel);
				buf.put(b);
				b = byteConvert.intToBytes(nNetID);
				buf.put(b);
				b = byteConvert.intToBytes(nSubNetID);
				buf.put(b);
				b = byteConvert.intToBytes(nNodeID);
				buf.put(b);
				b = byteConvert.intToBytes(nSensorID);
				buf.put(b);
				buf.flip();
				int contentLength = buf.limit();
				byte [] content = new byte[contentLength];
				buf.get(content);
				byte [] dirRequest = new byte[1024];
				for (int i = 0; i < contentLength; i++) {
					dirRequest[i] = content[i];
				}
//				System.out.println("包的总长度："+1024);
//				System.out.println("有效载荷长度："+contentLength);
//				System.out.println("当前时间戳："+getTimer());
//	            System.out.println("全部内容："+Arrays.toString(dirRequest));
				return dirRequest;
			}
			
}
