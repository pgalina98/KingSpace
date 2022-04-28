package hr.kingict.kingspace.controller;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.dto.TeamDto;
import hr.kingict.kingspace.dto.WorkspaceDto;
import hr.kingict.kingspace.facade.TeamFacade;
import hr.kingict.kingspace.form.TeamForm;
import hr.kingict.kingspace.form.WorkspaceForm;
import hr.kingict.kingspace.security.error.ApiError;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController()
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamFacade teamFacade;

    public TeamController(TeamFacade teamFacade) {
        this.teamFacade = teamFacade;
    }

    //GET All Teams
    @GetMapping()
    public List<TeamDto> getAllTeams() {
        return teamFacade.getAllTeams();
    }

    //GET Team Reservations
    @GetMapping("/{id}/reservations")
    public ResponseEntity getSingleTeamReservations(@PathVariable("id") Long teamId,
                                                    @RequestParam(required = false) @DateTimeFormat(pattern="dd.MM.yyyy") LocalDate dateFrom,
                                                    @RequestParam(required = false) @DateTimeFormat(pattern="dd.MM.yyyy") LocalDate dateUntil) {
        TeamDto team = teamFacade.getSingleTeamById(teamId);

        if(Objects.isNull(team)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("Team with ID " + teamId + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        List<ReservationDto> teamReservations = new ArrayList<>();

        if(!Objects.isNull(dateFrom)) {
            teamReservations = teamFacade.getTeamReservationsByTeamIdAndDateInterval(teamId, dateFrom, dateUntil);
        } else {
            teamReservations = teamFacade.getTeamReservations(teamId);
        }

        return new ResponseEntity(teamReservations, HttpStatus.OK);
    }

    @GetMapping("/activeTeams")
    public List<Long> getAllActiveTeams(){
        return teamFacade.getAllActiveTeams();
    }

    @PostMapping
    public void createNewTeam(@Valid @RequestBody TeamForm teamForm) {
        teamFacade.createNewTeam(teamForm);
    }

    @PutMapping("/{id}")
    public void editTeam(@PathVariable("id") Long teamId, @Valid @RequestBody TeamForm teamForm) {
        teamFacade.editWorkspace(teamId, teamForm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTeamById(@PathVariable("id") Long teamId, @RequestParam(required = false) String user) {
        TeamDto team = teamFacade.getSingleTeamById(teamId);

        if(Objects.isNull(team)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("Team with ID " + teamId + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        teamFacade.deleteTeamById(teamId, user);

        return new ResponseEntity(HttpStatus.OK);
    }
}
