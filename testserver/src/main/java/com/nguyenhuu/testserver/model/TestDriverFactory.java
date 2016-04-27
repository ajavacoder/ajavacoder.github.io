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

public class TestDriverFactory {
	private static Integer DEFAULT_TIMEOUT = 10;
	private static String DEFAULT_SERVER = "http://127.0.0.1:4444/wd/hub";
	
	public static WebDriver getDriver(String driverType) {
		switch (driverType) {
			case "firefox" : return getFirefoxDriver();
			case "remote" : return getRemoteWebDriver();
			default : return getChromeDriver();
		}
	}
	
	public static WebDriver getChromeDriver() {
		System.setProperty("webdriver.chrome.driver", "D:\\server\\selenium\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(DEFAULT_TIMEOUT, TimeUnit.SECONDS);
        return driver;
	}
	public static WebDriver getFirefoxDriver() {
		File pathToFirefoxBinary = new File("C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe");
        FirefoxBinary firefoxBinary = new FirefoxBinary(pathToFirefoxBinary);
        FirefoxProfile firefoxProfile = new FirefoxProfile();
        WebDriver driver = new FirefoxDriver(firefoxBinary, firefoxProfile);
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        return driver;
	}
	public static WebDriver getRemoteWebDriver() {
		try {
			WebDriver driver = new RemoteWebDriver(new URL(DEFAULT_SERVER), DesiredCapabilities.chrome());
			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			return driver;
		} catch (Exception ex) {
			return getChromeDriver();
		}
	}
}
