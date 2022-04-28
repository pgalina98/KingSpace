package hr.kingict.kingspace.mapper;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.entity.Reservation;

import java.util.List;

public interface ReservationMapper {

    ReservationDto map(Reservation reservation);
    List<ReservationDto> map(List<Reservation> reservations);
}
