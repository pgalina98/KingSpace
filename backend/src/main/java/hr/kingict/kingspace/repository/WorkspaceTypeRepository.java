package hr.kingict.kingspace.repository;

import hr.kingict.kingspace.entity.WorkspaceType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkspaceTypeRepository extends JpaRepository<WorkspaceType, Long> {

    WorkspaceType findWorkspaceTypeById(Long workspaceTypeId);
    List<WorkspaceType> findByName(String name);
}
