package xabufas.rubiks_rush_be.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import xabufas.rubiks_rush_be.models.Record;

@RestController
public class RecordController {

    @GetMapping("/")
    public Record getRecord() {
        return new Record(12, "fake-scramble");
    }

}
