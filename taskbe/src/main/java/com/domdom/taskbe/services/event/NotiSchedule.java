package com.domdom.taskbe.services.event;

import com.domdom.taskbe.models.Event;
import com.domdom.taskbe.repositories.EventRepository;

import com.domdom.taskbe.services.event.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.time.ZoneOffset;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class NotiSchedule {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private MailService emailService;

    @Scheduled(fixedRate = 60000) // 1 minute
    public void scheduleTaskWithFixedRate() {
        ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        LocalDateTime now = LocalDateTime.now(zoneId);
        long startDate = now.toEpochSecond(ZoneOffset.ofHours(7)) * 1000 + 30*60000;
        List<Event> events = eventRepository.findAllByStartDate(startDate);
        for (Event event : events) {
            String emailContent = formatEmailContent(event);
            if ((event.getStart() - startDate) / 60000 == 0) {
                emailService.sendSimpleMessage(event.getEmail(), "Notification of Upcoming Event", emailContent);
            }
        }
    }

    private String formatEmailContent(Event event) {
        ZoneId zoneId = ZoneId.of("Asia/Ho_Chi_Minh");
        LocalDateTime startTime = LocalDateTime.ofEpochSecond(event.getStart() / 1000, 0, ZoneOffset.ofHours(7));
        LocalDateTime endTime = LocalDateTime.ofEpochSecond(event.getEnd() / 1000, 0, ZoneOffset.ofHours(7));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm, dd-MM-yyyy");

        String formattedStartTime = startTime.format(formatter);
        String formattedEndTime = endTime.format(formatter);

        return String.format("Title: %s\nTime: %s - %s\nDescription: %s\nPriority: Level %d",
                event.getTitle(),
                formattedStartTime,
                formattedEndTime,
                event.getDescription(),
                event.getRating());
    }
}
