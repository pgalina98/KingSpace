package hr.kingict.kingspace.facade;

import hr.kingict.kingspace.dto.WorkspaceTypeDto;
import hr.kingict.kingspace.form.WorkspaceTypeForm;

import java.util.List;

public interface WorkspaceTypeFacade {
    void createNewWorkspaceType(WorkspaceTypeForm workspaceTypeForm);

    WorkspaceTypeDto getWorkspaceById(Long workspaceTypeId);

    List<WorkspaceTypeDto> getAllWorkspaceTypes();

    void deleteWorkspaceTypeById(Long workspaceTypeId);
}
