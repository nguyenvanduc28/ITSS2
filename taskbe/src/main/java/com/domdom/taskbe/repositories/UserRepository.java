package com.domdom.taskbe.repositories;

import com.domdom.taskbe.models.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer>  {

    @Query("select u from UserEntity u where u.email = :email")
    UserEntity findByEmail(@Param("email") String email);

    Boolean existsByEmail(String email);
}
