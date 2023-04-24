package com.capstone.InvetoryManagement.controllers;

import com.capstone.InvetoryManagement.models.Good;
import com.capstone.InvetoryManagement.repositories.GoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/goods")
public class GoodController {

    @Autowired
    private GoodRepository goodRepository;

    @GetMapping
    public List<Good> list(){
        return goodRepository.findAll();
    }
}
