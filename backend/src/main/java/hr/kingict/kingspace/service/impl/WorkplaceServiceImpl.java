package hr.kingict.kingspace.service.impl;

import hr.kingict.kingspace.entity.Workplace;
import hr.kingict.kingspace.repository.WorkplaceRepository;
import hr.kingict.kingspace.service.WorkplaceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkplaceServiceImpl implements WorkplaceService {

    private final WorkplaceRepository workplaceRepository;

    public WorkplaceServiceImpl(WorkplaceRepository workplaceRepository) {

        this.workplaceRepository = workplaceRepository;
    }

    @Override
    public void createNewWorkplace(Workplace workplace) {
        workplaceRepository.save(workplace);
    }

    @Override
    public Workplace getWorkplaceById(Long id) {
        return workplaceRepository.findWorkplaceById(id);
    }

    @Override
    public List<Workplace> getAllWorplaces() {
        return workplaceRepository.findAll();
    }

    @Override
    public void deleteWorkplaceById(Long workplaceId) {
        workplaceRepository.deleteById(workplaceId);
    }
}
