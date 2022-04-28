package hr.kingict.kingspace.form;

import lombok.Data;

@Data
public class EmailForm {

    private String to;

    private String subject;

    private String body;
}
