package com.capstone.InvetoryManagement.controllers;

import com.capstone.InvetoryManagement.models.InventorySection;
import com.capstone.InvetoryManagement.repositories.InventorySectionRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inventorySections")
public class InventorySectionController {

    @Autowired
    private InventorySectionRespository inventorySectionRespository;

    @GetMapping
    public List<InventorySection> list(){
        return inventorySectionRespository.findAll();
    }

}
