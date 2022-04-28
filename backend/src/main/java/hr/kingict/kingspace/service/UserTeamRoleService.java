package hr.kingict.kingspace.service;

import hr.kingict.kingspace.entity.UserTeamRole;

import java.util.List;

public interface UserTeamRoleService {

    List<UserTeamRole> getAllUserTeamsAndRolesByUsername(String username);
    List<UserTeamRole> getAllUserTeamRoles();
    void createNewUserTeamRole(UserTeamRole userTeamRole);
    UserTeamRole getUserTeamRoleById(Long userTeamRoleId);
    void editUserTeamRole(UserTeamRole userTeamRole);
    void deleteUserTeamRoleById(Long userTeamRoleId, String user);
}
