package unpsjb.labprog.backend.business.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.business.repository.TareaRepository;
import unpsjb.labprog.backend.model.Tarea;

@Service
public class TareaService {

    @Autowired
    TareaRepository repository;

    public List<Tarea> findAll() {
        List<Tarea> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Tarea findById(long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Tarea> findByProyectoId(long proyectoId) {
        return repository.findByProyectoId(proyectoId);
    }

    @Transactional
    public Tarea save(Tarea t) {
        return repository.save(t);
    }

    @Transactional
    public void delete(long id) {
        repository.deleteById(id);
    }
}
