package com.iot.controller;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.iot.util.JsonUtils;
import com.iot.util.ResponseUtil;

import net.sf.json.JSONObject;
@Controller
public class DirServiceController {
	@RequestMapping("/list")
	public String DirList(HttpServletResponse response) throws Exception{
		String xml = readXML();
		System.out.println(xml);
		String jsons = JsonUtils.xml2JSON(xml);
		
		System.out.println(jsons);
		JSONObject result=new JSONObject();
		result.put("jsons",jsons);
		System.out.println(result);
		ResponseUtil.write(response, result);
		return null;

}

private static String readXML() throws IOException {  
    //String path = "F:\\Dir.XML"; 
   // String path = "C:\\Users\\cxllove\\Desktop\\Dir.XML";
	String path = DirServiceController.class.getClassLoader().getResource("Dir.XML").getPath();
    FileInputStream fileInputStream = new FileInputStream(path);
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
