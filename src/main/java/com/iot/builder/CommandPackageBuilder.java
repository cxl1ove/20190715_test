package com.iot.builder;

import java.nio.ByteBuffer;

import com.iot.common.packageBody;
import com.iot.util.Timer;
import com.iot.util.byteConvert;

/**
 *命令包的组装的action类 
 */
public class CommandPackageBuilder {
		/**
		 * 
		 * @param PackageName 包名
		 * @param packageBodies  变长包
		 * @default  appID=-1,keyNum=packagebodies.length
		 * @return
		 */
			public static byte[] packCmdRequest(int pkgLength,String PackageName,packageBody ...packageBodies){
				ByteBuffer buf = ByteBuffer.allocate(pkgLength);
				byte[] b;
				b=byteConvert.StringtoByte(PackageName, 16);
				buf.put(b);
				b = byteConvert.intToBytes(-1);
				buf.put(b);
				b = Timer.getTimer().getBytes();
				System.out.println(b);
				buf.put(b);
				b = byteConvert.shortToByte((short)packageBodies.length);
				System.out.println(b);
				buf.put(b);
				for (packageBody aPackageBody : packageBodies) {
					b=byteConvert.shortToByte(aPackageBody.getValueSize());//keyValue的size  三元组的话为12
					buf.put(b);
					b=byteConvert.StringtoByte(aPackageBody.getKeyName(), 10);//名称固定长度为10
					buf.put(b);
					b=aPackageBody.getKeyValue();//值 需要在packagebody类中进行封装
					buf.put(b);
					
				}			
				byte [] comRequest = buf.array(); //buffer->byte[]
				System.out.println(comRequest);
				return comRequest;
			}
			public static void main(String[] args) {
				short a=1;
				byte[] ab=new byte[1];
				packCmdRequest(1024,"NT_CMD_DEC", new packageBody(a,"NT_CMD_DEC",ab));
			}
			
}
