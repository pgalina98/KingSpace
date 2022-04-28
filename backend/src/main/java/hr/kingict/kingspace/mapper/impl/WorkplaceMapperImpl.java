package hr.kingict.kingspace.mapper.impl;

import hr.kingict.kingspace.dto.WorkplaceDto;
import hr.kingict.kingspace.entity.Workplace;
import hr.kingict.kingspace.mapper.WorkplaceMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class WorkplaceMapperImpl implements WorkplaceMapper {

    @Override
    public WorkplaceDto map(Workplace workplace) {
        return Optional.ofNullable(workplace).map(wp -> {

            WorkplaceDto workplaceDto = new WorkplaceDto();
            workplaceDto.setId(wp.getId());
            workplaceDto.setName(wp.getName());

            return workplaceDto;
        }).orElse(null);
    }

    @Override
    public List<WorkplaceDto> map(List<Workplace> workplaces) {
        return workplaces.stream()
                .map(workplace -> map(workplace)).collect(Collectors.toList());
    }
}
