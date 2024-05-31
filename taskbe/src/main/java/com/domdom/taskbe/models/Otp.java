package com.domdom.taskbe.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
public class Otp extends BaseEntity {
    private String email;
    private String otp;
    private Date dateExp;
    @Column(columnDefinition = "boolean default false")
    private boolean isExp;
    @Column(columnDefinition = "boolean default false")
    private boolean accept;
    @Column(columnDefinition = "boolean default false")
    private boolean used;
}
