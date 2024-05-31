package com.domdom.taskbe.dtos.password;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailRequest {
    @NotBlank
    private String email;
    private String otp;
    private String password;
    private String verifyPassword;
}
