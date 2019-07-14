package com.iot.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Timer {
	public static String getTimer(){
		DateFormat format=new SimpleDateFormat("yyyy-MM-dd");
		String times=format.format(new Date());
		String time[] = times.split("-");
		String timeStr = time[0]+time[1]+time[2];
		return timeStr;
	}
	public static String timeOutput()
	{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		return df.format(new Date());
	}
	public static void main(String[] args) {
		System.out.println(timeOutput());
	}
}
