package com.iot.service;

import java.util.List;
import java.util.Map;

import com.iot.entity.HistorySS_DT;



public interface SS_DTSearchService {
	
 // public List<SS_DT> findMSGVL(SS_DT ss_DT);
    
	public List<HistorySS_DT> findHistoryData(Map<String,Object> map);

}
