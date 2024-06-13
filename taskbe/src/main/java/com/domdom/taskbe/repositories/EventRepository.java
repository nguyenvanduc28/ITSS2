package com.domdom.taskbe.repositories;

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
    @Query(value = "SELECT * FROM event WHERE id=:eventId and is_deleted = false", nativeQuery = true)
    Event findByEventId(@Param("eventId") int eventId);

    @Query(value = "SELECT * FROM event WHERE start >= :startDate and end <= :endDate and is_deleted = false order by start", nativeQuery = true)
    List<Event> findAllByStartEndDate(@Param("startDate") long startDate, @Param("endDate") long endDate);
    @Query(value = "SELECT * FROM event WHERE is_deleted = false ORDER BY rating DESC, start ASC;", nativeQuery = true)
    List<Event> findAllByPriority();

    @Query(value = "SELECT COUNT(*) FROM event WHERE start >= :startDate and end <= :endDate and is_deleted = false", nativeQuery = true)
    long count(@Param("startDate") long startDate, @Param("endDate") long endDate);
    @Query(value = "SELECT * FROM event WHERE start >= :startDate and noti = true and is_deleted = false", nativeQuery = true)
    List<Event> findAllByStartDate(@Param("startDate") long startDate);
}
