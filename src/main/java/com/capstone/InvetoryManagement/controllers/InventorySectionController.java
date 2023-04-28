package com.capstone.InvetoryManagement.controllers;

import com.capstone.InvetoryManagement.models.Inventory;
import com.capstone.InvetoryManagement.models.InventorySection;
import com.capstone.InvetoryManagement.repositories.InventorySectionRespository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
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

    @GetMapping
    @RequestMapping("{id}")
    public InventorySection get(@PathVariable Long id){return inventorySectionRespository.getReferenceById(id);}

    @PostMapping
    public InventorySection create(@RequestBody final InventorySection inventorySection){
        return inventorySectionRespository.saveAndFlush(inventorySection);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        inventorySectionRespository.deleteById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public InventorySection update(@PathVariable Long id, @RequestBody @NotNull InventorySection inventorySection){
        InventorySection existingInventorySection = inventorySectionRespository.getReferenceById(id);

        for (Field field : inventorySection.getClass().getDeclaredFields()) {
            try {
                field.setAccessible(true);
                Object value = field.get(inventorySection);
                if (value != null) {

                    PropertyDescriptor pd = new PropertyDescriptor(field.getName(), InventorySection.class);
                    pd.getWriteMethod().invoke(existingInventorySection, value);

                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (IntrospectionException | InvocationTargetException e) {
                throw new RuntimeException(e);
            }
        }

        return  inventorySectionRespository.saveAndFlush(existingInventorySection);
    }
}
