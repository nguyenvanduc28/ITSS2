package com.domdom.taskbe.services.auth;


import com.domdom.taskbe.dtos.auth.AuthDto;
import com.domdom.taskbe.dtos.auth.AuthResponse;
import com.domdom.taskbe.dtos.auth.UserInfoDto;
import com.domdom.taskbe.dtos.auth.VerifyTokenRequest;
import com.domdom.taskbe.dtos.password.ChangePassword;
import com.domdom.taskbe.exceptions.BadRequestException;
import com.domdom.taskbe.exceptions.NotFoundException;
import com.domdom.taskbe.exceptions.UnAuthorizedException;
import com.domdom.taskbe.exceptions.UserAlreadyExistsException;
import com.domdom.taskbe.models.Role;
import com.domdom.taskbe.models.UserEntity;
import com.domdom.taskbe.models.enums.RoleType;
import com.domdom.taskbe.repositories.RoleRepository;
import com.domdom.taskbe.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RoleRepository roleRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final JwtService jwtService;

    @Autowired
    private final AuthenticationManager authenticationManager;
    private ModelMapper modelMapper = new ModelMapper();
    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository, PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse authenticate(AuthDto authDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authDto.getEmail(),
                        authDto.getPassword()
                )
        );
        String token = jwtService.generateToken(authentication.getName());
        UserEntity userEntity = userRepository.findByEmail(authDto.getEmail());
        if (userEntity == null) throw new NotFoundException("profile not found");

//                .orElseThrow(() -> new NotFoundException("profile not found"));
        ModelMapper modelMapper = new ModelMapper();
        return AuthResponse.builder()
                .userInfoDto(modelMapper.map(userEntity, UserInfoDto.class))
                .token(token)
                .build();
    }

    public AuthResponse register(AuthDto authDto) {
        UserEntity userEntity = userRepository.findByEmail(authDto.getEmail());
        if (userEntity == null) userEntity = new UserEntity();
        else throw new UserAlreadyExistsException("Email đã tồn tại");
//                .orElseThrow(() -> new NotFoundException("profile not found"));
        userEntity.setEmail(authDto.getEmail());
        userEntity.setPassword(passwordEncoder.encode(authDto.getPassword()));
        List<Role> roles = new ArrayList<>();
        Role role = roleRepository.findByName(RoleType.USER);
        roles.add(role);

        userEntity.setRoles(roles);
        userRepository.save(userEntity);
        var jwtToken = jwtService.generateToken(userEntity.getEmail());
        ModelMapper modelMapper = new ModelMapper();
        return AuthResponse.builder()
                .userInfoDto(modelMapper.map(userEntity, UserInfoDto.class))
                .token(jwtToken)
                .build();
    }

    public UserInfoDto verifyToken(VerifyTokenRequest request) {
        String email = jwtService.extractUsername(request.getToken());
        if (!jwtService.isTokenValid(request.getToken(), email)) {
            throw new UnAuthorizedException();
        }

        UserEntity userEntity = userRepository.findByEmail(email);
        if (userEntity == null) throw new NotFoundException("profile not found");

//                .orElseThrow(() -> new NotFoundException("profile not found"));
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(userEntity, UserInfoDto.class);
    }

    public UserInfoDto changePassword(ChangePassword changePassword, UserEntity userEntity) {
        if (!passwordEncoder.matches(changePassword.getOldPassword(), userEntity.getPassword())) throw new BadRequestException("Mật khẩu không đúng");
        userEntity.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
        UserEntity user = userRepository.save(userEntity);
        return modelMapper.map(user, UserInfoDto.class);
    }

}
