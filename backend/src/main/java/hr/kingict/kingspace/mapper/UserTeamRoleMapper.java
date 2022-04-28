package hr.kingict.kingspace.mapper;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.dto.UserTeamRoleDto;
import hr.kingict.kingspace.entity.UserTeamRole;

import java.util.List;

public interface UserTeamRoleMapper {

    UserTeamRoleDto map(UserTeamRole userTeamRole);
    List<UserTeamRoleDto> map(List<UserTeamRole> userTeamsRoles);
}
