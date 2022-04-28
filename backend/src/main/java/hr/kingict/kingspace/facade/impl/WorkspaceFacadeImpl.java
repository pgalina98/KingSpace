package hr.kingict.kingspace.facade.impl;

import hr.kingict.kingspace.dto.DashboardDto;
import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.dto.WorkspaceDto;
import hr.kingict.kingspace.entity.Workspace;
import hr.kingict.kingspace.facade.WorkspaceFacade;
import hr.kingict.kingspace.form.WorkspaceForm;
import hr.kingict.kingspace.mapper.ReservationMapper;
import hr.kingict.kingspace.mapper.WorkspaceMapper;
import hr.kingict.kingspace.service.WorkspaceService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class WorkspaceFacadeImpl implements WorkspaceFacade
{

    private final WorkspaceService workspaceService;
    private final WorkspaceMapper workspaceMapper;
    private final ReservationMapper reservationMapper;

    public WorkspaceFacadeImpl(WorkspaceService workspaceService, WorkspaceMapper workspaceMapper, ReservationMapper reservationMapper)
    {
        this.workspaceService = workspaceService;
        this.workspaceMapper = workspaceMapper;
        this.reservationMapper = reservationMapper;
    }

    @Override
    public List<WorkspaceDto> getAllWorkspaces()
    {
        return workspaceMapper.map(workspaceService.getAllWorkspaces());
    }

    @Override
    public void createNewWorkspace(WorkspaceForm workspaceForm)
    {
        Workspace workspace = new Workspace();

        BeanUtils.copyProperties(workspaceForm, workspace);
        workspace.setIsActive(true);
        workspace.setCreatedByUser(workspaceForm.getUser());
        workspace.setUpdatedByUser(workspaceForm.getUser());
        workspace.setCreated(LocalDateTime.now());
        workspace.setUpdated(LocalDateTime.now());
        workspace.setValidFrom(LocalDate.now());
        workspaceService.createNewWorkspace(workspace);
    }

    @Override
    public void deleteWorkspaceById(Long workspaceId, String user)
    {
        workspaceService.deleteWorkspaceById(workspaceId, user);
    }

    @Override
    public WorkspaceDto getWorkspaceById(Long workspaceId)
    {
        return workspaceMapper.map(workspaceService.getWorkspaceById(workspaceId));
    }

    @Override
    public WorkspaceDto getWorkspaceByWorkplaceId(Long workplaceId)
    {
        return workspaceMapper.map(workspaceService.getWorkspaceByWorkplaceId(workplaceId));
    }

    @Override
    public List<ReservationDto> getWorkspaceReservationsByWorkspaceIdAndDateInterval(Long workspaceId, LocalDate dateFrom, LocalDate dateUntil)
    {
        return reservationMapper.map(workspaceService.getWorkspaceReservationsByWorkspaceIdAndDate(workspaceId, dateFrom, dateUntil));
    }

    @Override
    public List<ReservationDto> getWorkspaceReservationsByWorkspaceId(Long workspaceId)
    {
        return reservationMapper.map(workspaceService.getWorkspaceReservationsByWorkspaceId(workspaceId));
    }

    @Override
    public List<ReservationDto> getAllWorkspacesReservationsByWorkspaceIdAndDateInterval(LocalDate dateFrom, LocalDate dateUntil)
    {
        return reservationMapper.map(workspaceService.getAllWorkspacesReservationsByWorkspaceIdAndDateInterval(dateFrom, dateUntil));
    }

    @Override
    public List<ReservationDto> getAllWorkspacesReservations()
    {
        return reservationMapper.map(workspaceService.getAllWorkspacesReservations());
    }

    @Override
    public DashboardDto getAllWorkspacesByDate(LocalDate date)
    {
        DashboardDto dto = new DashboardDto();
        dto.setProjections(workspaceService.getAllWorkspacesByDate(date));
        return dto;
    }

    @Override
    public void editWorkspace(Long workspaceId, WorkspaceForm workspaceForm) {
        Workspace workspace = new Workspace();

        BeanUtils.copyProperties(workspaceForm, workspace);
        workspace.setId(workspaceId);
        workspace.setIsActive(true);
        workspace.setUpdatedByUser(workspaceForm.getUser());
        workspace.setUpdated(LocalDateTime.now());

        workspaceService.editWorkspace(workspace);
    }

    @Override
    public List<Long> getAllActiveWorkspaces() {
        return workspaceService.getAllActiveWorkspaces();
    }
}
