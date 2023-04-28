package com.capstone.InvetoryManagement.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;
import java.math.BigDecimal;
import java.util.Set;

@Entity(name = "inventory")
@DynamicUpdate
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long inventory_id;

    @Getter
    @Setter
    private Integer max_goods;

    @Getter
    @Setter
    private BigDecimal total_inventory_sales;

    /**
     * References the sections in the current inventory.
     * Json only returns the section id and the goods array inside the section, which will only contain the good id's.
     */
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "inventory_id")
    @JsonIncludeProperties(value = {"section_id", "goods"})
    @Getter
    @Setter
    private Set<InventorySection> sections;

    public Inventory() {}

}
