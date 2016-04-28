package com.nguyenhuu.testserver.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    
    @RequestMapping(path="/test",method=RequestMethod.GET)
    public String getTest(HttpServletRequest request, Model model) {
        model.addAttribute("name", request.getRemoteUser());
        return "testcase";
    }
    
    @RequestMapping(path="/",method=RequestMethod.GET)
    public String greeting(Model model) {
        return "redirect:/login";
    }
}
