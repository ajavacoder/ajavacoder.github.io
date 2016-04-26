package com.nguyenhuu.testselenium;

import java.net.MalformedURLException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;


public class TestJUnit extends TestGeneral{
    private WebDriver driver;
    
    @Test
    public void TestFirefox() {
    	driver = getFirefoxDriver();
        testExample(driver);
    }
    
    @Test
    public void TestChrome() {
    	driver = getChromeDriver();
        testExample(driver);
    }
    
    @Test
    public void TestIE() {
    	driver = getIEDriver();
        testExample(driver);
    }
    
    @Test
    public void TestEdge() {
    	driver = getEdgeDriver();
        testExample(driver);
    }
    
    @Test
    public void TestRemote() throws MalformedURLException {
    	driver = getRemoteWebDriver();
        testExample(driver);
    }
    
    @Before
    public void beforeClass() {
          
    }
    
    @After
    public void afterClass() {
    	
    }
}
