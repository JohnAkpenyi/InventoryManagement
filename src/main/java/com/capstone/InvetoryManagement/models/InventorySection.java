package com.capstone.InvetoryManagement.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;
import java.util.Set;

@Entity(name = "inventory_section")
@DynamicUpdate
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

    /**
     * References the inventory it belongs to.
     * Json only returns the inventory id.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "inventory_id", nullable = false)
    @JsonIncludeProperties(value = {"inventory_id"})
    @Getter
    @Setter
    private Inventory inventory;

    /**
     * References the goods in the current section.
     * Json only returns the goods id in an array.
     */
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "section_id")
    @JsonIncludeProperties(value = {"good_id"})
    @Getter
    @Setter
    private Set<Good> goods;

    public InventorySection() {}
}

