package com.capstone.InvetoryManagement.controllers;

import com.capstone.InvetoryManagement.models.Inventory;
import com.capstone.InvetoryManagement.repositories.InventoryRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

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

    @GetMapping
    @RequestMapping("/csv/{id}")
    public ResponseEntity<Resource> generateCsv(@PathVariable Long id) throws IOException {
        Inventory existingInventory = inventoryRepository.getReferenceById(id);
        String fileName = "Inventory" + id.toString() + ".csv";

        ByteArrayResource resource = InventoryCSVGenerator.generateCSV(existingInventory, fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE);

        return ResponseEntity.ok().headers(headers).contentLength(resource.contentLength()).body(resource);
    }

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

        return inventoryRepository.saveAndFlush(existingInventory);
    }


}
