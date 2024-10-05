package xabufas.rubiks_rush_be.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Record {
    private Double time;
    private String scramble;
}
