package hr.kingict.kingspace.facade.impl;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.dto.TeamDto;
import hr.kingict.kingspace.entity.Team;
import hr.kingict.kingspace.facade.TeamFacade;
import hr.kingict.kingspace.form.TeamForm;
import hr.kingict.kingspace.mapper.ReservationMapper;
import hr.kingict.kingspace.mapper.TeamMapper;
import hr.kingict.kingspace.service.TeamService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class TeamFacadeImpl implements TeamFacade {

    private final TeamService teamService;
    private final TeamMapper teamMapper;
    private final ReservationMapper reservationMapper;

    public TeamFacadeImpl(TeamService teamService, TeamMapper teamMapper, ReservationMapper reservationMapper) {
        this.teamService = teamService;
        this.teamMapper = teamMapper;
        this.reservationMapper = reservationMapper;
    }

    @Override
    public TeamDto getSingleTeamById(Long teamId) {
        return teamMapper.map(teamService.getSingleTeamById(teamId));
    }

    @Override
    public List<ReservationDto> getTeamReservationsByTeamIdAndDateInterval(Long teamId, LocalDate dateFrom, LocalDate dateUntil) {
        return reservationMapper.map(teamService.getTeamReservationsByTeamIdAndDateInterval(teamId,dateFrom,dateUntil));
    }

    @Override
    public List<ReservationDto> getTeamReservations(Long teamId) {
        return reservationMapper.map(teamService.getTeamReservations(teamId));
    }

    @Override
    public List<TeamDto> getAllTeams() {
        return teamMapper.map(teamService.getAllTeams());
    }

    @Override
    public void createNewTeam(TeamForm teamForm) {
        Team team = new Team();

        team.setName(teamForm.getName());
        team.setIsActive(true);
        team.setCreatedByUser(teamForm.getUser());
        team.setUpdatedByUser(teamForm.getUser());
        team.setCreated(LocalDateTime.now());
        team.setUpdated(LocalDateTime.now());
        team.setValidFrom(LocalDate.now());

        teamService.createNewTeam(team);
    }

    @Override
    public void editWorkspace(Long teamId, TeamForm teamForm) {
        Team team = new Team();

        team.setId(teamId);
        team.setName(teamForm.getName());
        team.setIsActive(true);
        team.setUpdatedByUser(teamForm.getUser());
        team.setUpdated(LocalDateTime.now());

        teamService.editTeam(team);
    }

    @Override
    public void deleteTeamById(Long teamId, String user) {
        teamService.deleteTeamById(teamId, user);
    }

    @Override
    public List<Long> getAllActiveTeams() {
        return teamService.getAllActiveTeams();
    }
}
