package hr.kingict.kingspace.service;

import hr.kingict.kingspace.form.LoginForm;

public interface LoginLogService {

    void addLoginLog(LoginForm loginForm, String ipAddress);
}
