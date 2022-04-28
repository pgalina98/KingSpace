package hr.kingict.kingspace.mapper.impl;

import hr.kingict.kingspace.dto.WorkspaceTypeDto;
import hr.kingict.kingspace.entity.WorkspaceType;
import hr.kingict.kingspace.mapper.WorkspaceTypeMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class WorkspaceTypeMapperImpl implements WorkspaceTypeMapper {
    @Override
    public WorkspaceTypeDto map(WorkspaceType workspaceType) {
        return Optional.ofNullable(workspaceType).map(wst -> {

            WorkspaceTypeDto workspaceTypeDto = new WorkspaceTypeDto();
            workspaceTypeDto.setId(wst.getId());
            workspaceTypeDto.setName(wst.getName());

            return workspaceTypeDto;
        }).orElse(null);
    }

    @Override
    public List<WorkspaceTypeDto> map(List<WorkspaceType> workspaceTypes) {
        return workspaceTypes.stream()
                .map(workspaceType -> map(workspaceType)).collect(Collectors.toList());
    }
}
