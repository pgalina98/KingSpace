package hr.kingict.kingspace.facade;

import hr.kingict.kingspace.dto.UserTeamRoleDto;
import hr.kingict.kingspace.form.UserTeamRoleForm;

import java.util.List;

public interface UserTeamRoleFacade {

    List<UserTeamRoleDto> getAllUserTeamsAndRolesByUsername(String username);
    List<UserTeamRoleDto> getAllUserTeamRoles();
    void createNewUserTeamRole(UserTeamRoleForm userTeamRoleForm);
    void editUserTeamRole(Long userTeamRoleId, UserTeamRoleForm userTeamRoleForm);
    void deleteUserTeamRoleById(Long userTeamRoleId, String user);
}
