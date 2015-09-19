package com.nguyenhuu.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AdminController {
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value="/admin", method=RequestMethod.GET)
    public @ResponseBody String admin(HttpServletRequest request) {
        try {
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        return "Hello " + request.getUserPrincipal().toString();
        } catch (Exception ex) {
            return "Error" + ex.getMessage();
        }
    }
}
