package hr.kingict.kingspace.form;

import lombok.Data;

@Data
public class UserTeamRoleForm {

    private String user;

    private Long roleId;

    private Long teamId;

    private String createdByUser;
}
