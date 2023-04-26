package com.capstone.InvetoryManagement.controllers;

import com.capstone.InvetoryManagement.models.Inventory;
import com.capstone.InvetoryManagement.repositories.InventoryRepository;
import com.fasterxml.jackson.annotation.JsonMerge;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/inventories")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @GetMapping
    public List<Inventory> list(){
        return inventoryRepository.findAll();
    }

    @GetMapping
    @RequestMapping("{id}")
    public Inventory get(@PathVariable Long id){return inventoryRepository.getReferenceById(id);}

    @PostMapping
    public Inventory create(@RequestBody final Inventory inventory){
        return inventoryRepository.saveAndFlush(inventory);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        inventoryRepository.deleteById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public Inventory update(@PathVariable Long id, @RequestBody @NotNull Inventory inventory){
        Inventory existingInventory = inventoryRepository.getReferenceById(id);

        for (Field field : inventory.getClass().getDeclaredFields()) {
            try {
                field.setAccessible(true);
                Object value = field.get(inventory);
                if (value != null) {

                    PropertyDescriptor pd = new PropertyDescriptor(field.getName(), Inventory.class);
                    pd.getWriteMethod().invoke(existingInventory, value);

                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (IntrospectionException | InvocationTargetException e) {
                throw new RuntimeException(e);
            }
        }

        return  inventoryRepository.saveAndFlush(existingInventory);
    }


}
