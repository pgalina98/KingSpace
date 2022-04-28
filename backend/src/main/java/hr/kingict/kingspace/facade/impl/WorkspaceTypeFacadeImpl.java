package hr.kingict.kingspace.facade.impl;

import hr.kingict.kingspace.dto.WorkspaceTypeDto;
import hr.kingict.kingspace.entity.WorkspaceType;
import hr.kingict.kingspace.facade.WorkspaceTypeFacade;
import hr.kingict.kingspace.form.WorkspaceTypeForm;
import hr.kingict.kingspace.mapper.WorkspaceTypeMapper;
import hr.kingict.kingspace.service.WorkspaceTypeService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WorkspaceTypeFacadeImpl implements WorkspaceTypeFacade {

    private final WorkspaceTypeService workspaceTypeService;
    private final WorkspaceTypeMapper workspaceTypeMapper;

    public WorkspaceTypeFacadeImpl(WorkspaceTypeService workspaceTypeService, WorkspaceTypeMapper workspaceTypeMapper) {
        this.workspaceTypeService = workspaceTypeService;
        this.workspaceTypeMapper = workspaceTypeMapper;
    }

    @Override
    public void createNewWorkspaceType(WorkspaceTypeForm workspaceTypeForm) {
        WorkspaceType workspaceType = new WorkspaceType();

        BeanUtils.copyProperties(workspaceTypeForm, workspaceType);

        workspaceTypeService.createNewWorkspaceType(workspaceType);
    }

    @Override
    public WorkspaceTypeDto getWorkspaceById(Long workspaceTypeId) {
        return workspaceTypeMapper.map(workspaceTypeService.getWorkspaceById(workspaceTypeId));
    }

    @Override
    public List<WorkspaceTypeDto> getAllWorkspaceTypes() {
        return workspaceTypeMapper.map(workspaceTypeService.getAllWorkspaceTypes());
    }

    @Override
    public void deleteWorkspaceTypeById(Long workspaceTypeId) {
        workspaceTypeService.deleteWorkspaceTypeById(workspaceTypeId);
    }
}
