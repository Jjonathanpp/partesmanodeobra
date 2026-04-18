package unpsjb.labprog.backend.business;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.model.Empresa;

@Service
public class EmpresaService {

    @Autowired
    EmpresaRepository repository;

    public List<Empresa> findAll() {
        List<Empresa> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Empresa findById(long id) {
        return repository.findById(id).orElse(null);
    }

    public Page<Empresa> findByPage(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public List<Empresa> search(String term) {
        return repository.search("%" + term.toUpperCase() + "%");
    }

    @Transactional
    public Empresa save(Empresa e) {
        return repository.save(e);
    }

    @Transactional
    public void delete(long id) {
        repository.deleteById(id);
    }
}
