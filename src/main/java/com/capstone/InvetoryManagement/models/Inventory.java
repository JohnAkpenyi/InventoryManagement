package com.capstone.InvetoryManagement.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;


import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Entity(name = "inventory")
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
    private Integer amount_of_goods;

    @Getter
    @Setter
    private BigDecimal total_inventory_sales;

    @Getter
    @Setter
    private Integer total_goods_ready_for_sale;

    @Getter
    @Setter
    private Integer total_goods_in_progress;

    @Getter
    @Setter
    private Integer total_goods_raw;

    //    @OneToMany(mappedBy = "inventory")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "inventory_id")
    @JsonIncludeProperties(value = {"section_id", "goods"})
    @Getter
    @Setter
    private Set<InventorySection> sections;
//
////    @OneToMany(mappedBy = "inventory",
////            orphanRemoval = true,
////            fetch = FetchType.LAZY,
////            cascade = CascadeType.ALL)
////    @JsonIgnore
//
//
////    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
////    @JoinColumn(name = "inventory_id")
////    @JsonIncludeProperties(value = {"good_id"})
////    @Getter
////    @Setter
////    private Set<Good> goods;




    public Inventory() {

    }
}
