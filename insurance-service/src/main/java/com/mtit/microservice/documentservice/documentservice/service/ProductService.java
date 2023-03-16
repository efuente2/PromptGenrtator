package com.mtit.microservice.documentservice.documentservice.service;

import com.mtit.microservice.documentservice.documentservice.dto.ProductResponse;
import com.mtit.microservice.documentservice.documentservice.dto.ProductRequest;
import com.mtit.microservice.documentservice.documentservice.util.Product;
import com.mtit.microservice.documentservice.documentservice.repository.ProductRepositroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
@Slf4j
public class ProductService {

    @Autowired
    private ProductRepositroy productRepositroy;
    @Autowired
    private WebClient.Builder webClient;

    public void newTransaction (ProductRequest paymentRequest, MultipartFile file) throws IOException {
        Product product = Product.builder()
                .Price(paymentRequest.getPrice())
                .Title(paymentRequest.getTitle())
                .Category(paymentRequest.getCategory())
                .image(CompressImage(file.getBytes()))
                .build();


            productRepositroy.save(product);
            log.info("Product " + product.getId() + " is saved");

    }

    private byte[] CompressImage(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        while (!deflater.finished()){
            int count = deflater.deflate(tmp);
            outputStream.write(tmp, 0, count);
        }
        try {
            outputStream.close();}
        catch (Exception ignored) {

        }
        return outputStream.toByteArray();
    }

    public static byte[] decompressImage(byte[] data){
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        try{
            while (!inflater.finished()){
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
        }
        catch (Exception ignored) {
        }
        return outputStream.toByteArray();
    }


    public List<ProductResponse> getAllClaims(){
        List<Product> productList = productRepositroy.findAll();

        return productList.stream().map(this::mapToClaimResponse).toList();
    }

    private ProductResponse mapToClaimResponse(Product product) {
        log.info("Product " + product.getId() + " was retrieved");


        return ProductResponse.builder()
                .id(product.getId())
                .title(product.getTitle())
                .price(product.getPrice())
                .category(product.getCategory())
                .description(product.getDescription())
                .image(decompressImage(product.getImage()))
                .build();
    }

    public ProductResponse getClaimByID(int id){
        Optional<Product> paymentList = productRepositroy.findById(id);
        return paymentList.map(this::mapToClaimResponse).orElse(null);
    }

    public String DeleteProduct(int id){
        if(productRepositroy.existsById(id)){
            productRepositroy.deleteById(id);
            return "Product " + id + " was deleted";
        }
        else {
            return "Product " + id + " does not exist";
        }
    }

    public Product updateProductsByFields(int id, Map<String, Object> fields) {
        Optional<Product> existingClaim = productRepositroy.findById(id);
        if(existingClaim.isPresent()){
        fields.forEach((key,value) ->{
            Field field = ReflectionUtils.findField(Product.class, key);
            field.setAccessible(true);
            ReflectionUtils.setField(field, existingClaim.get(), value);
        });
        return productRepositroy.save(existingClaim.get());
    }
        return null;
    }
}
