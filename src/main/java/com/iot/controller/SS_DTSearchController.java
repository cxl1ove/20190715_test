package com.iot.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.iot.common.HistoryAVGSS_DT;
import com.iot.entity.HistorySS_DT;
import com.iot.entity.Node;
import com.iot.entity.SS_DT;
import com.iot.service.NodePHDRSearchService;
import com.iot.service.SS_DTSearchService;
import com.iot.util.ResponseUtil;

import net.sf.json.JSONObject;
@Controller
@RequestMapping("/SS_DTSearch")
public class SS_DTSearchController {
	@Autowired
	private SS_DTSearchService ss_DTSearchService;
	@Autowired
	private NodePHDRSearchService nodePHDRSearchService;
/*	@Autowired
	private DTNMSearchService dTNMSearchService;*/
	@RequestMapping("/list")
	public String list(SS_DT ss_DT,@RequestParam(value="NODEID",required=false)Integer NODEID,@RequestParam(value="sTime",required=false)String sTime,
			@RequestParam(value="eTime",required=false)String eTime,HttpServletResponse response) throws Exception{
		Map<String,Object> map = new HashMap<String, Object>();
		if (NODEID != null) {
			map.put("NTID", ss_DT.getNTID());
			map.put("SBNTID",ss_DT.getSBNTID());
			map.put("NODEID", NODEID);
			Node node = nodePHDRSearchService.findNDPHDR(map);
			System.out.println(node.getNDPHDR());
			map.put("NDPHDR",node.getNDPHDR());
		}else{
	//	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:dd:ss");
			map.put("NTID", ss_DT.getNTID());
			map.put("SBNTID",ss_DT.getSBNTID());
		}	
		
		map.put("sTime", sTime);
		map.put("eTime", eTime);
		
		List<HistorySS_DT> lists = ss_DTSearchService.findHistoryData(map);
		/*List<PRTL_BSDT> list2 = new ArrayList<PRTL_BSDT>();
		for (SS_DT ss_DT1:lists) {
			PRTL_BSDT prtl_BSDT = dTNMSearchService.findDTNM(ss_DT1.getDTITMID());
			list2.add(prtl_BSDT);
		}*/
		
		Map<String,Object> map1 = new HashMap<String, Object>();
		map1 = HistoryAVGSS_DT.GainHistoryAVGSS_DT(sTime, eTime, lists);

		 System.out.println(map1);
		JSONObject result=new JSONObject();
		result.put("SS_DTSearchList",lists);
		 result.put("HistoryAVGSS_DT",map1);
	//	result.put("DTNM", list2);
		System.out.println(result);
		ResponseUtil.write(response, result);
		return null;
	}
/*	public String list(){
		Map<String,Object> map = new HashMap<String, Object>();
	//	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:dd:ss");
		map.put("NTID", "31");
		map.put("SBNTID", "5");
		//map.put("NDPHDR", "1");
		map.put("sTime", "2016-01-09 00:00:00");
		map.put("eTime", "2016-01-11 00:00:00");	
		List<SS_DT> lists = ss_DTSearchService.findHistoryDataByDate(map);
		System.out.println(lists.size());
		for(SS_DT ss_DT1:lists){
			System.out.println(ss_DT1.getMSGVL());
		}
		
		return null;
		
	}
*/
}
