package hr.kingict.kingspace.dto;

import lombok.Data;

import java.util.List;

@Data
public class DashboardDto
{
    List<DashboardProjectionDto> projections;
}
