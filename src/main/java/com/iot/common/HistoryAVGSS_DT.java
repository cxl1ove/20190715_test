package com.iot.common;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.iot.entity.HistorySS_DT;
import com.iot.util.DateUtil;
/***
 * 历史感知数据的平均值
 * @author cxllove
 *
 */
public class HistoryAVGSS_DT {
	
	public static  Map<String,Object> GainHistoryAVGSS_DT(String sTime,String eTime,List<HistorySS_DT> lists) throws ParseException{
		double AVGValue1 = 0.0;
 		double AVGValue2 = 0.0;
 		double AVGValue3 = 0.0;
 		double AVGValue4 = 0.0;
 		double AVGValue5 = 0.0;
 		Integer []num = new Integer[]{0,0,0,0,0};
 		int dates1 = DateUtil.daysBetween(sTime,eTime);
 		System.out.println(dates1);
 		List<Double> lists1 = new ArrayList<Double>();
 		List<Double> lists2 = new ArrayList<Double>();
 		List<Double> lists3 = new ArrayList<Double>();
 		List<Double> lists4 = new ArrayList<Double>();
 		List<Double> lists5 = new ArrayList<Double>();
        for(int j=0;j<dates1;j++){
        	num[0] = 0;num[1] = 0;num[2] = 0;num[3] = 0;num[4] = 0;
        	AVGValue1 = 0;AVGValue2 = 0;AVGValue3 = 0;AVGValue4 = 0;AVGValue5 = 0;
	 		for(int i=0;i<lists.size();i++){
	 			if("newPH".equals(lists.get(i).getDTNM())&&DateUtil.daysPlus(sTime,j).equals(lists.get(i).getDTM().split(" ")[0])){
	 				AVGValue1+=lists.get(i).getMSGVL();
	 				num[0]++;
	 			}
	 			if("浊度".equals(lists.get(i).getDTNM())&&DateUtil.daysPlus(sTime,j).equals(lists.get(i).getDTM().split(" ")[0])){
	 				AVGValue2+=lists.get(i).getMSGVL();
	 				num[1]++;
	 			}
	 			if("new水温".equals(lists.get(i).getDTNM())&&DateUtil.daysPlus(sTime,j).equals(lists.get(i).getDTM().split(" ")[0])){
	 				AVGValue3+=lists.get(i).getMSGVL();
	 				num[2]++;
	 			}
	 			if("new电导率".equals(lists.get(i).getDTNM())&&DateUtil.daysPlus(sTime,j).equals(lists.get(i).getDTM().split(" ")[0])){
	 				AVGValue4+=lists.get(i).getMSGVL();
	 				num[3]++;
	 			}
	 			if("new溶解氧".equals(lists.get(i).getDTNM())&&DateUtil.daysPlus(sTime,j).equals(lists.get(i).getDTM().split(" ")[0])){
	 				AVGValue5+=lists.get(i).getMSGVL();
	 				num[4]++;
	 			}
	 		}
	 		for (int k = 0; k < 5; k++) {
	 			if (num[k] == 0) {
	 				num[k]++;
	 			}
	 		}
	 		lists1.add(AVGValue1 / num[0]);
	 		lists2.add(AVGValue2 / num[1]);
	 		lists3.add(AVGValue3 / num[2]);
	 		lists4.add(AVGValue4 / num[3]);
	 		lists5.add(AVGValue5 / num[4]);
       }
        List<String> lists6 = new ArrayList<String>();
        for(int j = 0; j < dates1; j++){
        	lists6.add(DateUtil.daysPlus(sTime, j));
        }
        Map<String,Object> map = new HashMap<String, Object>();
        //List<Object> list = new ArrayList<Object>();
    	map.put("lists1", lists1);
    	map.put("lists2", lists2);
    	map.put("lists3", lists3);
    	map.put("lists4", lists4);
    	map.put("lists5", lists5);
    	map.put("lists6", lists6);
      /*  list.add(lists1);
        list.add(lists2);
        list.add(lists3);
        list.add(lists4);
        list.add(lists5);
        list.add(lists6);*/
        
    //	System.out.println(map);
    	
    	return map;
	}

}
