package com.iot.util;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import net.sf.json.JSONObject;


public class JsonUtils {
	
	private static Logger logger = LoggerFactory.getLogger(JsonUtils.class);
	private static ObjectMapper objectMapper = new ObjectMapper(); 
    private static XmlMapper xmlMapper = new XmlMapper();
    /**
     *  bean转化json 
     * @param bean
     * @return
     */
    public static <T> String bean2Json(T bean) {  
        try {  
            return objectMapper.writeValueAsString(bean);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return "";  
    } 
    /**
     * json转化bean
     * @param json
     * @param beanClass
     * @return
     */
    public static <T> T json2Bean(String json, Class<T> beanClass) {  
        try {  
            return objectMapper.readValue(json, beanClass);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return null;  
    }  
    /**
     * list转化json
     * @param list
     * @return
     */
    public static String list2Json(List list) {  
        try {  
            return objectMapper.writeValueAsString(list);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return "";  
    }  
    /**
     * json转化为list
     * @param json
     * @param beanClass
     * @return
     */
    public static <T> List<T> json2List(String json, Class<T> beanClass) {  
        try {  
              
            return (List<T>)objectMapper.readValue(json, getCollectionType(List.class, beanClass));  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return null;  
    }  
     /**
      * json 转化map
      * @param json
      * @return
      */
    public static Map json2Map(String json) {  
        try {  
              
            return (Map)objectMapper.readValue(json, Map.class);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return null;  
    } 
    /**
     * map 转化json  
     * @param map
     * @return
     */
    public static String map2Json(Map map) {  
        try {  
            return objectMapper.writeValueAsString(map);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return "";  
    }  
    /**
     * json 转化xml 
     * @param jsonStr
     * @return
     * @throws Exception
     */
    public static String json2xml(String jsonStr)throws Exception{  
        JsonNode root = objectMapper.readTree(jsonStr);  
        String xml = xmlMapper.writeValueAsString(root);  
        return xml;  
    }  
    /**
     * xml 转化json
     * @param xml
     * @return
     */
    public static String xml2json(String xml){  
        StringWriter w = new StringWriter();  
        JsonParser jp;
        try {
            jp = xmlMapper.getFactory().createParser(xml);
            JsonGenerator jg = objectMapper.getFactory().createGenerator(w);  
            while (jp.nextToken() != null) {  
                jg.copyCurrentEvent(jp);  
            }  
            jp.close();  
            jg.close();
        } catch (Exception e) {
            e.printStackTrace();
        }  
        return w.toString();  
    }
    /**
     * 當JSON裡只含有Bean的部分屬性時，更新一個已存在Bean，只覆蓋該部分的屬性.
     */
    @SuppressWarnings("unchecked")
    public <T> T update(String jsonString, T object) {
        try {
            return (T) objectMapper.readerForUpdating(object).readValue(jsonString);
        } catch (JsonProcessingException e) {
            logger.warn("update json string:" + jsonString + " to object:" + object + " error.", e);
        } catch (IOException e) {
            logger.warn("update json string:" + jsonString + " to object:" + object + " error.", e);
        }
        return null;
    }
    
    /** 
     * 转换一个xml格式的字符串到json格式 
     *  
     * @param xml 
     *            xml格式的字符串 
     * @return 成功返回json 格式的字符串;失败反回null 
     */  
 
    public static  String xml2JSON(String xml) {  
        JSONObject obj = new JSONObject();  
        try {  
            InputStream is = new ByteArrayInputStream(xml.getBytes("GBK"));  
            SAXBuilder sb = new SAXBuilder();  
            Document doc = sb.build(is);  
            Element root = doc.getRootElement();  
            obj.put(root.getName(), iterateElement(root));  
            return obj.toString();  
        } catch (Exception e) {  
            e.printStackTrace();  
            return null;  
        }  
    }  
    /** 
     * 一个迭代方法  
     */  
    @SuppressWarnings("unchecked")  
    private static Map<String, List>  iterateElement(Element element) {  
        List<?> jiedian = element.getChildren();  
        Element et = null;  
        Map<String, List> obj = new HashMap<String, List>();  
        List<Object> list = null;  
        for (int i = 0; i < jiedian.size(); i++) {  
            list = new LinkedList<Object>();  
            et = (Element) jiedian.get(i);  
            if (et.getTextTrim().equals("")) {  
                if (et.getChildren().size() == 0)  
                    continue;  
                if (obj.containsKey(et.getName())) {  
                    list = (List<Object>) obj.get(et.getName());  
                }  
                list.add(iterateElement(et));  
                obj.put(et.getName(), list);  
            } else {  
                if (obj.containsKey(et.getName())) {  
                    list = (List<Object>) obj.get(et.getName());  
                }  
                list.add(et.getTextTrim());  
                obj.put(et.getName(), list);  
            }  
        }  
        return obj;  
    }  
    public static JavaType getCollectionType(Class<?> collectionClass, Class<?>... elementClasses) {     
        return objectMapper.getTypeFactory().constructParametricType(collectionClass, elementClasses);     
    }     
	   
}  
