package hr.kingict.kingspace.repository;

import hr.kingict.kingspace.dto.DashboardProjectionDto;

import java.time.LocalDate;
import java.util.List;

public interface WorkspaceCustomRepository
{
    List<DashboardProjectionDto> getAllWorkspacesByDate(LocalDate date);
}
