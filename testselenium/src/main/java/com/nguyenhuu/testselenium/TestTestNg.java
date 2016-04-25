package com.nguyenhuu.testselenium;

import java.io.File;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class TestTestNg {
    private WebDriver driver;
    
    @Test
    public void Test() {
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
    
    @BeforeClass
    public void beforeClass() {
        File pathToFirefoxBinary = new File("/home/nvhuu/tools/firefox/firefox");
        FirefoxBinary firefoxBinary = new FirefoxBinary(pathToFirefoxBinary);
        FirefoxProfile firefoxProfile = new FirefoxProfile();
        driver = new FirefoxDriver(firefoxBinary, firefoxProfile);
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);  
    }
    
    @AfterClass
    public void afterClass() {
        if(driver!=null) 
        {
            driver.close();
            driver.quit();
        }
    }
}
