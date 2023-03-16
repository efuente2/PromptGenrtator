package com.mtit.microservice.documentservice.documentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClaimsResponse {
    private int id;
    private String amount;
    private String date;
    private String claimId;
}
