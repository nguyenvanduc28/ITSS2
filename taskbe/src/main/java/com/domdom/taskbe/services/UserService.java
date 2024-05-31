package com.domdom.taskbe.services;

import com.domdom.taskbe.dtos.UserUpdateDto;
import com.domdom.taskbe.dtos.auth.UserInfoDto;
import com.domdom.taskbe.exceptions.BadRequestException;
import com.domdom.taskbe.models.UserEntity;
import com.domdom.taskbe.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;
    private ModelMapper modelMapper = new ModelMapper();
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserInfoDto updateProfile(UserUpdateDto userInfoDto, UserEntity user) {
        UserEntity userEntity = userRepository.findByEmail(user.getEmail());
        if (userEntity == null) throw new BadRequestException("Không tìm thấy user");
        userEntity.setBirthday(userInfoDto.getBirthday());
        userEntity.setAddress(userInfoDto.getAddress());
        userEntity.setFullName(userInfoDto.getFullName());
        userEntity.setGender(userInfoDto.getGender());

        UserEntity userEntity1 = userRepository.save(userEntity);
        if (userEntity1 == null) throw new BadRequestException("Lỗi cập nhật user");
        return modelMapper.map(userEntity1, UserInfoDto.class);
    }
}
