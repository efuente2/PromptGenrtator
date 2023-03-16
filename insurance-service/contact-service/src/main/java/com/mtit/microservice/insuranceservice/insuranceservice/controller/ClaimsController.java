package com.mtit.microservice.documentservice.documentservice.controller;

import com.mtit.microservice.documentservice.documentservice.dto.ClaimsResponse;
import com.mtit.microservice.documentservice.documentservice.dto.ClaimsRequest;
import com.mtit.microservice.documentservice.documentservice.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClaimsController {

    @Autowired
    private ClaimService paymentService;

    @PostMapping("/Product")
    @ResponseStatus(HttpStatus.CREATED)
    public void newTransaction(@RequestBody ClaimsRequest paymentRequest){
        paymentService.newTransaction(paymentRequest);
    }

    @GetMapping("/Product")



    @GetMapping("/Product")
    @ResponseStatus(HttpStatus.OK)
    public List<ClaimsResponse> getAllPayments(){
        return paymentService.getAllClaims();
    }

    @GetMapping("/Product/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ClaimsResponse getPaymentById(@PathVariable("id") String id){
        return paymentService.getClaimByID(id);
    }


}
