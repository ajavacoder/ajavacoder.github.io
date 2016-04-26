package com.nguyenhuu.testselenium;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;


public class TestJUnit extends TestGeneral{
    private WebDriver driver;
    
    @Test
    public void TestFirefox() {
        File pathToFirefoxBinary = new File("C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe");
        FirefoxBinary firefoxBinary = new FirefoxBinary(pathToFirefoxBinary);
        FirefoxProfile firefoxProfile = new FirefoxProfile();
        driver = new FirefoxDriver(firefoxBinary, firefoxProfile);
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);        
        
        testExample(driver);
    }
    
    @Test
    public void TestChrome() {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\nguye_000\\Downloads\\chromedriver_win32\\chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        
        testExample(driver);
    }
    
    @Test
    public void TestIE() {
    	System.setProperty("webdriver.ie.driver", "C:\\Users\\nguye_000\\Downloads\\IEDriverServer_x64_2.53.1\\IEDriverServer.exe");
    	driver = new InternetExplorerDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        
        testExample(driver);
    }
    
    @Test
    public void TestEdge() {
    	System.setProperty("webdriver.edge.driver", "C:\\Program Files (x86)\\Microsoft Web Driver\\MicrosoftWebDriver.exe");
    	driver = new InternetExplorerDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        
        testExample(driver);
    }
    
    @Test
    public void TestRemote() throws MalformedURLException {
    	driver = new RemoteWebDriver(new URL("http://127.0.0.1:4444/wd/hub"), DesiredCapabilities.edge());
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        
        testExample(driver);
    }
    
    @Before
    public void beforeClass() {
          
    }
    
    @After
    public void afterClass() {
        if(driver!=null) 
        {
            driver.close();
            driver.quit();
        }
    }
}
