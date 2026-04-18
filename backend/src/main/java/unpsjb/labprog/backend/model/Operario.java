package unpsjb.labprog.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Operario {

    /**
     * El legajo es el identificador natural del operario en la empresa.
     * Se usa como PK directamente sin auto-generación.
     */
    @Id
    private Integer legajo;

    private String nombre;
    private String categoria;

    /**
     * Turno asignado al operario (ej: "7a15", "15a23").
     * Simplificación inicial; la gestión de turnos por quincena se implementa en una fase posterior.
     */
    private String turno;
}
