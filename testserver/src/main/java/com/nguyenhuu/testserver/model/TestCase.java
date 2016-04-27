package com.nguyenhuu.testserver.model;

public class TestCase {
	private int testId;
	private int order;
	private String testSteps;
	public int getTestId() {
		return testId;
	}
	public void setTestId(int testId) {
		this.testId = testId;
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
