package com.domdom.taskbe.services.event;

import com.domdom.taskbe.dtos.EventDto;
import com.domdom.taskbe.exceptions.BadRequestException;
import com.domdom.taskbe.models.Event;
import com.domdom.taskbe.repositories.EventRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class EventService {
    private ModelMapper modelMapper = new ModelMapper();
    @Autowired
    private EventRepository eventRepository;

    public EventDto createEvent(EventDto eventDto) {
        Event event = modelMapper.map(eventDto, Event.class);
        Event eventNew = eventRepository.save(event);
        if (eventNew == null) throw new BadRequestException("Lỗi tạo mới sự kiện");
        return modelMapper.map(eventNew, EventDto.class);
    }
    public EventDto updateEvent(EventDto eventDto) {
        Event event = eventRepository.findByEventId(eventDto.getId());
        if (event == null || event.isDeleted()) throw new BadRequestException("Không tìm thấy event");
        Event eventUpdate = modelMapper.map(eventDto, Event.class);
        Event eventUpdated = eventRepository.save(eventUpdate);
        if (eventUpdated == null) throw new BadRequestException("Lỗi cập nhật sự kiện");
        return modelMapper.map(eventUpdated, EventDto.class);
    }

    public void deleteEventById(int eventId) {
        Event event = eventRepository.findByEventId(eventId);
        if (event == null || event.isDeleted()) throw new BadRequestException("Không tìm thấy event");
        event.setDeleted(true);
        eventRepository.save(event);
    }

    public List<EventDto> getAllEventByStartEndDate(long startDate, long endDate) {
        List<Event> events = eventRepository.findAllByStartEndDate(startDate, endDate);
        if (events == null) throw new BadRequestException("Lỗi lấy danh sách event");
        return Arrays.asList(modelMapper.map(events, EventDto[].class));
    }

    public List<EventDto> getAllEventByPriority(){
        List<Event> events = eventRepository.findAllByPriority();
        if (events == null) throw new BadRequestException("Lỗi lấy danh sách event");
        return Arrays.asList(modelMapper.map(events, EventDto[].class));
    }

    public long countAllEventyStartEndDate(long startDate, long endDate) {
        long count = eventRepository.count(startDate, endDate);
        return count;
    }
    public List<EventDto> getAllEventNoti(){
        ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        LocalDateTime now = LocalDateTime.now(zoneId);
        long startDate = now.toEpochSecond(ZoneOffset.ofHours(7)) * 1000 + 30*60000;
        List<Event> events = eventRepository.findAllByStartDate(startDate);
        List<Event> events1 = new ArrayList<>();
        for (Event event : events) {
            if ((event.getStart() - startDate) / 60000 == 0) {
                events1.add(event);
            }
        }
        return Arrays.asList(modelMapper.map(events1, EventDto[].class));
    }
}
