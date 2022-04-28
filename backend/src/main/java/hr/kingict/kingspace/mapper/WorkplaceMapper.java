package hr.kingict.kingspace.mapper;

import hr.kingict.kingspace.dto.WorkplaceDto;
import hr.kingict.kingspace.entity.Workplace;

import java.util.List;

public interface WorkplaceMapper {

    WorkplaceDto map(Workplace workplace);
    List<WorkplaceDto> map(List<Workplace> workplaces);
}
