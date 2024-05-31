package com.domdom.taskbe.services;

import com.domdom.taskbe.dtos.password.EmailRequest;
import com.domdom.taskbe.exceptions.BadRequestException;
import com.domdom.taskbe.models.Otp;
import com.domdom.taskbe.models.UserEntity;
import com.domdom.taskbe.repositories.OtpRepository;
import com.domdom.taskbe.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class PasswordService {
    @Autowired
    private final OtpRepository otpRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender javaMailSender;
    public PasswordService(OtpRepository otpRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void sendMail(EmailRequest emailRequest) {
        UserEntity userEntity = userRepository.findByEmail(emailRequest.getEmail());
        if (userEntity == null) throw new BadRequestException("Không tìm thấy email");
        List<Otp> otps = otpRepository.findAllByEmail(emailRequest.getEmail());
        if (!otps.isEmpty()){
            for (Otp otp : otps) {
                otp.setExp(true);
                otp.setUsed(true);
            }
            otpRepository.saveAll(otps);
        }

        Otp otpNew = new Otp();
        otpNew.setEmail(emailRequest.getEmail());
        Random random = new Random();
        otpNew.setOtp(generateRandomNumber(random, 6));
        //send mail
        send(emailRequest.getEmail(), otpNew.getOtp());
        if (otpRepository.save(otpNew) == null) throw new BadRequestException("Lỗi tạo otp");
    }

    public void sendOtp(EmailRequest emailRequest) {
        UserEntity userEntity = userRepository.findByEmail(emailRequest.getEmail());
        if (userEntity == null) throw new BadRequestException("Không tìm thấy email");
        if (emailRequest.getOtp() == null || emailRequest.getOtp().equals("")) throw new BadRequestException("OTP không được để trống");

        Otp otp = otpRepository.findByEmailAndOtp(emailRequest.getEmail(), emailRequest.getOtp());
        if (otp == null) throw new BadRequestException("Otp không đúng");
        otp.setExp(true);
        otp.setAccept(true);
        otpRepository.save(otp);
    }

    public void changePass(EmailRequest emailRequest) {
        UserEntity userEntity = userRepository.findByEmail(emailRequest.getEmail());
        if (userEntity == null) throw new BadRequestException("Không tìm thấy email");
        Otp otp = otpRepository.findByEmailAndNotUse(emailRequest.getEmail());
        if (otp == null) throw new BadRequestException("Hãy thử lại");
        if (emailRequest.getPassword() == null || emailRequest.equals("")
        ||  emailRequest.getVerifyPassword() == null || emailRequest.equals("")
        ||  !emailRequest.getPassword().equals(emailRequest.getVerifyPassword())) throw new BadRequestException("Hãy nhập lại mật khẩu");

        userEntity.setPassword(passwordEncoder.encode(emailRequest.getPassword()));
        userRepository.save(userEntity);
        otp.setUsed(true);
        otpRepository.save(otp);
    }
    private static String generateRandomNumber(Random random, int length) {
        StringBuilder randomNumberBuilder = new StringBuilder();

        // Tạo từng chữ số ngẫu nhiên và thêm vào chuỗi
        for (int i = 0; i < length; i++) {
            int digit = random.nextInt(10); // Sinh số ngẫu nhiên từ 0 đến 9
            randomNumberBuilder.append(digit);
        }

        return randomNumberBuilder.toString();
    }

    public void send(String toEmail, String otp){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("domdom@gmail.com");
        message.setTo(toEmail);
        message.setSubject("no-nan");
        message.setText(otp);
        javaMailSender.send(message);
    }
}
