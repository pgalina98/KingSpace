package hr.kingict.kingspace.mapper;

import hr.kingict.kingspace.dto.TeamDto;
import hr.kingict.kingspace.entity.Team;

import java.util.List;

public interface TeamMapper {

    TeamDto map(Team team);
    List<TeamDto> map (List<Team> teams);
}
