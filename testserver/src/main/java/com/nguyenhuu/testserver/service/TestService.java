package com.nguyenhuu.testserver.service;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nguyenhuu.testserver.model.TestCase;
import com.nguyenhuu.testserver.model.TestConfig;
import com.nguyenhuu.testserver.model.TestDriverFactory;

@Service
public class TestService {
    private static final Integer MAX_THREADS = 8;
    
    @Autowired
    private SeleniumService seleniumService;
    
    @Autowired
    private TestDriverFactory testDriverFactory;
    
    public void doTest(TestConfig testConfig) {
        if (testConfig.isParallel()) {
            doTestParallel(testConfig);
        } else {
            doTestSerial(testConfig);
        }
    }

    private void doTestParallel(TestConfig testConfig) {
        ExecutorService executors = Executors.newFixedThreadPool(MAX_THREADS);
        List<TestCase> testCases = testConfig.getTestCases();
        for (int i = 0;i<testCases.size();i++) {
            executors.execute(new TestWorker(testCases.get(i), this));
        }
        executors.shutdown();
        try {
            executors.awaitTermination(60, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            System.out.println("Test case interrupted.");
        }
    }

    private void doTestSerial(TestConfig testConfig) {
        List<TestCase> testCases = testConfig.getTestCases();
        for (int i = 0;i<testCases.size();i++) {
            doSingleTest(testCases.get(i));
        }
    }
    
    private void doSingleTest(TestCase testCase) {
        System.out.println("Test: " + testCase.getTestId());
        WebDriver driver = testDriverFactory.getDriver("chrome");
        seleniumService.doTestSteps(driver, testCase.getTestSteps());
    }
    
    private class TestWorker implements Runnable {
        TestCase testCase;
        TestService testService;
        public TestWorker(TestCase testCase, TestService testService) {
            this.testCase = testCase;
            this.testService = testService;
        }
        @Override
        public void run() {
            testService.doSingleTest(testCase);
        }
    }
}
