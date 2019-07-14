package com.user.test;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.BeforeClass;
import org.junit.Test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.iot.controller.SS_DTSearchController;
import com.iot.dao.NodePHDRSearchDao;
import com.iot.dao.SS_DTSearchDao;

import com.iot.entity.Node;
import com.iot.entity.SS_DT;

public class UserTest {
	private static  ApplicationContext ctx = null;
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
	}

	@Test
	public void test() {
		/*UserDao userdao = ctx.getBean(UserDao.class);
		User user = new User();
		user.setUserName("ssm");
		user.setPassword("1234");
		User currentUser = userdao.login(user);
		if(currentUser==null){
			System.out.println("用户名或密码错误！");
		}else{
		System.out.println(currentUser);
		}*/
		/*NodePHDRSearchDao nodePHDRSearchDao = ctx.getBean(NodePHDRSearchDao.class);
		Node node = nodePHDRSearchDao.findNDPHDR(1);
		System.out.println(node.getNDPHDR());*/
		//SS_DTSearchDao ss_DTSearchDao = ctx.getBean(SS_DTSearchDao.class);
		/*SS_DT ss_DT = new SS_DT();
		ss_DT.setNTID(31);
		ss_DT.setSBNTID(5);
		ss_DT.setNDPHDR(1);
		List<SS_DT> lists = ss_DTSearchDao.findMSGVL(ss_DT);*/
		/*Map<String,Object> map = new HashMap<String, Object>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:dd:ss");
		map.put("NTID", "31");
		map.put("SBNTID", "5");
		//map.put("NDPHDR", "1");
		map.put("sTime", "2016-01-09 00:00:00");
		map.put("eTime", "2016-01-11 00:00:00");	
		List<SS_DT> lists = ss_DTSearchDao.findHistoryDataByDate(map);
		System.out.println(lists.size());
		for(SS_DT ss_DT1:lists){
			System.out.println(ss_DT1.getMSGVL());*/
		
		SS_DTSearchController ss_DTSearchController = ctx.getBean(SS_DTSearchController.class);
//		ss_DTSearchController.list();
	}

}
