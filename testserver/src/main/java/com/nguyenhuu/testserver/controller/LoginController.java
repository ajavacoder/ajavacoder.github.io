package com.nguyenhuu.testserver.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {
    private static final Logger log = LoggerFactory.getLogger(LoginController.class);
    @RequestMapping(value="/login", method=RequestMethod.GET)
    public String login(HttpServletRequest request) {
        log.info("["+ request.getRemoteAddr() +"] access login page.");
        return "login";
    }
}
