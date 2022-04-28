package hr.kingict.kingspace.repository;

import hr.kingict.kingspace.entity.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface ReservationCustomRepository {

    List<Reservation> findAllByWorkspaceIdAndDate(Long workspaceId, LocalDate dateFrom, LocalDate dateUntil);
    List<Reservation> findAllByWorkspaceId(Long workspaceId);
    List<Reservation> findByDate(LocalDate dateFrom, LocalDate dateUntil);
    List<Reservation> findAllByTeamIdAndDate(Long teamId, LocalDate dateFrom, LocalDate dateUntil);
    List<Reservation> findAllByTeamId(Long teamId);
    List<Reservation> findAllByUsernameAndDate(String username, LocalDate dateFrom, LocalDate dateUntil);
    List<Reservation> findAllByUsername(String username);
    void updateStatusOfReservations();
}
