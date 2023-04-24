package com.capstone.InvetoryManagement.controllers;

import com.capstone.InvetoryManagement.models.Inventory;
import com.capstone.InvetoryManagement.repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inventories")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @GetMapping
    public List<Inventory> list(){
        return inventoryRepository.findAll();
    }

}
