package unpsjb.labprog.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Operario {

    @Id
    private Integer legajo;

    private String nombre;
    private String categoria;

    private String turno;
}
