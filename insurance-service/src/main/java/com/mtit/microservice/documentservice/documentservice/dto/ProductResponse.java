package com.mtit.microservice.documentservice.documentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private int id;
    private String title;
    private int price;
    private String category;
    private String description;
    private byte[] image;
}
