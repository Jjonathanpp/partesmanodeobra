package unpsjb.labprog.backend.business.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import unpsjb.labprog.backend.model.ParteMO;

public interface ParteMORepository extends JpaRepository<ParteMO, Long> {
    List<ParteMO> findByFecha(LocalDate fecha);
    List<ParteMO> findByOperarioLegajo(Integer legajo);
}
