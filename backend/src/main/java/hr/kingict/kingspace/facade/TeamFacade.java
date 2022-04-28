package hr.kingict.kingspace.facade;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.dto.TeamDto;
import hr.kingict.kingspace.form.TeamForm;

import java.time.LocalDate;
import java.util.List;

public interface TeamFacade {

    TeamDto getSingleTeamById(Long teamId);
    List<ReservationDto> getTeamReservationsByTeamIdAndDateInterval(Long teamId, LocalDate dateFrom, LocalDate dateUntil);
    List<ReservationDto> getTeamReservations(Long teamId);
    List<TeamDto> getAllTeams();
    void createNewTeam(TeamForm teamForm);
    void editWorkspace(Long teamId, TeamForm teamForm);
    void deleteTeamById(Long teamId, String user);
    List<Long> getAllActiveTeams();
}
