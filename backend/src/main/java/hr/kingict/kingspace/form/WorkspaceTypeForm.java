package hr.kingict.kingspace.form;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class WorkspaceTypeForm {

    @NotEmpty
    private String name;
}
