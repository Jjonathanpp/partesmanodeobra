package unpsjb.labprog.backend.business.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.business.repository.ProyectoRepository;
import unpsjb.labprog.backend.model.Proyecto;

@Service
public class ProyectoService {

    @Autowired
    ProyectoRepository repository;

    public List<Proyecto> findAll() {
        List<Proyecto> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Proyecto findById(long id) {
        return repository.findById(id).orElse(null);
    }

    public Page<Proyecto> findByPage(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public List<Proyecto> search(String term) {
        
        return repository.findByDescripcionContainingIgnoreCase(term);
    }

    @Transactional
    public Proyecto save(Proyecto p) {
        
        return repository.save(p);
    }

    @Transactional
    public void delete(long id) {
        repository.deleteById(id);
    }
}
