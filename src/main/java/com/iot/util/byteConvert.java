package com.iot.util;


public class byteConvert {

	
	 //字符串转换成固定长度的字节数组
    public static byte[] StringtoByte(String content , int length){
    	byte a[] = new byte[length];
    	char b[] = content.toCharArray();
    	for (int i = 0; i < b.length; i++) {
    		a[i] =(byte) (int)b[i];
		}
    	return a;
    }

    //网络数据转换成固定长度的字节数组
    public static byte[] NetDataToByte(int intValue, int length) {  
        byte[] b = new byte[length];  
        for (int i = 0; i < length; i++) {
        	b[i]=(byte)intValue;
		}
        return b;  
    }
    //浮点型数据转换成固定长度的字节数组
    public static byte[] FloatToByte(float f) {  
    	 // 把float转换为byte[]  
        int fbit = Float.floatToIntBits(f);  
        byte[] b = new byte[4];    
        for (int i = 0; i < 4; i++) {    
            b[i] = (byte) (fbit >> (24 - i * 8));    
        }   
        // 翻转数组  
        int len = b.length;  
        // 建立一个与源数组元素类型相同的数组  
        byte[] dest = new byte[len];  
        // 为了防止修改源数组，将源数组拷贝一份副本  
        System.arraycopy(b, 0, dest, 0, len);  
        byte temp;  
        // 将顺位第i个与倒数第i个交换  
        for (int i = 0; i < len / 2; ++i) {  
            temp = dest[i];  
            dest[i] = dest[len - i - 1];  
            dest[len - i - 1] = temp;  
        }  
        return dest;  
    }
    
    /** 
     * 将int类型的数据转换为byte数组 原理：将int数据中的四个byte取出，分别存储 
     *  
     * @param n  int数据 
     * @return 生成的byte数组 
     */  
    public static byte[] intToBytes(int n) {  
        byte[] b = new byte[4];  
        for (int i = 0; i < 4; i++) {  
            b[3-i] = (byte) (n >> (24 - i * 8));  
        }  
        return b;  
    }  
    
    public static int bytesToInt(byte[] ary, int offset) {
		int value;	
		if (ary.length <= 2) {
			value = (int) ((ary[offset]&0xFF) 
					| ((ary[offset+1]<<8) & 0xFF00));
		} else {
			value = (int) ((ary[offset]&0xFF) 
					| ((ary[offset+1]<<8) & 0xFF00)
					| ((ary[offset+2]<<16)& 0xFF0000) 
					| ((ary[offset+3]<<24) & 0xFF000000));
		}
		return value;
	}
    
	public static short bytesToShort(byte[] ary, int offset) {
		short value;	
		value = (short) ((ary[offset]&0xFF) 
				| ((ary[offset+1]<<8) & 0xFF00));
		return value;
	}
	
    //short转换成字节数组
    public static byte[] shortToByte(short number) { 
        int temp = number; 
        byte[] b = new byte[2]; 
        for (int i = 0; i < b.length; i++) { 
            b[i] = new Integer(temp & 0xff).byteValue();// 将最低位保存在最低位 
            temp = temp >> 8; // 向右移8位 
        } 
        return b; 
    } 
    //字符转换成字节数组
    public static byte[] charToByte(char c) { 
        byte[] b = new byte[2]; 
        b[0] = (byte) ((c & 0xFF00) >> 8); 
        b[1] = (byte) (c & 0xFF); 
        return b; 
    }
  //字节到浮点转换  
    public static double byteToDouble(byte[] arr){  
    	long value = 0;  
        for (int i = 0; i < 8; i++) {  
            value |= ((long) (arr[i + 4] & 0xff)) << (8 * i);  
        }  
        return Double.longBitsToDouble(value);   
    }  
    
    public static void main(String args[]){
//    	int a = 1024;
//    	short b=2;
//         System.out.print(intToBytes(1024));
//         System.out.println(intToBytes(2));
//         byte[] a1 = intToBytes(1024);
//         byte[] a2 = intToBytes(2);
//         System.out.println(bytesToInt(a1, 0));
//         System.out.print(intToBytes(1024));
//    	byte[] ret = new byte[8];
//    	ret = [-52, -52, -52, -52, 0, 0, 0, -128];
//    	System.out.println(byteToDouble());
    }
}
