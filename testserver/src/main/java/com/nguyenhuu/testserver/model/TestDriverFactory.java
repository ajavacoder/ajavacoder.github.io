package com.nguyenhuu.testserver.model;

import java.io.File;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class TestDriverFactory {
    
    @Value("${path.chrome}")
    private String chromePath;
    
    @Value("${path.firefox}")
    private String firefoxPath;
    
    @Value("${path.remote}")
    private String remotePath;
    
    @Value("${time.timeout:30}")
    private Integer timeout;
    
    public WebDriver getDriver(String driverType) {
        switch (driverType) {
            case "firefox" : return getFirefoxDriver();
            case "remote" : return getRemoteWebDriver();
            default : return getChromeDriver();
        }
    }
    
    public WebDriver getChromeDriver() {
        System.setProperty("webdriver.chrome.driver", chromePath);
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(timeout, TimeUnit.SECONDS);
        return driver;
    }
    
    public WebDriver getFirefoxDriver() {
        File pathToFirefoxBinary = new File(firefoxPath);
        FirefoxBinary firefoxBinary = new FirefoxBinary(pathToFirefoxBinary);
        FirefoxProfile firefoxProfile = new FirefoxProfile();
        WebDriver driver = new FirefoxDriver(firefoxBinary, firefoxProfile);
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        return driver;
    }
    
    public WebDriver getRemoteWebDriver() {
        try {
            WebDriver driver = new RemoteWebDriver(new URL(remotePath), DesiredCapabilities.chrome());
            driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
            return driver;
        } catch (Exception ex) {
            return getChromeDriver();
        }
    }
}
