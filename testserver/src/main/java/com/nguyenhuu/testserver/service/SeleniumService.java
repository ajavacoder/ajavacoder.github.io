package com.nguyenhuu.testserver.service;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.springframework.stereotype.Service;

@Service
public class SeleniumService {
    public void doTestSteps(WebDriver driver, String step) {
        String[] steps = step.split("\\n");
        for (int i =0;i<steps.length;i++) {
            doTestStep(driver, steps[i]);
        }
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
    
    //TODO: implement encrypt password
    //TODO: enhance log
    //TODO: implement more command
    //TODO: implement manage testcase back-end
    //TODO: implement manage testcase front-end
    //TODO: implement demo page
    //TODO: implement TestResult
    //TODO: screenshot browser
}
