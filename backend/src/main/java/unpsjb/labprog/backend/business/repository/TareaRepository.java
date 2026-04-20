package unpsjb.labprog.backend.business.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import unpsjb.labprog.backend.model.Tarea;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
    List<Tarea> findByDescripcionContainingIgnoreCase(String q);
    List<Tarea> findByProyectoId(long proyectoId);
}
