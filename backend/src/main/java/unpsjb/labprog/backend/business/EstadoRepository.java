package unpsjb.labprog.backend.business;

import org.springframework.data.jpa.repository.JpaRepository;

import unpsjb.labprog.backend.model.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long> {
}
