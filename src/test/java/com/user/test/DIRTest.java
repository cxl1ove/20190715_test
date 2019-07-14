package com.user.test;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;

import javax.servlet.http.HttpServletResponse;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.iot.controller.DirServiceController;
import com.iot.util.JsonUtils;
import com.iot.util.ResponseUtil;

import net.sf.json.JSONObject;

public class DIRTest {
	private static  ApplicationContext ctx = null;
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
	}

	@Test
	public void test() throws Exception {
		String xml = readXML();
	 //   System.out.println(Charset.defaultCharset().name());
		System.out.println(xml);
		String jsons = JsonUtils.xml2JSON(xml);
		
		System.out.println(jsons);
		JSONObject result=new JSONObject();
		result.put("DIR",jsons);
		System.out.println(result);
	//ResponseUtil.write(response, result);
	
	}
	
	private static String readXML() throws IOException {  
       // String path = "F:\\Dir.XML"; 
       // String path = "C:\\Users\\cxllove\\Desktop\\Dir.XML";
		
		String path = DIRTest.class.getClassLoader().getResource("Dir.XML").getPath();
        FileInputStream fileInputStream = new FileInputStream(path);
      //  System.out.println(Charset.defaultCharset().name());
        InputStreamReader reader = new InputStreamReader(fileInputStream,"GBK");
        BufferedReader reader1 = new BufferedReader(reader);
   
        String xml = "";  
        String line;  
        while ((line = reader1.readLine()) != null) {  
            xml = xml + line;  
        }  
        reader1.close();  
        return xml; 
	}  
}
