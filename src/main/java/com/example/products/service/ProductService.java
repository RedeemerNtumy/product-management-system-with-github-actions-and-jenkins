package com.example.products.service;

import com.example.products.model.Category;
import com.example.products.model.Product;
import com.example.products.model.Subcategory;
import com.example.products.repository.CategoryRepository;
import com.example.products.repository.ProductRepository;
import com.example.products.repository.SubcategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    ProductRepository productRepository;
    CategoryRepository categoryRepository;
    SubcategoryRepository subcategoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, SubcategoryRepository subcategoryRepository){
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.subcategoryRepository = subcategoryRepository;
    }

    @Transactional
    public Product addProduct(Product product) {
        Subcategory subcategory = subcategoryRepository.findById(Optional.ofNullable(product.getSubcategory().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid subcategory ID")))
                .orElseThrow(() -> new IllegalArgumentException("Subcategory not found"));
        product.setSubcategory(subcategory);
        return productRepository.save(product);
    }

    public List<Product> searchProducts(String searchTerm) {
        List<Category> allCategories = categoryRepository.findAll();
        List<Product> matchedProducts = new ArrayList<>();
        for (Category category : allCategories) {
            traverseAndMatch(category, searchTerm, matchedProducts);
        }
        return matchedProducts;
    }

    private void traverseAndMatch(Category category, String searchTerm, List<Product> matchedProducts) {
        if (category.getLeftSubcategory() != null) {
            matchProductsInSubcategory(category.getLeftSubcategory(), searchTerm, matchedProducts);
        }
        if (category.getRightSubcategory() != null) {
            matchProductsInSubcategory(category.getRightSubcategory(), searchTerm, matchedProducts);
        }
    }

    private void matchProductsInSubcategory(Subcategory subcategory, String searchTerm, List<Product> matchedProducts) {
        for (Product product : subcategory.getProducts()) {
            if (product.getName().contains(searchTerm)) {
                matchedProducts.add(product);
            }
        }
    }
    @Transactional
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    @Transactional
    public Product updateProduct(Long productId, String newName) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            Product existingProduct = product.get();
            existingProduct.setName(newName);
            return productRepository.save(existingProduct);
        } else {
            throw new IllegalArgumentException("Product not found");
        }
    }

    @Transactional
    public void deleteProduct(Long productId) {
        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
        } else {
            throw new IllegalArgumentException("Product not found");
        }
    }

    public List<Product> getAllProductsBySubcategoryId(Long subcategoryId) {
        return productRepository.findAllBySubcategoryId(subcategoryId);
    }

    public List<Product> getAllProductsByCategoryId(Long categoryId) {
        return productRepository.findAllByCategoryId(categoryId);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
