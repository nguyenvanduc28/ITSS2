package com.domdom.taskbe.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.domdom.taskbe.models.enums.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class UserEntity extends BaseEntity {

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "is_active", columnDefinition = "boolean default false")
    private boolean isActive;

    private String password;
    @Column(unique = true)
    private String email;
    private long birthday;
    private String address;


    @Enumerated(EnumType.STRING)
    private Gender gender;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    @JsonManagedReference
    private List<Role> roles;

    @Column(name = "is_deleted", columnDefinition = "boolean default false")
    private boolean isDeleted;
}
