package unpsjb.labprog.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private String descripcion;

    @ManyToOne
    private Empresa empresa;

    @ManyToOne
    private Estado estado;

    @OneToMany(mappedBy = "proyecto", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties("proyecto")
    private java.util.List<Tarea> tareas = new java.util.ArrayList<>();
}
