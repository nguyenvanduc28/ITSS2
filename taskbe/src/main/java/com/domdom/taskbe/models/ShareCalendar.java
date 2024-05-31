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
@Table(name = "share_calendar")
public class ShareCalendar extends BaseEntity{
    @Column(name = "user_id_from")
    private Integer userIdFrom;
    private long start;
    private long end;
    @Column(name = "is_deleted", columnDefinition = "boolean default false")
    private boolean isDeleted;
}
