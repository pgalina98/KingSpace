package hr.kingict.kingspace.controller;

import hr.kingict.kingspace.dto.DashboardDto;
import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.dto.WorkspaceDto;
import hr.kingict.kingspace.entity.Workspace;
import hr.kingict.kingspace.facade.WorkspaceFacade;
import hr.kingict.kingspace.form.WorkspaceForm;
import hr.kingict.kingspace.security.error.ApiError;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    private final WorkspaceFacade workspaceFacade;

    public WorkspaceController(WorkspaceFacade workspaceFacade) {
        this.workspaceFacade = workspaceFacade;
    }

    @GetMapping
    public ResponseEntity getAllWorkspaces() {
        return new ResponseEntity(workspaceFacade.getAllWorkspaces(), HttpStatus.OK);
    }

    @PostMapping
    public void createNewWorkspace(@Valid @RequestBody WorkspaceForm workspaceForm) {
        workspaceFacade.createNewWorkspace(workspaceForm);
    }

    @PutMapping("/{id}")
    public void editWorkspace(@PathVariable("id") Long workspaceId, @Valid @RequestBody WorkspaceForm workspaceForm) {
        workspaceFacade.editWorkspace(workspaceId, workspaceForm);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity deleteWorkspaceById(@PathVariable("id") Long workspaceId, @RequestParam(required = false) String user) {
        WorkspaceDto workspace = workspaceFacade.getWorkspaceById(workspaceId);

        if(Objects.isNull(workspace)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("Workspace with ID " + workspaceId + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        workspaceFacade.deleteWorkspaceById(workspaceId, user);

        return new ResponseEntity(HttpStatus.OK);
    }

    //GET Single Box by ID
    @GetMapping("/{id}")
    public ResponseEntity getWorkspaceById(@PathVariable("id") Long workspaceId){
        WorkspaceDto workspace = workspaceFacade.getWorkspaceById(workspaceId);

        if(Objects.isNull(workspace)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("Workspace with ID " + workspaceId + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(workspace, HttpStatus.OK);
    }

    @GetMapping("/workplace/{id}")
    public ResponseEntity getWorkspaceByWorkplaceId(@PathVariable("id") Long workplaceId){
        WorkspaceDto workspace = workspaceFacade.getWorkspaceByWorkplaceId(workplaceId);

        if(Objects.isNull(workspace)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("Workspace with ID " + workplaceId + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(workspace, HttpStatus.OK);
    }

    //GET Single Workspace Reservations or by specified Date Interval
    @GetMapping("/{id}/reservations")
    public ResponseEntity getSingleWorkspaceReservations(@PathVariable("id") Long workspaceId,
                                                         @RequestParam(required = false) @DateTimeFormat(pattern="dd.MM.yyyy") LocalDate dateFrom,
                                                         @RequestParam(required = false) @DateTimeFormat(pattern="dd.MM.yyyy") LocalDate dateUntil) {
        WorkspaceDto workspace = (WorkspaceDto) getWorkspaceById(workspaceId).getBody();

        if(Objects.isNull(workspace)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("Workspace with ID " + workspaceId + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        List<ReservationDto> workspaceReservations;

        if(!Objects.isNull(dateFrom)) {
            workspaceReservations = workspaceFacade.getWorkspaceReservationsByWorkspaceIdAndDateInterval(workspaceId, dateFrom, dateUntil);
        } else {
            workspaceReservations = workspaceFacade.getWorkspaceReservationsByWorkspaceId(workspaceId);
        }

        return new ResponseEntity(workspaceReservations, HttpStatus.OK);
    }

    //GET All Workspace Reservations or by specified Date Interval
    @GetMapping("/reservations")
    public ResponseEntity getAllWorkspaceReservations(@RequestParam(required = false) @DateTimeFormat(pattern="dd.MM.yyyy") LocalDate dateFrom,
                                                      @RequestParam(required = false) @DateTimeFormat(pattern="dd.MM.yyyy") LocalDate dateUntil) {

        List<ReservationDto> workspaceReservations;

        if(!Objects.isNull(dateFrom)) {
            workspaceReservations = workspaceFacade.getAllWorkspacesReservationsByWorkspaceIdAndDateInterval(dateFrom, dateUntil);
        } else {
            workspaceReservations = workspaceFacade.getAllWorkspacesReservations();
        }

        return new ResponseEntity(workspaceReservations, HttpStatus.OK);
    }

    @GetMapping("/dashboard")
    public ResponseEntity getAllWorkspacesByDate(@RequestParam(required = false) @DateTimeFormat(pattern = "dd.MM.yyyy") LocalDate date)
    {
        DashboardDto dashboard = workspaceFacade.getAllWorkspacesByDate(date);

        return new ResponseEntity(dashboard, HttpStatus.OK);
    }

    @GetMapping("/activeWorkspaces")
    public List<Long> getAllActiveWorkspaces(){
        return workspaceFacade.getAllActiveWorkspaces();
    }
}
