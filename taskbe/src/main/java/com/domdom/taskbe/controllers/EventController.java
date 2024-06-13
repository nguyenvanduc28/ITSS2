package com.domdom.taskbe.controllers;

import com.domdom.taskbe.dtos.EventDto;
import com.domdom.taskbe.dtos.ResponseObject;
import com.domdom.taskbe.dtos.TimeRangerDto;
import com.domdom.taskbe.services.event.EventService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {
    @Autowired
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> createEvent(@RequestBody @Valid EventDto eventDto) {
        EventDto eventDto1 = eventService.createEvent(eventDto);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("created event")
                .data(eventDto1)
                .build());
    }

    @PutMapping("")
    public ResponseEntity<ResponseObject> updateEvent(@RequestBody @Valid EventDto eventDto) {
        EventDto eventDto1 = eventService.updateEvent(eventDto);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("updated event")
                .data(eventDto1)
                .build());
    }

    @DeleteMapping("{eventId}")
    public ResponseEntity<ResponseObject> deleteEvent(@PathVariable("eventId") int eventId) {
        eventService.deleteEventById(eventId);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("deleted event")
                .data(null)
                .build());
    }
    @PostMapping("list")
    public ResponseEntity<ResponseObject> getListEventByStartEndDate(@RequestBody @Valid TimeRangerDto timeRangerDto) {
        List<EventDto> eventDtos= eventService.getAllEventByStartEndDate(timeRangerDto.getStartDate(), timeRangerDto.getEndDate());
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("success")
                .data(eventDtos)
                .build());
    }

    @PostMapping("/count")
    public ResponseEntity<ResponseObject> getCountEventByStartEndDate(@RequestBody @Valid TimeRangerDto timeRangerDto) {
        long count = eventService.countAllEventyStartEndDate(timeRangerDto.getStartDate(), timeRangerDto.getEndDate());
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("success")
                .data(count)
                .build());
    }
    @GetMapping("/priority")
    public ResponseEntity<ResponseObject> getEventsByPriority() {
        List<EventDto> eventDtos= eventService.getAllEventByPriority();
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("success")
                .data(eventDtos)
                .build());
    }
    @GetMapping("/noti")
    public ResponseEntity<ResponseObject> getEventsNoti() {
        List<EventDto> eventDtos= eventService.getAllEventNoti();
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("success")
                .data(eventDtos)
                .build());
    }
}
