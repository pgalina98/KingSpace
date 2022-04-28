package hr.kingict.kingspace.mapper;

import hr.kingict.kingspace.dto.WorkspaceTypeDto;
import hr.kingict.kingspace.entity.WorkspaceType;

import java.util.List;

public interface WorkspaceTypeMapper {

    WorkspaceTypeDto map(WorkspaceType workspaceType);
    List<WorkspaceTypeDto> map(List<WorkspaceType> workspaceTypes);
}
