package com.capstone.InvetoryManagement.controllers;

import com.capstone.InvetoryManagement.models.Good;
import com.capstone.InvetoryManagement.repositories.GoodRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
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

    @GetMapping
    @RequestMapping("{id}")
    public Good get(@PathVariable Long id){return goodRepository.getReferenceById(id);}

    @PostMapping
    public Good create(@RequestBody final Good good){
        return goodRepository.saveAndFlush(good);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id){
        goodRepository.deleteById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PATCH)
    public Good update(@PathVariable Long id, @RequestBody @NotNull Good good){
        Good existingGood = goodRepository.getReferenceById(id);

        for (Field field : good.getClass().getDeclaredFields()) {
            try {
                field.setAccessible(true);
                Object value = field.get(good);
                if (value != null) {

                    PropertyDescriptor pd = new PropertyDescriptor(field.getName(), Good.class);
                    pd.getWriteMethod().invoke(existingGood, value);

                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (IntrospectionException | InvocationTargetException e) {
                throw new RuntimeException(e);
            }
        }

        return  goodRepository.saveAndFlush(existingGood);
    }
}
