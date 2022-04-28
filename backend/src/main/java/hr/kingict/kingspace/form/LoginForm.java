package hr.kingict.kingspace.form;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class LoginForm {

    @NotNull
    private String email;

    @NotNull
    private String password;
}
