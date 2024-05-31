package com.domdom.taskbe.controllers;

import com.domdom.taskbe.dtos.EventDto;
import com.domdom.taskbe.dtos.ResponseObject;
import com.domdom.taskbe.dtos.TimeRangerDto;
import com.domdom.taskbe.models.UserEntity;
import com.domdom.taskbe.repositories.UserRepository;
import com.domdom.taskbe.services.event.EventService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final EventService eventService;

    public EventController(UserRepository userRepository, EventService eventService) {
        this.userRepository = userRepository;
        this.eventService = eventService;
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> createEvent(@RequestBody @Valid EventDto eventDto, @AuthenticationPrincipal UserDetails userDetails) {
        String emailUser = userDetails.getUsername();
        UserEntity userEntity = userRepository.findByEmail(emailUser);
        EventDto eventDto1 = eventService.createEvent(eventDto, userEntity);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("created event")
                .data(eventDto1)
                .build());
    }

    @PutMapping("")
    public ResponseEntity<ResponseObject> updateEvent(@RequestBody @Valid EventDto eventDto, @AuthenticationPrincipal UserDetails userDetails) {
        String emailUser = userDetails.getUsername();
        UserEntity userEntity = userRepository.findByEmail(emailUser);
        EventDto eventDto1 = eventService.updateEvent(eventDto, userEntity);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("updated event")
                .data(eventDto1)
                .build());
    }

    @DeleteMapping("{eventId}")
    public ResponseEntity<ResponseObject> deleteEvent(@PathVariable("eventId") int eventId, @AuthenticationPrincipal UserDetails userDetails) {
        String emailUser = userDetails.getUsername();
        UserEntity userEntity = userRepository.findByEmail(emailUser);
        eventService.deleteEventById(eventId, userEntity);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("deleted event")
                .data(null)
                .build());
    }
    @PostMapping("list")
    public ResponseEntity<ResponseObject> getListEventByStartEndDate(@RequestBody @Valid TimeRangerDto timeRangerDto, @AuthenticationPrincipal UserDetails userDetails) {
        String emailUser = userDetails.getUsername();
        UserEntity userEntity = userRepository.findByEmail(emailUser);
        List<EventDto> eventDtos= eventService.getAllEventByStartEndDate(timeRangerDto.getStartDate(), timeRangerDto.getEndDate(), userEntity);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("success")
                .data(eventDtos)
                .build());
    }

    @PostMapping("/count")
    public ResponseEntity<ResponseObject> getCountEventByStartEndDate(@RequestBody @Valid TimeRangerDto timeRangerDto, @AuthenticationPrincipal UserDetails userDetails) {
        String emailUser = userDetails.getUsername();
        UserEntity userEntity = userRepository.findByEmail(emailUser);
        long count = eventService.countAllEventyStartEndDate(timeRangerDto.getStartDate(), timeRangerDto.getEndDate(), userEntity);
        return ResponseEntity.ok(ResponseObject.builder()
                .responseCode(200)
                .message("success")
                .data(count)
                .build());
    }
}
