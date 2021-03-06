package com.nguyenhuu.testserver.model;

import java.util.List;

public class TestConfig {
    private String driverType;
    private String projectName;
    private boolean isParallel;
    private List<TestCase> testCases;
    public String getDriverType() {
        return driverType;
    }
    public void setDriverType(String driverType) {
        this.driverType = driverType;
    }
    public String getProjectName() {
        return projectName;
    }
    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
    public boolean isParallel() {
        return isParallel;
    }
    public void setParallel(boolean isParallel) {
        this.isParallel = isParallel;
    }
    public List<TestCase> getTestCases() {
        return testCases;
    }
    public void setTestCases(List<TestCase> testCases) {
        this.testCases = testCases;
    }
}
