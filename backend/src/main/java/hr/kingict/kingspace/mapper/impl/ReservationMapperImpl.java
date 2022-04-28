package hr.kingict.kingspace.mapper.impl;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.mapper.ReservationMapper;
import hr.kingict.kingspace.mapper.TeamMapper;
import hr.kingict.kingspace.mapper.WorkplaceMapper;
import hr.kingict.kingspace.mapper.WorkspaceMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ReservationMapperImpl implements ReservationMapper {

    private final WorkspaceMapper workspaceMapper;
    private final WorkplaceMapper workplaceMapper;
    private final TeamMapper teamMapper;

    public ReservationMapperImpl(WorkspaceMapper workspaceMapper, WorkplaceMapper workplaceMapper, TeamMapper teamMapper) {
        this.workspaceMapper = workspaceMapper;
        this.workplaceMapper = workplaceMapper;
        this.teamMapper = teamMapper;
    }

    @Override
    public ReservationDto map(Reservation reservation) {
        return Optional.ofNullable(reservation).map(r -> {
            ReservationDto reservationDto = new ReservationDto();

            reservationDto.setId(r.getId());
            reservationDto.setReservedByUser(r.getUser());
            if (!Objects.isNull(r.getWorkspace())) {
                reservationDto.setTypeOfReservation(r.getWorkspace().getType().getName());
                reservationDto.setWorkspace(workspaceMapper.map(r.getWorkspace()));
                reservationDto.setTeam(teamMapper.map(r.getTeam()));
            } else {
                reservationDto.setTypeOfReservation(r.getWorkplace().getWorkspace().getType().getName());
                reservationDto.setWorkplace(workplaceMapper.map(r.getWorkplace()));
                reservationDto.setWorkspace(workspaceMapper.map(r.getWorkplace().getWorkspace()));
            }
            reservationDto.setDateOfReservation(r.getDateOfReservation());
            reservationDto.setReservedFrom(r.getReservedFrom());
            reservationDto.setReservedUntil(r.getReservedUntil());

            return reservationDto;
        }).orElse(null);
    }

    @Override
    public List<ReservationDto> map(List<Reservation> reservations) {
        return reservations.stream()
                .map(reservation -> map(reservation)).collect(Collectors.toList());
    }
}
