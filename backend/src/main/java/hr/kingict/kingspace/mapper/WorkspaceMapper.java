package hr.kingict.kingspace.mapper;

import hr.kingict.kingspace.dto.WorkspaceDto;
import hr.kingict.kingspace.entity.Workspace;

import java.util.List;

public interface WorkspaceMapper {

    WorkspaceDto map(Workspace workspace);
    List<WorkspaceDto> map(List<Workspace> workspaces);
}
