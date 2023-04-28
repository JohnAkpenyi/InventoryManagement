package com.capstone.InvetoryManagement.controllers;

import com.capstone.InvetoryManagement.models.Inventory;
import com.opencsv.CSVWriter;
import org.springframework.core.io.ByteArrayResource;
import java.io.IOException;
import java.io.StringWriter;

public class InventoryCSVGenerator {
    public static ByteArrayResource generateCSV(Inventory inventory, String fileName) throws IOException {
        StringWriter stringWriter = new StringWriter();
        CSVWriter csvWriter = new CSVWriter(stringWriter);

        final Integer[] amount = {0};

        String[] headerRecord = {"Inventory ID", "Max Goods", "Current Amount Of Goods", "Total Sales"};
        csvWriter.writeNext(headerRecord);

        inventory.getSections().stream().flatMap(section -> section.getGoods().stream())
                .forEach(good -> {
                    amount[0] += good.getAmount();
                });

        String[] dataRecord = {inventory.getInventory_id().toString(),
                inventory.getMax_goods().toString(),
                amount[0].toString(),
                inventory.getTotal_inventory_sales().toString()
        };
        csvWriter.writeNext(dataRecord);

        csvWriter.close();

        byte[] fileContent = stringWriter.toString().getBytes();

        return new ByteArrayResource(fileContent);
    }
}
