package hr.kingict.kingspace.service.impl;

import hr.kingict.kingspace.entity.LoginLog;
import hr.kingict.kingspace.entity.User;
import hr.kingict.kingspace.form.LoginForm;
import hr.kingict.kingspace.repository.CustomADRepository;
import hr.kingict.kingspace.repository.LoginLogRepository;
import hr.kingict.kingspace.service.LoginLogService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class LoginLogServiceImpl implements LoginLogService {

    private final LoginLogRepository loginLogRepository;
    private final CustomADRepository customADRepository;

    public LoginLogServiceImpl(LoginLogRepository loginLogRepository, CustomADRepository customADRepository) {
        this.loginLogRepository = loginLogRepository;
        this.customADRepository = customADRepository;
    }

    @Override
    public void addLoginLog(LoginForm loginForm, String ipAddress) {
        LoginLog loginLog = new LoginLog();

        User user = customADRepository.findLdapUserByEmail(loginForm.getEmail());

        loginLog.setUser(user.getUsername());
        loginLog.setDateOfLogin(LocalDateTime.now());
        loginLog.setIpAddress(ipAddress);
        loginLog.setCreatedByUser(user.getUsername());
        loginLog.setUpdatedByUser(user.getUsername());
        loginLog.setCreated(LocalDateTime.now());
        loginLog.setUpdated(LocalDateTime.now());
        loginLog.setValidFrom(LocalDate.now());
        loginLog.setValidUntil(null);
        loginLog.setIsActive(true);

        loginLogRepository.save(loginLog);
    }
}
