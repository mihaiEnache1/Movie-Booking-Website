package com.project.project.entity;

import com.project.project.email.EmailSender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User implements Observer{
    @Id
    private String username;
    private String password;
    private String email;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ROLE", joinColumns = {
            @JoinColumn(name = "USER_ID")
    },
            inverseJoinColumns = {
            @JoinColumn(name = "ROLE_ID")
            }
    )
    private Set<Role> role;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @Override
    public void notify(String title) {
        if (!role.isEmpty()) {
            if (role.iterator().next().getRoleName().equals("User")) {
                EmailSender emailSender = EmailSender.getEmailInstance();
                try {
                    emailSender.sendEmail(email, title);
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
            }
        }
    }
}
