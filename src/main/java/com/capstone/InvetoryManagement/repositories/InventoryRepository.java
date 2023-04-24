package com.capstone.InvetoryManagement.repositories;

import com.capstone.InvetoryManagement.models.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}
