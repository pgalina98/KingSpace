package hr.kingict.kingspace.facade.impl;

import hr.kingict.kingspace.dto.WorkplaceDto;
import hr.kingict.kingspace.entity.Workplace;
import hr.kingict.kingspace.facade.WorkplaceFacade;
import hr.kingict.kingspace.form.WorkplaceForm;
import hr.kingict.kingspace.mapper.WorkplaceMapper;
import hr.kingict.kingspace.service.WorkplaceService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WorkplaceFacadeImpl implements WorkplaceFacade {

    private final WorkplaceService workplaceService;
    private final WorkplaceMapper workplaceMapper;

    public WorkplaceFacadeImpl(WorkplaceService workplaceService, WorkplaceMapper workplaceMapper) {
        this.workplaceService = workplaceService;
        this.workplaceMapper = workplaceMapper;
    }

    @Override
    public void createNewWorkplace(WorkplaceForm workplaceForm) {
        Workplace workplace = new Workplace();

        BeanUtils.copyProperties(workplaceForm, workplace);

        workplaceService.createNewWorkplace(workplace);
    }

    @Override
    public WorkplaceDto getWorkplaceById(Long id) {
        return workplaceMapper.map(workplaceService.getWorkplaceById(id));
    }

    @Override
    public List<WorkplaceDto> getAllWorplaces() {
        return workplaceMapper.map(workplaceService.getAllWorplaces());
    }

    @Override
    public void deleteWorkplaceById(Long workplaceId) {
        workplaceService.deleteWorkplaceById(workplaceId);
    }
}
