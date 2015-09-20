package com.nguyenhuu.config;

import java.util.Collection;
import java.util.HashSet;

import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;
import org.springframework.stereotype.Component;

@Component
public class CustomLdapAuthority implements LdapAuthoritiesPopulator{
    @Override
    public Collection<? extends GrantedAuthority> getGrantedAuthorities(
            DirContextOperations userData, String username) {
        Collection<GrantedAuthority> au = new HashSet<GrantedAuthority>();
        if ("ben".equals(username)) {
            au.add(new SimpleGrantedAuthority("ADMIN"));
        } else au.add(new SimpleGrantedAuthority("USER"));
        return au;
    }

}
