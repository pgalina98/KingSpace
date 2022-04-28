package hr.kingict.kingspace.service;

import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserService {

    User getSingleUserByUsername(String username);
    User getSingleUserByEmail(String email);
    List<User> getAllUsers();
    List<Reservation> getAllUserReservationsByUsersUsernameAndDateInterval(String username, LocalDate dateFrom, LocalDate dateUntil);
    List<Reservation> getAllUserReservationsByUsersUsername(String username);
}
