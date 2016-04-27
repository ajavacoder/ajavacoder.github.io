package com.nguyenhuu.testserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nguyenhuu.testserver.model.TestConfig;
import com.nguyenhuu.testserver.service.TestService;

@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
public class TestController {
	@Autowired
	TestService testService;
	@RequestMapping(path="/test",method=RequestMethod.POST)
	public ResponseEntity doTests(@RequestBody TestConfig testConfig) {
		testService.doTest(testConfig);
		return new ResponseEntity("OK", HttpStatus.OK);
	}
}
