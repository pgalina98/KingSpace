package hr.kingict.kingspace.repository;

import hr.kingict.kingspace.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    Workspace findWorkspaceById(Long id);
    Workspace findWorkspaceByWorkplacesId(Long id);
}
