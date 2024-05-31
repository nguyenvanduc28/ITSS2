package com.domdom.taskbe.controllers;

import com.domdom.taskbe.dtos.EventDto;
import com.domdom.taskbe.dtos.ResponseObject;
import com.domdom.taskbe.dtos.UserUpdateDto;
import com.domdom.taskbe.dtos.auth.AuthDto;
import com.domdom.taskbe.dtos.auth.AuthResponse;
import com.domdom.taskbe.dtos.auth.UserInfoDto;
import com.domdom.taskbe.dtos.auth.VerifyTokenRequest;
import com.domdom.taskbe.dtos.password.ChangePassword;
import com.domdom.taskbe.models.UserEntity;
import com.domdom.taskbe.repositories.UserRepository;
import com.domdom.taskbe.services.UserService;
import com.domdom.taskbe.services.auth.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("login")
    public ResponseEntity<ResponseObject> login(
            @RequestBody @Valid AuthDto authDto
            ) {

        AuthResponse authResponse = authService.authenticate(authDto);

        return ResponseEntity.ok(ResponseObject.builder()
                                .data(authResponse)
                                .message("login successfully")
                                .responseCode(HttpStatus.OK.value())
                                .build());
    }
    @PutMapping("update")
    public ResponseEntity<ResponseObject> update(@RequestBody @Valid UserUpdateDto userInfoDto, @AuthenticationPrincipal UserDetails userDetails) {
        String emailUser = userDetails.getUsername();
        UserEntity userEntity = userRepository.findByEmail(emailUser);
        UserInfoDto userInfoDtoN = userService.updateProfile(userInfoDto, userEntity);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("updated user")
                .data(userInfoDtoN)
                .build());
    }

    @PostMapping("register")
    public ResponseEntity<ResponseObject> register(
            @RequestBody @Valid AuthDto authDto
    ) {
        AuthResponse authResponse = authService.register(authDto);

        return ResponseEntity.ok(ResponseObject.builder()
                        .data(authResponse)
                        .message("register successfully")
                        .responseCode(HttpStatus.OK.value())
                        .build());
    }

    @PostMapping("verify-token")
    public ResponseEntity<ResponseObject> verifyToken(
            @RequestBody @Valid VerifyTokenRequest request
    ) {
        UserInfoDto userInfoDto = authService.verifyToken(request);
        return ResponseEntity.ok(ResponseObject.builder()
                                    .responseCode(200)
                                    .data(userInfoDto)
                                    .message("token is valid")
                                    .build());
    }

    @PostMapping("change-password")
    public ResponseEntity<ResponseObject> changePassword(
            @RequestBody @Valid ChangePassword changePassword,@AuthenticationPrincipal UserDetails userDetails
            ) {
        String emailUser = userDetails.getUsername();
        UserEntity userEntity = userRepository.findByEmail(emailUser);
        UserInfoDto user = authService.changePassword(changePassword, userEntity);

        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("updated user")
                .data(user)
                .build());
    }
}
