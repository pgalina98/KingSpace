package hr.kingict.kingspace.service;

import hr.kingict.kingspace.entity.WorkspaceType;

import java.util.List;

public interface WorkspaceTypeService {
    void createNewWorkspaceType(WorkspaceType workspaceType);

    WorkspaceType getWorkspaceById(Long workspaceTypeId);

    List<WorkspaceType> getAllWorkspaceTypes();

    void deleteWorkspaceTypeById(Long workspaceTypeId);
}
