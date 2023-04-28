package com.capstone.InvetoryManagement.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity(name = "good")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Good {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long good_id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private Integer amount;

    @Getter
    @Setter
    private BigDecimal weight_per_unit;

    /**
     * References the inventory section its currently in.
     * Json only returns the inventory id
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "section_id", nullable = false)
    @JsonIncludeProperties(value = {"section_id"})
    @Getter
    @Setter
    private InventorySection section;


    public Good(){}
}
