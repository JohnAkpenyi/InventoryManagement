package com.capstone.InvetoryManagement.models;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;
import java.util.Set;

@Entity(name = "inventory_section")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class InventorySection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long section_id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "inventory_id", nullable = false)
    @JsonIncludeProperties(value = {"inventory_id"})
    @Getter
    @Setter
    private Inventory inventory;
////
//    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "section_id")
    @JsonIncludeProperties(value = {"good_id"})
    @Getter
    @Setter
    private Set<Good> goods;

    public InventorySection() {

    }
}

