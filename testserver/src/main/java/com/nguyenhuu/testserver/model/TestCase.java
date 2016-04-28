package com.nguyenhuu.testserver.model;

import java.util.List;

public class TestCase {
    private String testId;
    private List<String> dependsOn; 
    private int order;
    private String testSteps;
    public String getTestId() {
        return testId;
    }
    public void setTestId(String testId) {
        this.testId = testId;
    }
    public List<String> getDependsOn() {
        return dependsOn;
    }
    public void setDependsOn(List<String> dependsOn) {
        this.dependsOn = dependsOn;
    }
    public int getOrder() {
        return order;
    }
    public void setOrder(int order) {
        this.order = order;
    }
    public String getTestSteps() {
        return testSteps;
    }
    public void setTestSteps(String testSteps) {
        this.testSteps = testSteps;
    }
    public void doTest() {
        System.out.println("Test: " + getTestId());
    }
}
