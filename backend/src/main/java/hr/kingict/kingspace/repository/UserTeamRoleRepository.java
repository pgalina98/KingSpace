package hr.kingict.kingspace.repository;

import hr.kingict.kingspace.entity.UserTeamRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTeamRoleRepository extends JpaRepository<UserTeamRole, Long> {

    List<UserTeamRole> findAllByUser(String username);
    UserTeamRole findUserTeamRoleById(Long userTeamRoleId);
}
