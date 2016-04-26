package com.nguyenhuu.testselenium;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.Select;

public class TestGeneral {
	protected void testExample(WebDriver driver) {
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
        driver.close();
        driver.quit();
	}
	
	protected WebDriver getFirefoxDriver() {
		File pathToFirefoxBinary = new File("C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe");
        FirefoxBinary firefoxBinary = new FirefoxBinary(pathToFirefoxBinary);
        FirefoxProfile firefoxProfile = new FirefoxProfile();
        WebDriver driver = new FirefoxDriver(firefoxBinary, firefoxProfile);
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        return driver;
	}
	
	protected WebDriver getChromeDriver() {
		System.setProperty("webdriver.chrome.driver", "D:\\server\\selenium\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        return driver;
	}
	
	protected WebDriver getIEDriver() {
		System.setProperty("webdriver.ie.driver", "D:\\server\\selenium\\IEDriverServer.exe");
    	WebDriver driver = new InternetExplorerDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        return driver;
	}
	
	protected WebDriver getEdgeDriver() {
		System.setProperty("webdriver.edge.driver", "D:\\server\\selenium\\MicrosoftWebDriver.exe");
    	WebDriver driver = new InternetExplorerDriver();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        return driver;
	}
	
	protected WebDriver getRemoteWebDriver() throws MalformedURLException {
		WebDriver driver = new RemoteWebDriver(new URL("http://127.0.0.1:4444/wd/hub"), DesiredCapabilities.chrome());
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		return driver;
	}
}
