package com.domdom.taskbe.dtos;

import com.domdom.taskbe.models.enums.Gender;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
public class UserUpdateDto {
    private Integer id;

    private String fullName;


    private String email;

    private String address;
    private long birthday;

    private Gender gender;
}
