package hr.kingict.kingspace.service.impl;

import hr.kingict.kingspace.entity.UserTeamRole;
import hr.kingict.kingspace.repository.RoleRepository;
import hr.kingict.kingspace.repository.UserTeamRoleRepository;
import hr.kingict.kingspace.service.UserTeamRoleService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserTeamRoleServiceImpl implements UserTeamRoleService {

    private final UserTeamRoleRepository userTeamRoleRepository;

    public UserTeamRoleServiceImpl(UserTeamRoleRepository userTeamRoleRepository) {
        this.userTeamRoleRepository = userTeamRoleRepository;
    }

    @Override
    public List<UserTeamRole> getAllUserTeamsAndRolesByUsername(String username) {
        return userTeamRoleRepository.findAllByUser(username);
    }

    @Override
    public List<UserTeamRole> getAllUserTeamRoles() {
        return userTeamRoleRepository.findAll()
                .stream()
                .filter(userTeamRole -> userTeamRole.getIsActive() == true && !userTeamRole.getRole().getName().equals("Admin"))
                .collect(Collectors.toList());
    }

    @Override
    public void createNewUserTeamRole(UserTeamRole userTeamRole) {
        userTeamRoleRepository.save(userTeamRole);
    }

    @Override
    public UserTeamRole getUserTeamRoleById(Long userTeamRoleId) {
        return userTeamRoleRepository.findUserTeamRoleById(userTeamRoleId);
    }

    @Override
    public void editUserTeamRole(UserTeamRole userTeamRole) {
        userTeamRoleRepository.save(userTeamRole);
    }

    @Override
    public void deleteUserTeamRoleById(Long userTeamRoleId, String user) {
        UserTeamRole userTeamRole = getUserTeamRoleById(userTeamRoleId);

        userTeamRole.setIsActive(false);
        userTeamRole.setUpdatedByUser(user);
        userTeamRole.setUpdated(LocalDateTime.now());

        userTeamRoleRepository.save(userTeamRole);
    }


}
