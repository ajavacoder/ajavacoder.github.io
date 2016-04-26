package com.nguyenhuu.testselenium;

import java.net.MalformedURLException;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class TestTestNg extends TestGeneral {
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
    
    @BeforeClass
    public void beforeClass() {
        
    }
    
    @AfterClass
    public void afterClass() {
    	
    }
}
