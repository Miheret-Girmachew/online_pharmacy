package com.pharmacy.inventory.controller;

import com.pharmacy.inventory.model.Medicine;
import com.pharmacy.inventory.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory/medicines")
public class InventoryController {

    @Autowired
    private InventoryService service;

    // GET /inventory/medicines?name=param
    @GetMapping
    public List<Medicine> getMedicines(@RequestParam(required = false) String name) {
        return service.getMedicines(name);
    }

    // POST /inventory/medicines
    @PostMapping
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine) {
        Medicine created = service.addMedicine(medicine);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // PATCH /inventory/medicines/{id}/stock?quantity=-2
    @PatchMapping("/{id}/stock")
    public ResponseEntity<String> updateStock(@PathVariable Long id, @RequestParam int quantity) {
        try {
            service.updateStock(id, quantity);
            return ResponseEntity.ok("Stock updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // GET /inventory/medicines/batch?ids=1,2,3
    @GetMapping("/batch")
    public ResponseEntity<List<Medicine>> getBatchMedicines(@RequestParam List<Long> ids) {
        List<Medicine> medicines = service.getMedicinesById(ids);
        return ResponseEntity.ok(medicines);
    }
}