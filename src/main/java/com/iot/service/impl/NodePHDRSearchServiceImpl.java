package com.iot.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iot.dao.NodePHDRSearchDao;
import com.iot.entity.Node;
import com.iot.service.NodePHDRSearchService;
@Service("historyDataSearchService")
public class NodePHDRSearchServiceImpl implements NodePHDRSearchService{
    @Autowired
	private NodePHDRSearchDao historyDataSearchDao;
	public Node findNDPHDR(Map<String,Object> map) {
		return historyDataSearchDao.findNDPHDR(map);
	}

}
