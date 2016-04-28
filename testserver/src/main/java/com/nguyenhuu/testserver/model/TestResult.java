package com.nguyenhuu.testserver.model;

public class TestResult {
	private String testId;
	private Boolean status;
	private int stepNumber;
	private String stepContent;
	private String message;
	public TestResult(String testId, Boolean status, int stepNumber, String stepContent, String message) {
		this.testId = testId;
		this.status = status;
		this.stepNumber = stepNumber;
		this.stepContent = stepContent;
		this.message = message;
	}
	public String getTestId() {
		return testId;
	}
	public void setTestId(String testId) {
		this.testId = testId;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	public int getStepNumber() {
		return stepNumber;
	}
	public void setStepNumber(int stepNumber) {
		this.stepNumber = stepNumber;
	}
	public String getStepContent() {
		return stepContent;
	}
	public void setStepContent(String stepContent) {
		this.stepContent = stepContent;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
