package hr.kingict.kingspace.mapper.impl;

import hr.kingict.kingspace.dto.TeamDto;
import hr.kingict.kingspace.entity.Team;
import hr.kingict.kingspace.mapper.TeamMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class TeamMapperImpl implements TeamMapper {
    @Override
    public TeamDto map(Team team) {
        return Optional.ofNullable(team).map(t -> {

            TeamDto teamDto = new TeamDto();
            teamDto.setId(t.getId());
            teamDto.setName(t.getName());

            return teamDto;
        }).orElse(null);
    }

    @Override
    public List<TeamDto> map(List<Team> teams) {
        return teams.stream()
                    .map(team -> map(team)).collect(Collectors.toList());
    }
}
