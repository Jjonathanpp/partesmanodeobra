package unpsjb.labprog.backend.business.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import unpsjb.labprog.backend.model.Operario;

public interface OperarioRepository extends JpaRepository<Operario, Integer> {
    List<Operario> findByNombreContainingIgnoreCase(String q);
}
