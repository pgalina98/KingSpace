package hr.kingict.kingspace.mapper.impl;

import hr.kingict.kingspace.dto.UserTeamRoleDto;
import hr.kingict.kingspace.entity.UserTeamRole;
import hr.kingict.kingspace.mapper.RoleMapper;
import hr.kingict.kingspace.mapper.TeamMapper;
import hr.kingict.kingspace.mapper.UserTeamRoleMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class UserTeamRoleMapperImpl implements UserTeamRoleMapper {

    private final RoleMapper roleMapper;
    private final TeamMapper teamMapper;

    public UserTeamRoleMapperImpl(RoleMapper roleMapper, TeamMapper teamMapper) {
        this.roleMapper = roleMapper;
        this.teamMapper = teamMapper;
    }

    @Override
    public UserTeamRoleDto map(UserTeamRole userTeamRole) {
        return Optional.ofNullable(userTeamRole).map(utr -> {

            UserTeamRoleDto userTeamRoleDto = new UserTeamRoleDto();

            userTeamRoleDto.setId(utr.getId());
            userTeamRoleDto.setUser(utr.getUser());
            userTeamRoleDto.setRole(roleMapper.map(utr.getRole()));
            userTeamRoleDto.setTeam(teamMapper.map(utr.getTeam()));

            return userTeamRoleDto;
        }).orElse(null);
    }

    @Override
    public List<UserTeamRoleDto> map(List<UserTeamRole> userTeamsRoles) {
        return userTeamsRoles.stream()
                .map(userTeamRole -> map(userTeamRole)).collect(Collectors.toList());
    }
}
