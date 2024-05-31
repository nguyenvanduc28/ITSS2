package com.domdom.taskbe.controllers;

import com.domdom.taskbe.dtos.EventDto;
import com.domdom.taskbe.dtos.ResponseObject;
import com.domdom.taskbe.dtos.password.EmailRequest;
import com.domdom.taskbe.models.UserEntity;
import com.domdom.taskbe.services.PasswordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/password")
@RequiredArgsConstructor
public class PasswordController {
    private final PasswordService passwordService;
    @PostMapping("/send-email")
    public ResponseEntity<ResponseObject> sendEmail(@RequestBody @Valid EmailRequest emailRequest) {
        passwordService.sendMail(emailRequest);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("đã gửi otp đến email")
                .data(null)
                .build());
    }
    @PostMapping("/send-otp")
    public ResponseEntity<ResponseObject> sendOtp(@RequestBody @Valid EmailRequest emailRequest) {
        passwordService.sendOtp(emailRequest);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("đã xác nhận otp")
                .data(null)
                .build());
    }
    @PostMapping("/change")
    public ResponseEntity<ResponseObject> chanegPass(@RequestBody @Valid EmailRequest emailRequest) {
        passwordService.changePass(emailRequest);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("đã đổi mật khẩu thành công")
                .data(null)
                .build());
    }
}
