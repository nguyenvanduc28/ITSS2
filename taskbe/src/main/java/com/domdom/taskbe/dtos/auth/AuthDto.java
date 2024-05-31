package com.domdom.taskbe.dtos.auth;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthDto {

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;
}
