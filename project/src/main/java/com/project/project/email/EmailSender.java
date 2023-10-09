package com.project.project.email;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailSender {
    private Properties properties;
    private static EmailSender emailSender;

    private EmailSender() {
        properties = new Properties();
        properties.setProperty("mail.smtp.host", "localhost");
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.port", "1025");
        properties.setProperty("mail.smtp.starttls.enable", "true");
    }

    public static EmailSender getEmailInstance() {
        if (emailSender == null) {
            emailSender = new EmailSender();
        }
        return emailSender;
    }

    public void sendEmail(String to, String title) throws MessagingException {
        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("hello", "hello");
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress("admin@yahoo.com"));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
        message.setSubject(title);
        message.setText("Go check out! :)");

        Transport.send(message);
    }
}
