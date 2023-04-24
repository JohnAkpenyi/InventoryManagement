package com.capstone.InvetoryManagement.repositories;

import com.capstone.InvetoryManagement.models.Good;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodRepository extends JpaRepository<Good, Long> {
}
