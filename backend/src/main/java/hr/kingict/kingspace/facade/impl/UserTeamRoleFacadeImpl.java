package hr.kingict.kingspace.facade.impl;

import hr.kingict.kingspace.dto.UserTeamRoleDto;
import hr.kingict.kingspace.entity.UserTeamRole;
import hr.kingict.kingspace.facade.UserTeamRoleFacade;
import hr.kingict.kingspace.form.UserTeamRoleForm;
import hr.kingict.kingspace.mapper.UserTeamRoleMapper;
import hr.kingict.kingspace.service.UserTeamRoleService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class UserTeamRoleFacadeImpl implements UserTeamRoleFacade {

    private final UserTeamRoleService userRoleTeamService;
    private final UserTeamRoleMapper userTeamRoleMapper;

    public UserTeamRoleFacadeImpl(UserTeamRoleService userRoleTeamService, UserTeamRoleMapper userTeamRoleMapper) {
        this.userRoleTeamService = userRoleTeamService;
        this.userTeamRoleMapper = userTeamRoleMapper;
    }

    @Override
    public List<UserTeamRoleDto> getAllUserTeamsAndRolesByUsername(String username) {
        return userTeamRoleMapper.map(userRoleTeamService.getAllUserTeamsAndRolesByUsername(username));
    }

    public UserTeamRoleDto getUserTeamRoleById(Long userTeamRoleId){
        return userTeamRoleMapper.map(userRoleTeamService.getUserTeamRoleById(userTeamRoleId));
    }

    @Override
    public List<UserTeamRoleDto> getAllUserTeamRoles() {
        return userTeamRoleMapper.map(userRoleTeamService.getAllUserTeamRoles());
    }

    @Override
    public void createNewUserTeamRole(UserTeamRoleForm userTeamRoleForm) {
        UserTeamRole userTeamRole = new UserTeamRole();

        BeanUtils.copyProperties(userTeamRoleForm, userTeamRole);
        userTeamRole.setIsActive(true);
        userTeamRole.setCreated(LocalDateTime.now());
        userTeamRole.setUpdated(LocalDateTime.now());
        userTeamRole.setCreatedByUser(userTeamRoleForm.getCreatedByUser());
        userTeamRole.setUpdatedByUser(userTeamRole.getCreatedByUser());
        userTeamRole.setValidFrom(LocalDate.now());

        userRoleTeamService.createNewUserTeamRole(userTeamRole);
    }

    @Override
    public void editUserTeamRole(Long userTeamRoleId, UserTeamRoleForm userTeamRoleForm) {
        UserTeamRole userTeamRole = userRoleTeamService.getUserTeamRoleById(userTeamRoleId);

        BeanUtils.copyProperties(userTeamRoleForm, userTeamRole);
        userTeamRole.setIsActive(true);
        userTeamRole.setUpdated(LocalDateTime.now());
        userTeamRole.setUpdatedByUser(userTeamRole.getCreatedByUser());

        userRoleTeamService.editUserTeamRole(userTeamRole);
    }

    @Override
    public void deleteUserTeamRoleById(Long userTeamRoleId, String user) {
        userRoleTeamService.deleteUserTeamRoleById(userTeamRoleId, user);
    }
}
