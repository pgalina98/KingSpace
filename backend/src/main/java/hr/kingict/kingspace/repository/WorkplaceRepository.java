package hr.kingict.kingspace.repository;

import hr.kingict.kingspace.entity.Workplace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkplaceRepository extends JpaRepository<Workplace, Long> {

    Workplace findWorkplaceById(Long id);
    List<Workplace> findByName(String name);
}
