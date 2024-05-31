package com.domdom.taskbe.repositories;

import com.domdom.taskbe.models.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OtpRepository extends JpaRepository<Otp, Integer> {
    List<Otp> findAllByEmail(String email);
    @Query(value = "select * from otp where email=:email and otp=:otp and is_exp = false", nativeQuery = true)
    Otp findByEmailAndOtp(@Param("email") String email,@Param("otp")  String otp);

    @Query(value = "select * from otp where email=:email and is_exp = true and used = false", nativeQuery = true)
    Otp findByEmailAndNotUse(@Param("email") String email);

}
