package unpsjb.labprog.backend.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class ParteMO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fecha;
    private LocalTime horaDesde;
    private LocalTime horaHasta;
    private Float horas;

    @ManyToOne
    private Operario operario;

    @ManyToOne
    private Proyecto proyecto;

    @ManyToOne
    private Tarea tarea;

    @ManyToOne
    private Estado estado;

    @JsonIgnore
    @OneToMany(mappedBy = "parte")
    private List<LogValidacionParteMO> logs;
}
