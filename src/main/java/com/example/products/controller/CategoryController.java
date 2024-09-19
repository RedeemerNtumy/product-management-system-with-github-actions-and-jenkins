package com.example.products.controller;

import com.example.products.model.Category;
import com.example.products.model.Subcategory;
import com.example.products.service.CategoryService;
import com.example.products.service.ProductService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    CategoryService categoryService;
    ProductService productService;

    public CategoryController(CategoryService categoryService, ProductService productService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestParam String name) {
        try {
            Category category = categoryService.createCategory(name);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable("id") int id, @RequestBody Map<String, String> body) {
        try {
            String name = body.get("name");
            Category category = categoryService.getCategoryById(id);
            if (category != null) {
                category.setName(name);
                Category updatedCategory = categoryService.updateCategory(category);
                return ResponseEntity.ok(updatedCategory);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating category: " + e.getMessage());
        }
    }

    @PostMapping("/{categoryId}/subcategories")
    public ResponseEntity<Subcategory> addSubcategory(@PathVariable int categoryId, @RequestParam String name, HttpServletResponse response) {
        try {
            Subcategory subcategory = categoryService.addSubcategoryToCategory(categoryId, name);
            return ResponseEntity.ok(subcategory);
        } catch (IllegalStateException e) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return ResponseEntity.badRequest().body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{categoryId}")
    public ResponseEntity<Category> getCategoryWithSubcategories(@PathVariable int categoryId) {
        try {
            Category category = categoryService.getCategoryById(categoryId);
            if (category != null) {
                return ResponseEntity.ok(category);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        try {
            List<Category> categories = categoryService.getAllCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/subcategories")
    public ResponseEntity<List<Subcategory>> getAllSubcategories() {
        try {
            List<Subcategory> subcategories = categoryService.getAllSubcategories();
            return ResponseEntity.ok(subcategories);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/{categoryId}/subcategories")
    public ResponseEntity<List<Subcategory>> getSubcategoriesByCategory(@PathVariable int categoryId) {
        try {
            List<Subcategory> subcategories = categoryService.getSubcategoriesByCategoryId(categoryId);
            if (subcategories.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(subcategories);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @DeleteMapping("/{categoryId}/subcategories/{subcategoryId}")
    public ResponseEntity<?> deleteSubcategory(@PathVariable Long subcategoryId) {
        try {
            categoryService.deleteSubcategory(subcategoryId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable int categoryId) {
        try {
            Category category = categoryService.getCategoryById(categoryId);
            if (category != null) {
                if (category.hasSubCategory(category)) {
                    return ResponseEntity.badRequest().body("Cannot delete category because it has subcategories.");
                }
                categoryService.deleteCategory(categoryId);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting category: " + e.getMessage());
        }
    }
}
