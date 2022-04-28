package hr.kingict.kingspace.service;

import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.entity.Team;

import java.time.LocalDate;
import java.util.List;

public interface TeamService {

    Team getSingleTeamById(Long teamId);
    List<Reservation> getTeamReservationsByTeamIdAndDateInterval(Long teamId, LocalDate dateFrom, LocalDate dateUntil);
    List<Reservation> getTeamReservations(Long teamId);
    List<Team> getAllTeams();
    void createNewTeam(Team team);
    void editTeam(Team team);
    void deleteTeamById(Long teamId, String user);
    List<Long> getAllActiveTeams();
}
