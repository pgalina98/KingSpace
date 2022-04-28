package hr.kingict.kingspace.utils;

import hr.kingict.kingspace.form.EmailForm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailSenderService {

    @Value("${spring.mail.username}")
    private String from;

    private final JavaMailSender javaMailSender;

    public EmailSenderService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(EmailForm emailForm) throws MessagingException {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(from);
        message.setTo(emailForm.getTo());
        message.setSubject(emailForm.getSubject());
        message.setText(emailForm.getBody());

        javaMailSender.send(message);
    }
}
