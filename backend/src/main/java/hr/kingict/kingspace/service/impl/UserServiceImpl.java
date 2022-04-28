package hr.kingict.kingspace.service.impl;

import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.entity.User;
import hr.kingict.kingspace.repository.CustomADRepository;
import hr.kingict.kingspace.repository.ReservationCustomRepository;
import hr.kingict.kingspace.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final CustomADRepository customADRepository;
    private final ReservationCustomRepository reservationCustomRepository;

    public UserServiceImpl(CustomADRepository customADRepository, ReservationCustomRepository reservationCustomRepository) {
        this.customADRepository = customADRepository;
        this.reservationCustomRepository = reservationCustomRepository;
    }

    @Override
    public User getSingleUserByUsername(String username) {
        return customADRepository.findOneByUsername(username);
    }

    @Override
    public User getSingleUserByEmail(String email) {
        return customADRepository.findLdapUserByEmail(email);
    }

    @Override
    public List<Reservation> getAllUserReservationsByUsersUsernameAndDateInterval(String username, LocalDate dateFrom, LocalDate dateUntil) {
        return reservationCustomRepository.findAllByUsernameAndDate(username, dateFrom, dateUntil);
    }

    @Override
    public List<Reservation> getAllUserReservationsByUsersUsername(String username) {
        return reservationCustomRepository.findAllByUsername(username);
    }

    @Override
    public List<User> getAllUsers() {
        return customADRepository.getAllUsers();
    }
}
