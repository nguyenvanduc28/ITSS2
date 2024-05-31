package com.domdom.taskbe.models;

import com.domdom.taskbe.models.enums.RoleType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToMany;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private RoleType name;

    @ManyToMany(mappedBy = "roles")
    @JsonBackReference
    private List<UserEntity> userEntities;
}
