package xabufas.rubiks_rush_be.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import xabufas.rubiks_rush_be.entities.RecordEntity;
import xabufas.rubiks_rush_be.models.Record;
import xabufas.rubiks_rush_be.repositories.RecordRepository;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5000")
public class RecordController {

    private final RecordRepository recordRepository;

    public RecordController(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @GetMapping("/records")
    public ResponseEntity<List<Record>> getRecord() {
        List<RecordEntity> entities = recordRepository.findAll();
        List<Record> records = entities.stream().map(record -> new Record(record.getTime(), record.getScramble())).toList();

        return new ResponseEntity<>(records, HttpStatus.OK);
    }

    @PostMapping("/records")
    public ResponseEntity<Void> postRecord(@RequestBody Record record) {
        RecordEntity entity = new RecordEntity();
        entity.setTime(record.getTime());
        entity.setScramble(record.getScramble());

        this.recordRepository.save(entity);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
