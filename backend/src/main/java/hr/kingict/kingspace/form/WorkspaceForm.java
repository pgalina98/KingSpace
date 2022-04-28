package hr.kingict.kingspace.form;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class WorkspaceForm {

    @NotEmpty
    private String name;

    @Positive
    private Integer capacity;

    @NotNull
    private Long typeId;

    @NotNull
    private String user;

    @NotEmpty
    private String imageURL;
}
