package hr.kingict.kingspace.service;

import hr.kingict.kingspace.dto.DashboardProjectionDto;
import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.entity.Workspace;

import java.time.LocalDate;
import java.util.List;

public interface WorkspaceService {

    List<Workspace> getAllWorkspaces();
    void createNewWorkspace(Workspace workspace);
    void deleteWorkspaceById(Long workspaceId, String user);
    Workspace getWorkspaceById(Long workspaceId);
    Workspace getWorkspaceByWorkplaceId(Long workplaceId);
    List<Reservation> getWorkspaceReservationsByWorkspaceIdAndDate(Long workspaceId, LocalDate dateFrom, LocalDate dateUntil);
    List<Reservation> getWorkspaceReservationsByWorkspaceId(Long workspaceId);
    List<Reservation> getAllWorkspacesReservationsByWorkspaceIdAndDateInterval(LocalDate dateFrom, LocalDate dateUntil);
    List<Reservation> getAllWorkspacesReservations();
    List<DashboardProjectionDto> getAllWorkspacesByDate(LocalDate date);
    void editWorkspace(Workspace workspace);
    List<Long> getAllActiveWorkspaces();
}
