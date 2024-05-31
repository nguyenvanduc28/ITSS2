package com.domdom.taskbe.models;

import com.domdom.taskbe.models.enums.Alert;
import com.domdom.taskbe.models.enums.Repeat;
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
@Table(name = "color")
public class Color extends BaseEntity{
    @Column(name = "type_event")
    private String typeEvent;
    @Column(name = "code_color")
    private String codeColor;
    @Column(name = "is_deleted", columnDefinition = "boolean default false")
    private boolean isDeleted;
}
