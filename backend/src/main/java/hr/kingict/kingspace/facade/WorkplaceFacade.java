package hr.kingict.kingspace.facade;

import hr.kingict.kingspace.dto.WorkplaceDto;
import hr.kingict.kingspace.form.WorkplaceForm;

import java.util.List;

public interface WorkplaceFacade {
    void createNewWorkplace(WorkplaceForm workplaceForm);

    WorkplaceDto getWorkplaceById(Long id);

    List<WorkplaceDto> getAllWorplaces();

    void deleteWorkplaceById(Long id);
}
