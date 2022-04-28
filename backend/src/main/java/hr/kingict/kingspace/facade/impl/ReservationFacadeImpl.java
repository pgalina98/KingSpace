package hr.kingict.kingspace.facade.impl;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.facade.ReservationFacade;
import hr.kingict.kingspace.form.ReservationForm;
import hr.kingict.kingspace.mapper.ReservationMapper;
import hr.kingict.kingspace.service.ReservationService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReservationFacadeImpl implements ReservationFacade {

    private final ReservationService service;
    private final ReservationMapper mapper;

    public ReservationFacadeImpl(ReservationService service, ReservationMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @Override
    public void deleteMyReservation(Long id, String user) {
        service.deleteMyReservation(id, user);
    }

    @Override
    public void createNewReservation(ReservationForm reservationForm) {
        Reservation reservation = new Reservation();

        BeanUtils.copyProperties(reservationForm, reservation);

        service.createNewReservation(reservation);
    }

    @Override
    public ReservationDto getReservationById(Long reservationId) {
        return mapper.map(service.getReservationById(reservationId));
    }

    @Override
    public List<ReservationDto> getAllTeamReservations() {
        return mapper.map(service.getAllTeamReservations());
    }

    @Override
    public List<ReservationDto> getAllSingleReservations() {
        return mapper.map(service.getAllSingleReservations());
    }


}
