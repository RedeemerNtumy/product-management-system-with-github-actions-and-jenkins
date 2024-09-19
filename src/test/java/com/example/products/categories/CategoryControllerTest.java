package com.example.products.categories;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;

import java.util.HashMap;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;


@TestMethodOrder(OrderAnnotation.class)
public class CategoryControllerTest {

    @BeforeEach
    public void setup() {
        RestAssured.baseURI = "http://localhost:8081";
    }

    @Test
    @Order(1) // Run first
    public void testCreateCategory() {
        String categoryName = "Academics";

        Response response = given()
                .param("name", categoryName)
                .when()
                .post("/api/categories")
                .then()
                .statusCode(200)
                .body("name", equalTo(categoryName))
                .extract().response();
    }

    @Test
    @Order(2) // Run second
    public void testUpdateCategory() {
        Map<String, String> body = new HashMap<>();
        body.put("name", "Updated Category");

        given()
                .contentType(ContentType.JSON)
                .body(body)
                .when()
                .put("/api/categories/1")
                .then()
                .statusCode(200)
                .body("name", equalTo("Updated Category"));
    }

    @Test
    @Order(3) // Run third
    public void testAddSubcategory() {
        int categoryId = 1;
        String subcategoryName = "Mobile Phones";

        given()
                .param("name", subcategoryName)
                .when()
                .post("/api/categories/" + categoryId + "/subcategories")
                .then()
                .statusCode(200)
                .body("name", equalTo(subcategoryName));
    }

    @Test
    @Order(4) // Run fourth
    public void testGetCategoryWithSubcategories() {
        int categoryId = 1;

        given()
                .when()
                .get("/api/categories/" + categoryId)
                .then()
                .statusCode(200)
                .body("id", equalTo(categoryId))
                .body("leftSubcategory", notNullValue());
    }

    @Test
    @Order(5)
    public void testGetAllCategories() {
        given()
                .when()
                .get("/api/categories")
                .then()
                .statusCode(200)
                .body("size()", greaterThan(0));
    }

    @Test
    @Order(6)
    public void testGetAllSubcategories() {
        given()
                .when()
                .get("/api/categories/subcategories")
                .then()
                .statusCode(200)
                .body("size()", greaterThan(0));
    }

    @Test
    @Order(7)
    public void testGetSubcategoriesByCategory() {
        int categoryId = 1;

        given()
                .when()
                .get("/api/categories/" + categoryId + "/subcategories")
                .then()
                .statusCode(200)
                .body("size()", greaterThan(0));
    }

    @Test
    @Order(8)
    public void testDeleteSubcategory() {
        int subcategoryId = 1;

        given()
                .when()
                .delete("/api/categories/1/subcategories/" + subcategoryId)
                .then()
                .statusCode(200);
    }

    @Test
    @Order(9)
    public void testDeleteCategory() {
        int categoryId = 1;

        given()
                .when()
                .delete("/api/categories/" + categoryId)
                .then()
                .statusCode(200);
    }

    @Test
    @Order(10)
    public void testGetNonExistentCategory() {
        int categoryId = 1;

        given()
                .when()
                .get("/api/categories/" + categoryId)
                .then()
                .statusCode(404);
    }

    @Test
    @Order(11) // Attempt to retrieve a non-existent product
    public void testGetNonExistentProduct() {
        Long nonExistentProductId = 9999L; // Assuming this product doesn't exist

        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/api/products/" + nonExistentProductId)
                .then()
                .statusCode(404);
    }

    @Test
    @Order(12) // Get all products
    public void testGetAllProducts() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/api/products")
                .then()
                .statusCode(200)
                .body("size()", equalTo(0));
    }

}
