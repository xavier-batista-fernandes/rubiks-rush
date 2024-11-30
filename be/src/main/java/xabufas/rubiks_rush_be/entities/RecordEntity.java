package xabufas.rubiks_rush_be.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Entity()
@Table(name = "RECORDS")
@Getter
@Setter
public class RecordEntity extends Auditable {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "TIME", nullable = false)
    private Double time;

    @Column(name = "SCRAMBLE", nullable = false)
    private String scramble;

}