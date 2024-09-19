package com.example.products.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "left_subcategory_id", referencedColumnName = "id")
    @JsonManagedReference
    private Subcategory leftSubcategory;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "right_subcategory_id", referencedColumnName = "id")
    @JsonManagedReference
    private Subcategory rightSubcategory;

    public Category() {
    }

    public Category(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Subcategory getLeftSubcategory() {
        return leftSubcategory;
    }

    public boolean hasSubCategory(Category category) {
        return (category.rightSubcategory != null && category.equals(rightSubcategory)) || (category.leftSubcategory != null && category.equals(leftSubcategory));
    }

    public void setLeftSubcategory(Subcategory leftSubcategory) {
        this.leftSubcategory = leftSubcategory;
    }

    public Subcategory getRightSubcategory() {
        return rightSubcategory;
    }

    public void setRightSubcategory(Subcategory rightSubcategory) {
        this.rightSubcategory = rightSubcategory;
    }

    public boolean addSubcategory(Subcategory subcategory) {
        if (leftSubcategory == null) {
            this.leftSubcategory = subcategory;
            return true;
        } else if (rightSubcategory == null) {
            this.rightSubcategory = subcategory;
            return true;
        }
        return false;
    }
}
