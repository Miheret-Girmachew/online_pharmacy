package com.pharmacy.inventory.service;

import com.pharmacy.inventory.model.Medicine;
import com.pharmacy.inventory.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private MedicineRepository repository;

    // 1. Get All or Search
    public List<Medicine> getMedicines(String name) {
        if (name != null && !name.isEmpty()) {
            return repository.findByNameContainingIgnoreCase(name);
        }
        return repository.findAll();
    }

    // 2. Add New Medicine (Pharmacy only)
    public Medicine addMedicine(Medicine medicine) {
        return repository.save(medicine);
    }

    // 3. Update Stock
    @Transactional
    public void updateStock(Long medicineId, int quantityChange) {
        Medicine medicine = repository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        int newStock = medicine.getStock() + quantityChange;

        if (newStock < 0) {
            throw new RuntimeException("Insufficient stock");
        }

        medicine.setStock(newStock);
        repository.save(medicine);

        if (newStock < 5) {
            System.out.println("ALERT: Low stock for " + medicine.getName());
        }
    }

    public List<Medicine> getMedicinesById(List<Long> ids) {
        // JPA has a built-in method for this!
        // It runs: SELECT * FROM medicines WHERE id IN (1, 2, 5);
        return repository.findAllById(ids);
    }
}