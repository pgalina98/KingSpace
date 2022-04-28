package hr.kingict.kingspace.service.impl;

import hr.kingict.kingspace.dto.DashboardProjectionDto;
import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.entity.Workplace;
import hr.kingict.kingspace.entity.Workspace;
import hr.kingict.kingspace.repository.*;
import hr.kingict.kingspace.service.WorkspaceService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceCustomRepository workspaceCustomRepository;
    private final ReservationRepository reservationRepository;
    private final ReservationCustomRepository reservationCustomRepository;
    private final WorkplaceRepository workplaceRepository;

    public WorkspaceServiceImpl(WorkspaceRepository workspaceRepository, WorkspaceCustomRepository workspaceCustomRepository,
                                ReservationRepository reservationRepository,
                                ReservationCustomRepository reservationCustomRepository, WorkplaceRepository workplaceRepository) {
        this.workspaceRepository = workspaceRepository;
        this.workspaceCustomRepository = workspaceCustomRepository;
        this.reservationRepository = reservationRepository;
        this.reservationCustomRepository = reservationCustomRepository;
        this.workplaceRepository = workplaceRepository;
    }

    @Override
    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.findAll()
                .stream()
                .filter(workspace -> workspace.getIsActive() == true)
                .collect(Collectors.toList());
    }

    @Override
    public void createNewWorkspace(Workspace workspace) {
        Workspace ws = workspaceRepository.save(workspace);

        for(int i = 0; i<workspace.getCapacity(); i++){
            Workplace workplace = new Workplace();
            workplace.setName("A"+(i+1));
            workplace.setWorkspaceId(ws.getId());
            workplace.setCreatedByUser(ws.getCreatedByUser());
            workplace.setUpdatedByUser((ws.getUpdatedByUser()));
            workplace.setCreated(LocalDateTime.now());
            workplace.setUpdated(LocalDateTime.now());
            workplace.setValidFrom(LocalDate.now());
            workplace.setIsActive(true);
            workplaceRepository.save(workplace);
        }
    }

    @Override
    public void deleteWorkspaceById(Long workspaceId, String user) {
        Workspace workspace = getWorkspaceById(workspaceId);
        workspace.setIsActive(false);
        workspace.setUpdated(LocalDateTime.now());
        workspace.setUpdatedByUser(user);
        workspaceRepository.save(workspace);

        List<Workplace> workplaces = workspace.getWorkplaces();
        for(Workplace workplace : workplaces){
            workplace.setUpdated(LocalDateTime.now());
            workplace.setUpdatedByUser(user);
            workplace.setIsActive(false);
            workplaceRepository.save(workplace);
        }
    }

    @Override
    public Workspace getWorkspaceById(Long workspaceId) {
        return workspaceRepository.findWorkspaceById(workspaceId);
    }

    @Override
    public Workspace getWorkspaceByWorkplaceId(Long workplaceId) {
        return workspaceRepository.findWorkspaceByWorkplacesId(workplaceId);
    }

    @Override
    public List<Reservation> getWorkspaceReservationsByWorkspaceIdAndDate(Long workspaceId, LocalDate dateFrom, LocalDate dateUntil) {
        return reservationCustomRepository.findAllByWorkspaceIdAndDate(workspaceId, dateFrom, dateUntil);
    }

    @Override
    public List<Reservation> getWorkspaceReservationsByWorkspaceId(Long workspaceId) {
        return reservationCustomRepository.findAllByWorkspaceId(workspaceId);
    }

    @Override
    public List<Reservation> getAllWorkspacesReservationsByWorkspaceIdAndDateInterval(LocalDate dateFrom, LocalDate dateUntil) {
        return reservationCustomRepository.findByDate(dateFrom, dateUntil);
    }

    @Override
    public List<Reservation> getAllWorkspacesReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public void editWorkspace(Workspace workspace) {
        Workspace currentWorkspace = getWorkspaceById(workspace.getId());
        Integer currentWorkspaceCapacity = currentWorkspace.getCapacity();
        if(currentWorkspaceCapacity > workspace.getCapacity()){
            for(int i = currentWorkspaceCapacity; i<workspace.getCapacity(); i++){
                Workplace workplace = currentWorkspace.getWorkplaces().get(i);
                workplace.setIsActive(false);
                workplace.setUpdated(LocalDateTime.now());
                workplace.setUpdatedByUser(workspace.getUpdatedByUser());
                workplaceRepository.save(workplace);
            }
        }
        else if(currentWorkspaceCapacity < workspace.getCapacity()){
            if(workspace.getWorkplaces().size() >= currentWorkspaceCapacity){
                for(int i = 0; i<currentWorkspaceCapacity; i++){
                    Workplace workplace = currentWorkspace.getWorkplaces().get(i);
                    if(workplace.getIsActive() == false){
                        workplace.setIsActive(true);
                        workplace.setUpdated(LocalDateTime.now());
                        workplace.setUpdatedByUser(workspace.getUpdatedByUser());
                    }
                    workplaceRepository.save(workplace);
                }
            }
            else{
                for(Workplace workplace : currentWorkspace.getWorkplaces()){
                    if(workplace.getIsActive() == false){
                        workplace.setIsActive(true);
                        workplace.setUpdated(LocalDateTime.now());
                        workplace.setUpdatedByUser(workspace.getUpdatedByUser());
                    }
                    workplaceRepository.save(workplace);
                }
                for(int i = workspace.getCapacity(); i<currentWorkspaceCapacity; i++){
                    Workplace workplace = new Workplace();
                    workplace.setName("A"+(i+1));
                    workplace.setWorkspaceId(workspace.getId());
                    workplace.setCreatedByUser(workspace.getCreatedByUser());
                    workplace.setUpdatedByUser((workspace.getUpdatedByUser()));
                    workplace.setCreated(LocalDateTime.now());
                    workplace.setUpdated(LocalDateTime.now());
                    workplace.setValidFrom(LocalDate.now());
                    workplace.setIsActive(true);
                    workplaceRepository.save(workplace);
                }
            }
        }
        workspaceRepository.save(workspace);
    }

    @Override
    public List<Long> getAllActiveWorkspaces() {
        return reservationRepository.findAllByReservedUntilGreaterThanEqual(LocalDate.now())
                .stream()
                .filter(reservation -> reservation.getIsActive() == true)
                .map(reservation -> {
                    if(reservation.getWorkspace() != null){
                        return reservation.getWorkspace().getId();
                    }
                    else{
                        return reservation.getWorkplace().getWorkspace().getId();
                    }
                })
                .distinct().collect(Collectors.toList());
    }

    @Override
    public List<DashboardProjectionDto> getAllWorkspacesByDate(LocalDate date)
    {
        return workspaceCustomRepository.getAllWorkspacesByDate(date);
    }
}
