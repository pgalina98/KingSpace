package hr.kingict.kingspace.facade;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.form.ReservationForm;

import java.util.List;

public interface ReservationFacade {

    void deleteMyReservation(Long id,String user);
    void createNewReservation(ReservationForm reservationForm);
    ReservationDto getReservationById(Long reservationId);
    List<ReservationDto> getAllTeamReservations();
    List<ReservationDto> getAllSingleReservations();
}
