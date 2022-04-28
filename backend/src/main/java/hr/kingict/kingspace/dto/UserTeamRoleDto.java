package hr.kingict.kingspace.dto;

import lombok.Data;

@Data
public class UserTeamRoleDto {

    private Long id;

    private String user;

    private RoleDto role;

    private TeamDto team;
}
