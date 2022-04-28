package hr.kingict.kingspace.facade;

import hr.kingict.kingspace.dto.DashboardDto;
import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.dto.WorkspaceDto;
import hr.kingict.kingspace.form.WorkspaceForm;

import java.time.LocalDate;
import java.util.List;

public interface WorkspaceFacade {

    List<WorkspaceDto> getAllWorkspaces();
    void createNewWorkspace(WorkspaceForm workspaceForm);
    void deleteWorkspaceById(Long workspaceId, String user);
    WorkspaceDto getWorkspaceById(Long workspaceId);
    WorkspaceDto getWorkspaceByWorkplaceId(Long workplaceId);
    List<ReservationDto> getWorkspaceReservationsByWorkspaceIdAndDateInterval(Long workspaceId, LocalDate dateFrom, LocalDate dateUntil);
    List<ReservationDto> getWorkspaceReservationsByWorkspaceId(Long workspaceId);
    List<ReservationDto> getAllWorkspacesReservationsByWorkspaceIdAndDateInterval(LocalDate dateFrom, LocalDate dateUntil);
    List<ReservationDto> getAllWorkspacesReservations();
    DashboardDto getAllWorkspacesByDate(LocalDate date);
    void editWorkspace(Long workspaceId, WorkspaceForm workspaceForm);
    List<Long> getAllActiveWorkspaces();
}
