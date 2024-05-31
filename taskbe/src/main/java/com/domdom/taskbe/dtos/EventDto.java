package com.domdom.taskbe.dtos;

import com.domdom.taskbe.models.enums.Alert;
import com.domdom.taskbe.models.enums.Repeat;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Getter
@Setter
public class EventDto {
    private Integer id;
    private Integer userId;
    private String status;
    private String title;
    private boolean allDay;
    private long start;
    private long end;
    private long completeDate;
    private String description;
    private Repeat repeatType;
    private Alert alertType;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String color;
}
