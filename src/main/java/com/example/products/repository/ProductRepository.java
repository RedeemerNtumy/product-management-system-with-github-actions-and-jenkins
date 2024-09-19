package com.example.products.repository;

import com.example.products.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.subcategory.id = ?1")
    List<Product> findAllBySubcategoryId(Long subcategoryId);

    @Query("SELECT p FROM Product p WHERE p.subcategory.category.id = ?1")
    List<Product> findAllByCategoryId(Long categoryId);
}
