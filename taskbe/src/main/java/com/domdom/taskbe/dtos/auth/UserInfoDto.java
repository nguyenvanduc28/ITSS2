package com.domdom.taskbe.dtos.auth;

import com.domdom.taskbe.models.Role;
import com.domdom.taskbe.models.enums.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
public class UserInfoDto {
    private Integer id;

    private String fullName;

    private boolean isActive;

    private String email;

    private String address;
    private long birthday;


    private Gender gender;
    private List<Role> roles;
}
