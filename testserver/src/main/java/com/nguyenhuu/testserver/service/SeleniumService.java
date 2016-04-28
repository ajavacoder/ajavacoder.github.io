package com.nguyenhuu.testserver.service;

import java.util.Map;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.springframework.stereotype.Service;

import com.nguyenhuu.testserver.model.TestResult;

@Service
public class SeleniumService {
    public TestResult doTestSteps(Map buffer, WebDriver driver, String testId, String step) {
        String[] steps = step.split("\\n");
        for (int i =0;i<steps.length;i++) {
        	try {
        		doTestStep(buffer, driver, steps[i]);        		
        	} catch (Exception ex) {
        		if (driver != null) driver.close();
        		return new TestResult(testId, false, i, step, ex.getMessage());
        	}
        }
        if (driver != null)  driver.close();
        return new TestResult(testId, true, steps.length,"done", "OK");
    }
    public void doTestStep(Map buffer, WebDriver driver, String step) throws Exception {
    	System.out.println("Do: " + step);
        String[] parts = step.split("`");
        if(parts.length >= 1) {
            switch (parts[0]) {
                case "open" : get(driver, parts[1]);break;
                case "click" : click(driver, parts[1]);break;
                case "type" : type(driver, parts[1], parts[2]);break;
                case "close" : close(driver);break;
                case "store" : store(buffer, driver, parts[1], parts[2]);break;
                case "wait" : wait(driver, parts[1]);break;
                case "moveto" : moveto(driver, parts[1]);break;
            }
        }
    }
    
    private void get(WebDriver driver, String url) {
        driver.get(url);
    }
    private void click(WebDriver driver, String xpath) {
        driver.findElement(By.xpath(xpath)).click();
    }
    private void type(WebDriver driver, String xpath, String keys) {
        driver.findElement(By.xpath(xpath)).sendKeys(keys);
    }
    private void close(WebDriver driver) {
        driver.close();
    }
    private void store(Map buffer, WebDriver driver, String xpath, String item) {
    	String text = driver.findElement(By.xpath(xpath)).getText();
    	buffer.put(item, text);
    }
    private void wait(WebDriver driver, String xpath) throws Exception {
    	for (int second = 0;; second++) {
        	if (second >= 60) throw new Exception("timeout");
        	try { if (driver.findElement(By.xpath(xpath)).isDisplayed()) break; } catch (Exception e) {}
        	Thread.sleep(1000);
        }
    }
    private void moveto(WebDriver driver, String xpath) {
    	Actions action = new Actions(driver);
    	WebElement we = driver.findElement(By.xpath(xpath));
    	action.moveToElement(we);
    	action.perform();
    }
    
    //TODO: using reflection to invoke functions
    
    //TODO: implement encrypt password
    //TODO: enhance log
    //TODO: implement more command
    //TODO: implement manage testcase back-end
    //TODO: implement manage testcase front-end
    //TODO: implement demo page
    //TODO: implement TestResult
    //TODO: screenshot browser
}
