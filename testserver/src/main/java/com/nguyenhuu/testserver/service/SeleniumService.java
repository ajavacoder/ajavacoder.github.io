package com.nguyenhuu.testserver.service;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.springframework.stereotype.Service;

import com.nguyenhuu.testserver.model.TestResult;

@Service
public class SeleniumService {
    public TestResult doTestSteps(WebDriver driver, String testId, String step) {
        String[] steps = step.split("\\n");
        for (int i =0;i<steps.length;i++) {
        	try {
        		doTestStep(driver, steps[i]);        		
        	} catch (Exception ex) {
        		if (driver != null) driver.close();
        		return new TestResult(testId, false, i, ex.getMessage());
        	}
        }
        if (driver != null)  driver.close();
        return new TestResult(testId, true, steps.length, "OK");
    }
    public void doTestStep(WebDriver driver, String step) {
        String[] parts = step.split(" ");
        if(parts.length >= 1) {
            switch (parts[0]) {
                case "open" : get(driver, parts[1]);break;
                case "click" : click(driver, parts[1]);break;
                case "type" : type(driver, parts[1], parts[2]);break;
                case "close" : close(driver);break;
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
