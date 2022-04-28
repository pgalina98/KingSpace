package hr.kingict.kingspace.service;

import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.form.ReservationForm;

import java.util.List;
import java.util.Optional;

public interface ReservationService {

    void deleteMyReservation(Long id, String user);
    void createNewReservation(Reservation reservation);
    Reservation getReservationById(Long reservationId);
    List<Reservation> getAllTeamReservations();
    List<Reservation> getAllSingleReservations();
}
