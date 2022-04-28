package hr.kingict.kingspace.facade.impl;

import hr.kingict.kingspace.facade.LoginLogFacade;
import hr.kingict.kingspace.form.LoginForm;
import hr.kingict.kingspace.service.LoginLogService;
import org.springframework.stereotype.Component;

@Component
public class LoginLogFacadeImpl implements LoginLogFacade {

    private final LoginLogService loginLogService;

    public LoginLogFacadeImpl(LoginLogService loginLogService) {
        this.loginLogService = loginLogService;
    }

    @Override
    public void addLoginLog(LoginForm loginForm, String ipAddress) {
        loginLogService.addLoginLog(loginForm, ipAddress);
    }
}
