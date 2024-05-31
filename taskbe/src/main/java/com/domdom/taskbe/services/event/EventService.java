package com.domdom.taskbe.services.event;

import com.domdom.taskbe.dtos.EventDto;
import com.domdom.taskbe.exceptions.BadRequestException;
import com.domdom.taskbe.models.Event;
import com.domdom.taskbe.models.UserEntity;
import com.domdom.taskbe.repositories.EventRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class EventService {
    private ModelMapper modelMapper = new ModelMapper();
    @Autowired
    private EventRepository eventRepository;

    public EventDto createEvent(EventDto eventDto, UserEntity user) {
        Event event = modelMapper.map(eventDto, Event.class);
        event.setUserId(user.getId());
        Event eventNew = eventRepository.save(event);
        if (eventNew == null) throw new BadRequestException("Lỗi tạo mới sự kiện");
        return modelMapper.map(eventNew, EventDto.class);
    }
    public EventDto updateEvent(EventDto eventDto, UserEntity user) {
        Event event = eventRepository.findByIdAndUserId(eventDto.getId(), user.getId());
        if (event == null || event.isDeleted()) throw new BadRequestException("Không tìm thấy event");
        Event eventUpdate = modelMapper.map(eventDto, Event.class);
        Event eventUpdated = eventRepository.save(eventUpdate);
        if (eventUpdated == null) throw new BadRequestException("Lỗi cập nhật sự kiện");
        return modelMapper.map(eventUpdated, EventDto.class);
    }

    public void deleteEventById(int eventId, UserEntity user) {
        Event event = eventRepository.findByIdAndUserId(eventId, user.getId());
        if (event == null || event.isDeleted()) throw new BadRequestException("Không tìm thấy event");
        event.setDeleted(true);
        eventRepository.save(event);
    }

    public List<EventDto> getAllEventByStartEndDate(long startDate, long endDate, UserEntity user) {
        List<Event> events = eventRepository.findAllByStartEndDate(user.getId(), startDate, endDate);
        if (events == null) throw new BadRequestException("Lỗi lấy danh sách event");
        return Arrays.asList(modelMapper.map(events, EventDto[].class));
    }

    public long countAllEventyStartEndDate(long startDate, long endDate, UserEntity user) {
        long count = eventRepository.count(user.getId(), startDate, endDate);
        return count;
    }
}
