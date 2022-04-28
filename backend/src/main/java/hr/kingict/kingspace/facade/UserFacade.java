package hr.kingict.kingspace.facade;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.dto.UserDto;

import java.time.LocalDate;
import java.util.List;

public interface UserFacade {

    UserDto getSingleUserByUsername(String username);
    UserDto getSingleUserByEmail(String emailAddress);
    List<UserDto> getAllUsers();
    List<ReservationDto> getAllUserReservationsByUsersUsernameAndDateInterval(String username, LocalDate dateFrom, LocalDate dateUntil);
    List<ReservationDto> getAllUserReservationsByUsersUsername(String username);
}
