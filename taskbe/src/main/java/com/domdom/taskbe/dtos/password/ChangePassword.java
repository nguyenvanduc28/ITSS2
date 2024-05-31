package com.domdom.taskbe.dtos.password;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePassword {
    private String oldPassword;
    private String newPassword;
}
