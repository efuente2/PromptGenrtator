package com.mtit.microservice.documentservice.documentservice.service;

import com.mtit.microservice.documentservice.documentservice.dto.FormRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail( String to, String subject, String content) {


        if(to == null || to.isEmpty() || subject == null || subject.isEmpty() || content == null || content.isEmpty()){
            throw new IllegalArgumentException("Invalid email parameters" + to + "  " + subject + "  " + content);
        }
        else{
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom("earnestofuentes@gmail.com");
            mail.setTo(to);
            mail.setSubject(subject);
            mail.setText(content);
            javaMailSender.send(mail);
        }


    }
}
