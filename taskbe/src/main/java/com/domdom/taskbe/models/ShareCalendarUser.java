package com.domdom.taskbe.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "share_calendar_user")
public class ShareCalendarUser extends BaseEntity{
    @Column(name = "share_calendar_id")
    private Integer shareCalendarId;
    @Column(name = "user_id_to")
    private Integer userIdTo;
    @Column(name = "is_deleted", columnDefinition = "boolean default false")
    private boolean isDeleted;
}
