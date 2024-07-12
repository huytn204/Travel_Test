package com.example.travel_test.controller;

import com.example.travel_test.entity.Place;
import com.example.travel_test.reponse.PlaceRep;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/places")
public class PlaceController {
    @Autowired
    private PlaceRep placeRep;

    @PostMapping("/")
    public ResponseEntity<Place> create(@Valid @RequestBody Place place) {
        Place savedPlace = placeRep.save(place);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedPlace.getId()).toUri();

        return ResponseEntity.created(location).body(savedPlace);
    }

    @GetMapping("/")
    public ResponseEntity<Page<Place>> getAll(Pageable pageable) {
        return ResponseEntity.ok(placeRep.findAll(pageable));
    }
}
