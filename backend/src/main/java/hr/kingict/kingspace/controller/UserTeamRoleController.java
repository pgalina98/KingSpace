package hr.kingict.kingspace.controller;

import hr.kingict.kingspace.dto.UserTeamRoleDto;
import hr.kingict.kingspace.dto.WorkspaceDto;
import hr.kingict.kingspace.entity.UserTeamRole;
import hr.kingict.kingspace.facade.UserTeamRoleFacade;
import hr.kingict.kingspace.form.UserTeamRoleForm;
import hr.kingict.kingspace.security.error.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/userTeamRoles")
public class UserTeamRoleController {

    private final UserTeamRoleFacade userTeamRoleFacade;

    public UserTeamRoleController(UserTeamRoleFacade userTeamRoleFacade) {
        this.userTeamRoleFacade = userTeamRoleFacade;
    }

    @GetMapping
    public List<UserTeamRoleDto> getAllUserTeamRoles(){
        return userTeamRoleFacade.getAllUserTeamRoles();
    }

    @PostMapping
    public void createNewUserTeamRole(@Valid @RequestBody UserTeamRoleForm userTeamRoleForm){
        userTeamRoleFacade.createNewUserTeamRole(userTeamRoleForm);
    }

    @PutMapping("/{id}")
    public void editUserTeamRole(@PathVariable("id") Long userTeamRoleId, @Valid @RequestBody UserTeamRoleForm userTeamRoleForm){
        userTeamRoleFacade.editUserTeamRole(userTeamRoleId, userTeamRoleForm);
    }

    @DeleteMapping("/{id}")
    public void deleteUserTeamRoleById(@PathVariable("id") Long userTeamRoleId, @RequestParam(required = false) String user) {

        userTeamRoleFacade.deleteUserTeamRoleById(userTeamRoleId, user);
    }
}
