package hr.kingict.kingspace.service.impl;

import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.entity.Team;
import hr.kingict.kingspace.entity.UserTeamRole;
import hr.kingict.kingspace.repository.ReservationCustomRepository;
import hr.kingict.kingspace.repository.ReservationRepository;
import hr.kingict.kingspace.repository.TeamRepository;
import hr.kingict.kingspace.repository.UserTeamRoleRepository;
import hr.kingict.kingspace.service.TeamService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final ReservationCustomRepository reservationCustomRepository;
    private final ReservationRepository reservationRepository;
    private final UserTeamRoleRepository userTeamRoleRepository;

    public TeamServiceImpl(TeamRepository teamRepository, ReservationCustomRepository reservationCustomRepository, ReservationRepository reservationRepository, UserTeamRoleRepository userTeamRoleRepository) {
        this.teamRepository = teamRepository;
        this.reservationCustomRepository = reservationCustomRepository;
        this.reservationRepository = reservationRepository;
        this.userTeamRoleRepository = userTeamRoleRepository;
    }

    @Override
    public Team getSingleTeamById(Long teamId) {
        return teamRepository.findTeamById(teamId);
    }

    @Override
    public List<Reservation> getTeamReservationsByTeamIdAndDateInterval(Long teamId, LocalDate dateFrom, LocalDate dateUntil) {
        return reservationCustomRepository.findAllByTeamIdAndDate(teamId, dateFrom, dateUntil);
    }

    @Override
    public List<Reservation> getTeamReservations(Long teamId) {
        return reservationCustomRepository.findAllByTeamId(teamId);
    }

    @Override
    public List<Team> getAllTeams() {
        return teamRepository.findAll().stream().filter(team -> team.getIsActive() == true).collect(Collectors.toList());
    }

    @Override
    public void createNewTeam(Team team) {
        teamRepository.save(team);
    }

    @Override
    public void editTeam(Team team) {
        teamRepository.save(team);
    }

    @Override
    public void deleteTeamById(Long teamId, String user) {
        Team team = getSingleTeamById(teamId);

        team.setIsActive(false);
        team.setUpdated(LocalDateTime.now());
        team.setUpdatedByUser(user);

        for(UserTeamRole userTeamRole : team.getUsersTeamRoles()){
            userTeamRole.setUpdated(LocalDateTime.now());
            userTeamRole.setUpdatedByUser(user);
            userTeamRole.setIsActive(false);

            userTeamRoleRepository.save(userTeamRole);
        }

        teamRepository.save(team);
    }

    @Override
    public List<Long> getAllActiveTeams() {
        return reservationRepository.findAll()
                .stream()
                .filter(reservation -> reservation.getIsActive() == true && reservation.getTeam() != null)
                .map(reservation -> reservation.getTeam())
                .filter(team -> team.getIsActive() == true)
                .map(team -> team.getId())
                .distinct()
                .collect(Collectors.toList());
    }
}
