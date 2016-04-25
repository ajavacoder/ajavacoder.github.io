package com.nguyenhuu.testselenium;

import java.io.File;
import java.util.concurrent.TimeUnit;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.support.ui.Select;

public class TestJUnit {
    private WebDriver driver;
    
    @Test
    public void TestFirefox() {
        File pathToFirefoxBinary = new File("/home/nvhuu/tools/firefox/firefox");
        FirefoxBinary firefoxBinary = new FirefoxBinary(pathToFirefoxBinary);
        FirefoxProfile firefoxProfile = new FirefoxProfile();
        driver = new FirefoxDriver(firefoxBinary, firefoxProfile);
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        
        
        driver.get("http://newtours.demoaut.com/");
        driver.findElement(By.partialLinkText("REGISTER")).click();
        driver.findElement(By.name("firstName")).clear();
        driver.findElement(By.name("lastName")).sendKeys("Surname1");
        driver.findElement(By.name("phone")).sendKeys("123456789");
        driver.findElement(By.name("userName")).sendKeys("user1@test.com");
        driver.findElement(By.name("address1")).sendKeys("Test Address");
        driver.findElement(By.name("city")).sendKeys("Test City");
        Select select = new Select(driver.findElement(By.name("country")));
        select.selectByVisibleText("ANGOLA");
        driver.findElement(By.name("email")).sendKeys("user1@test.com");
        driver.findElement(By.name("password")).sendKeys("user1");
        driver.findElement(By.name("confirmPassword")).sendKeys("user1");
        driver.findElement(By.name("register")).click();
    }
    
    @Test
    public void TestChrome() {
        System.setProperty("webdriver.chrome.driver", "/opt/google/chrome/google-chrome");
//        File pathToChromeBinary = new File("/usr/bin/google-chrome-stable");
//        ChromeOptions chromeOptions = new ChromeOptions();
//        chromeOptions.setBinary(pathToChromeBinary);
//        driver = new ChromeDriver(chromeOptions);
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        
        
        driver.get("http://newtours.demoaut.com/");
        driver.findElement(By.partialLinkText("REGISTER")).click();
        driver.findElement(By.name("firstName")).clear();
        driver.findElement(By.name("lastName")).sendKeys("Surname1");
        driver.findElement(By.name("phone")).sendKeys("123456789");
        driver.findElement(By.name("userName")).sendKeys("user1@test.com");
        driver.findElement(By.name("address1")).sendKeys("Test Address");
        driver.findElement(By.name("city")).sendKeys("Test City");
        Select select = new Select(driver.findElement(By.name("country")));
        select.selectByVisibleText("ANGOLA");
        driver.findElement(By.name("email")).sendKeys("user1@test.com");
        driver.findElement(By.name("password")).sendKeys("user1");
        driver.findElement(By.name("confirmPassword")).sendKeys("user1");
        driver.findElement(By.name("register")).click();
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
