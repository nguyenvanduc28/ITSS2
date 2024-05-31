package com.domdom.taskbe.repositories;

import com.domdom.taskbe.dtos.EventDto;
import com.domdom.taskbe.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE event SET is_deleted = true WHERE id =:eventId", nativeQuery = true)
    void deleteEventById(@Param("eventId") int eventId);
    @Query(value = "SELECT * FROM event WHERE user_id=:userId and id=:eventId and is_deleted = false", nativeQuery = true)
    Event findByIdAndUserId( @Param("eventId") int eventId, @Param("userId") int userId);

    @Query(value = "SELECT * FROM event WHERE user_id=:userId and start >= :startDate and end <= :endDate and is_deleted = false order by start", nativeQuery = true)
    List<Event> findAllByStartEndDate(@Param("userId") int userId, @Param("startDate") long startDate, @Param("endDate") long endDate);

    @Query(value = "SELECT COUNT(*) FROM event WHERE user_id=:userId and start >= :startDate and end <= :endDate and is_deleted = false", nativeQuery = true)
    long count(@Param("userId") int userId, @Param("startDate") long startDate, @Param("endDate") long endDate);
}
