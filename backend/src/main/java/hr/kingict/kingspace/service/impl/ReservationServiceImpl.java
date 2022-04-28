package hr.kingict.kingspace.service.impl;

import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.repository.ReservationRepository;
import hr.kingict.kingspace.service.ReservationService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository repository;

    public ReservationServiceImpl(ReservationRepository repository) {
        this.repository = repository;
    }

    @Override
    public void deleteMyReservation(Long id, String user) {

        Reservation reservation = getReservationById(id);
        reservation.setIsActive(false);
        reservation.setUpdatedByUser(user);
        reservation.setUpdated(LocalDateTime.now());
        repository.save(reservation);
    }

    @Override
    public void createNewReservation(Reservation reservation) {
        repository.save(reservation);
    }

    @Override
    public Reservation getReservationById(Long reservationId) {
        return repository.findReservationById(reservationId);
    }

    @Override
    public List<Reservation> getAllTeamReservations() {
        return repository.findAll()
                .stream()
                .filter(reservation->reservation.getIsActive() == true && reservation.getWorkspace() != null && !LocalDate.now().isAfter(reservation.getReservedUntil()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Reservation> getAllSingleReservations() {
        return repository.findAll()
                .stream()
                .filter(reservation->reservation.getIsActive() == true && reservation.getWorkspace() == null && !LocalDate.now().isAfter(reservation.getReservedUntil()))
                .collect(Collectors.toList());
    }
}
