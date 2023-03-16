package com.mtit.microservice.documentservice.documentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class FormRequest{
    private String name;
    private String email;
    private String subject;
    private String message;



}
