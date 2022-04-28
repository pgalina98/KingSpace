package hr.kingict.kingspace.service.impl;

import hr.kingict.kingspace.entity.WorkspaceType;
import hr.kingict.kingspace.repository.WorkspaceTypeRepository;
import hr.kingict.kingspace.service.WorkspaceTypeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkspaceTypeServiceImpl implements WorkspaceTypeService {

    private final WorkspaceTypeRepository workspaceTypeRepository;

    public WorkspaceTypeServiceImpl(WorkspaceTypeRepository workspaceTypeRepository) {
        this.workspaceTypeRepository = workspaceTypeRepository;
    }

    @Override
    public void createNewWorkspaceType(WorkspaceType boxType) {
        workspaceTypeRepository.save(boxType);
    }

    @Override
    public WorkspaceType getWorkspaceById(Long workspaceTypeId) {
        return workspaceTypeRepository.findWorkspaceTypeById(workspaceTypeId);
    }


    @Override
    public List<WorkspaceType> getAllWorkspaceTypes() {
        return workspaceTypeRepository.findAll();
    }

    @Override
    public void deleteWorkspaceTypeById(Long workspaceTypeId) {
        workspaceTypeRepository.deleteById(workspaceTypeId);
    }
}
