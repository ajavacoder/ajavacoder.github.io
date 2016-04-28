package com.nguyenhuu.testserver.service;

import java.util.ArrayList;
import java.util.Arrays;
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
import com.nguyenhuu.testserver.model.TestResult;

@Service
public class TestService {
    private static final Integer MAX_THREADS = 8;
    
    @Autowired
    private SeleniumService seleniumService;
    
    @Autowired
    private TestDriverFactory testDriverFactory;
    
    public List<TestResult> doTest(TestConfig testConfig) {
        if (testConfig.isParallel()) {
            return doTestParallel(testConfig);
        } else {
            return doTestSerial(testConfig);
        }
    }

    private List<TestResult> doTestParallel(TestConfig testConfig) {
        ExecutorService executors = Executors.newFixedThreadPool(MAX_THREADS);
        List<TestCase> testCases = testConfig.getTestCases();
        TestResult[] results = new TestResult[testCases.size()];
        for (int i = 0;i<testCases.size();i++) {
            executors.execute(new TestWorker(testCases.get(i), this, results, i));
        }
        executors.shutdown();
        try {
            executors.awaitTermination(60, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            System.out.println("Test case interrupted.");
        }
        return new ArrayList<TestResult>(Arrays.asList(results));
    }

    private List<TestResult> doTestSerial(TestConfig testConfig) {
        List<TestCase> testCases = testConfig.getTestCases();
        List<TestResult> testResults = new ArrayList<TestResult>();
        for (int i = 0;i<testCases.size();i++) {
            testResults.add(doSingleTest(testCases.get(i)));
        }
        return testResults;
    }
    
    private TestResult doSingleTest(TestCase testCase) {
        System.out.println("Test: " + testCase.getTestId());
        WebDriver driver = testDriverFactory.getDriver("chrome");
        return seleniumService.doTestSteps(driver, testCase.getTestId(), testCase.getTestSteps());
    }
    
    private class TestWorker implements Runnable {
        TestCase testCase;
        TestService testService;
        TestResult[] results;
        int index;
        public TestWorker(TestCase testCase, TestService testService, TestResult[] results, int i) {
            this.testCase = testCase;
            this.testService = testService;
            this.results = results;
            this.index = i;
        }
        @Override
        public void run() {
            results[index] = testService.doSingleTest(testCase);
        }
    }
}
