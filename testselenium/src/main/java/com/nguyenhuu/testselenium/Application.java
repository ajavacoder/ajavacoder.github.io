package com.nguyenhuu.testselenium;

import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.testng.TestListenerAdapter;
import org.testng.TestNG;

@SuppressWarnings("unused")
public class Application {

    public static void main(String[] args) {
        //runTestNg();
        runJUnit();
    }
    private static void runTestNg() {
        TestListenerAdapter tla = new TestListenerAdapter();
        TestNG test = new TestNG();
        test.setTestClasses(new Class[] {TestTestNg.class});
        test.addListener(tla);
        test.run();
        System.out.println("Passed: " + tla.getPassedTests().size());
        System.out.println("Failed: " + tla.getFailedTests().size());
    }
    private static void runJUnit() {
        JUnitCore jUnitCore = new JUnitCore();
        Result result = jUnitCore.run(TestJUnit.class);
        System.out.println("Passed: " + (result.getRunCount() - result.getFailureCount() - result.getIgnoreCount()));
        System.out.println("Failed: " + result.getFailureCount());
    }
}
