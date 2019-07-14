package com.iot.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iot.dao.SS_DTSearchDao;
import com.iot.entity.HistorySS_DT;
import com.iot.entity.SS_DT;
import com.iot.service.SS_DTSearchService;
@Service("ss_DTSearchService")
public class SS_DTSearchServiceImpl implements SS_DTSearchService {
    @Autowired
	private SS_DTSearchDao ss_DTSearchDao;
/*	public List<SS_DT> findMSGVL(SS_DT ss_DT) {
		return ss_DTSearchDao.findMSGVL(ss_DT);
	}
*/
	public List<HistorySS_DT> findHistoryData(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return ss_DTSearchDao.findHistoryData(map);
	}

}
