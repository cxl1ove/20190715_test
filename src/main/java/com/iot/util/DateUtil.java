package com.iot.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

	public static String formatDate(Date date,String format){
		String result="";
		SimpleDateFormat sdf=new SimpleDateFormat(format);
		if(date!=null){
			result=sdf.format(date);
		}
		return result;
	}
	
	public static int daysBetween(String smdate,String bdate) throws ParseException {  
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");  
        Calendar cal = Calendar.getInstance();    
        cal.setTime(sdf.parse(smdate));    
        long time1 = cal.getTimeInMillis();                 
        cal.setTime(sdf.parse(bdate));    
        long time2 = cal.getTimeInMillis();         
        long between_days=(time2-time1)/(1000*3600*24);  
            
       return Integer.parseInt(String.valueOf(between_days));     
    } 
	
	public static String daysPlus(String sTime,int i) throws ParseException {
		String result="";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");	
	    Calendar cc = Calendar.getInstance();
	    cc.setTime(sdf.parse(sTime));
	    cc.add(Calendar.DAY_OF_MONTH, i);
	    result=sdf.format(cc.getTime());
	//    System.out.println(sdf.format(cc.getTime()));
		return result;
		
	}

}
