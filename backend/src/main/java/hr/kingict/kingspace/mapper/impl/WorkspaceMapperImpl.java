package hr.kingict.kingspace.mapper.impl;

import hr.kingict.kingspace.dto.WorkspaceDto;
import hr.kingict.kingspace.entity.Workspace;
import hr.kingict.kingspace.mapper.WorkplaceMapper;
import hr.kingict.kingspace.mapper.WorkspaceMapper;
import hr.kingict.kingspace.mapper.WorkspaceTypeMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class WorkspaceMapperImpl implements WorkspaceMapper {

    private final WorkplaceMapper workplaceMapper;
    private final WorkspaceTypeMapper workspaceTypeMapper;

    public WorkspaceMapperImpl(WorkplaceMapper workplaceMapper, WorkspaceTypeMapper workspaceTypeMapper) {
        this.workplaceMapper = workplaceMapper;
        this.workspaceTypeMapper = workspaceTypeMapper;
    }

    @Override
    public WorkspaceDto map(Workspace workspace) {
        return Optional.ofNullable(workspace).map(ws -> {
            WorkspaceDto workspaceDto = new WorkspaceDto();

            workspaceDto.setId(ws.getId());
            workspaceDto.setName(ws.getName());
            workspaceDto.setType(workspaceTypeMapper.map(ws.getType()));
            workspaceDto.setCapacity(ws.getCapacity());
            workspaceDto.setImageURL(ws.getImageURL());
            workspaceDto.setWorkplaces(workplaceMapper.map(ws.getWorkplaces()));

            return workspaceDto;
        }).orElse(null);
    }

    @Override
    public List<WorkspaceDto> map(List<Workspace> workspaces) {
        return workspaces.stream()
                .map(workspace -> map(workspace)).collect(Collectors.toList());
    }
}
