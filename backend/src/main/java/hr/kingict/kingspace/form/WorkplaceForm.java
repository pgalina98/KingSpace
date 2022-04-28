package hr.kingict.kingspace.form;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class WorkplaceForm {

    @NotEmpty
    private String name;
}
