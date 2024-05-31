package com.domdom.taskbe.dtos.auth;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class VerifyTokenRequest {

    @NotNull
    private String token;
}
