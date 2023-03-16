package com.mtit.microservice.documentservice.documentservice.repository;

import com.mtit.microservice.documentservice.documentservice.util.Form;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Form, Integer> {

}
