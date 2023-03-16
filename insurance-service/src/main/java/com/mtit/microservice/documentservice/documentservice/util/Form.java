package com.mtit.microservice.documentservice.documentservice.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Form")

public class Form {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "name")
    private String Name;

    @Column(name = "email")
    private String Email;

    @Column(name = "Subject")
    public String Subject;

    @Column(name = "message")
    public String Message;

    public int getId(){return id;}
    public String getName() {return Name;}
    public String getEmail() {return Email;}
    public String getSubject() {return Subject;}
    public String getMessage() {return Message;}

}
