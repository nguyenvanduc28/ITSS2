package com.domdom.taskbe.models;

import com.domdom.taskbe.models.enums.Alert;
import com.domdom.taskbe.models.enums.Repeat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "event")
public class Event extends BaseEntity{
    @Column(name = "user_id")
    private Integer userId;
    private String title;
    @Column(name = "all_day", columnDefinition = "boolean default false")
    private boolean allDay;
    private long start;
    private long end;
    private long completeDate;
    private String description;
    private String status;
    @Enumerated(EnumType.STRING)
    @Column(name = "repeat_type")
    private Repeat repeatType;
    @Enumerated(EnumType.STRING)
    @Column(name = "alert_type")
    private Alert alertType;
    @Column(name = "is_deleted", columnDefinition = "boolean default false")
    private boolean isDeleted;
    private String color;
}
