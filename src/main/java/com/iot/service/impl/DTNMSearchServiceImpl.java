package com.iot.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iot.dao.DTNMSearchDao;
import com.iot.entity.PRTL_BSDT;
import com.iot.service.DTNMSearchService;
@Service("DTNMSearchService")
public class DTNMSearchServiceImpl implements DTNMSearchService{
    @Autowired
	private DTNMSearchDao dtnmSearchDao;
	public PRTL_BSDT findDTNM(Integer DTITMID) {
		return dtnmSearchDao.findDTNM(DTITMID);
	}

}
