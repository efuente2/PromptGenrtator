package com.mtit.microservice.documentservice.documentservice.repository;

import com.mtit.microservice.documentservice.documentservice.util.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepositroy extends JpaRepository<Product, Integer> {

}
