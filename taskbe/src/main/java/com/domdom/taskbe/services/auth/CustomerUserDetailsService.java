package com.domdom.taskbe.services.auth;

import com.domdom.taskbe.exceptions.NotFoundException;
import com.domdom.taskbe.models.Role;
import com.domdom.taskbe.models.UserEntity;
import com.domdom.taskbe.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerUserDetailsService implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;

    public CustomerUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws NotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email);
        if (userEntity == null) throw new NotFoundException("User " + email + " not found");
//                .orElseThrow(() -> new NotFoundException("User " + email + " not found"));

        return new User(userEntity.getEmail(), userEntity.getPassword(), mapRolesToAuthorities(userEntity.getRoles()));
    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName().toString())).collect(Collectors.toList());
    }
}
