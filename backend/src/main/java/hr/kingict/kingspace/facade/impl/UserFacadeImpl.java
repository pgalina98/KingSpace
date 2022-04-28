package hr.kingict.kingspace.facade.impl;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.dto.UserDto;
import hr.kingict.kingspace.facade.UserFacade;
import hr.kingict.kingspace.mapper.ReservationMapper;
import hr.kingict.kingspace.mapper.UserMapper;
import hr.kingict.kingspace.service.UserService;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class UserFacadeImpl implements UserFacade {

    private final UserService userService;
    private final UserMapper userMapper;
    private final ReservationMapper reservationMapper;

    public UserFacadeImpl(UserService userService, UserMapper userMapper, ReservationMapper reservationMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.reservationMapper = reservationMapper;
    }

    @Override
    public UserDto getSingleUserByUsername(String username) {
        return userMapper.map(userService.getSingleUserByUsername(username));
    }

    @Override
    public UserDto getSingleUserByEmail(String emailAddress) {
        return userMapper.map(userService.getSingleUserByEmail(emailAddress));
    }

    @Override
    public List<ReservationDto> getAllUserReservationsByUsersUsernameAndDateInterval(String username, LocalDate dateFrom, LocalDate dateUntil) {
        return reservationMapper.map(userService.getAllUserReservationsByUsersUsernameAndDateInterval(username, dateFrom, dateUntil));
    }

    @Override
    public List<ReservationDto> getAllUserReservationsByUsersUsername(String username) {
        return reservationMapper.map(userService.getAllUserReservationsByUsersUsername(username));
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userMapper.map(userService.getAllUsers());
    }
}
