package hr.kingict.kingspace.service;

import hr.kingict.kingspace.entity.Workplace;

import java.util.List;

public interface WorkplaceService {
    void createNewWorkplace(Workplace boxSeat);

    Workplace getWorkplaceById(Long id);

    List<Workplace> getAllWorplaces();

    void deleteWorkplaceById(Long worplaceId);
}
