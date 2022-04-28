package hr.kingict.kingspace.repository;

import hr.kingict.kingspace.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

    Team findTeamById(Long id);
}
