package hr.kingict.kingspace.facade;

import hr.kingict.kingspace.form.LoginForm;

public interface LoginLogFacade {

    void addLoginLog(LoginForm loginForm, String ipAddress);
}
