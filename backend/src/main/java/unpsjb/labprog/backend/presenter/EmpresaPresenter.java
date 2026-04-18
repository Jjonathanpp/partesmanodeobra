package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.EmpresaService;
import unpsjb.labprog.backend.model.Empresa;

@RestController
@RequestMapping("empresas")
public class EmpresaPresenter {

    @Autowired
    EmpresaService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") long id) {
        Empresa e = service.findById(id);
        return (e != null)
            ? Response.ok(e)
            : Response.notFound("Empresa id " + id + " no encontrada");
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    public ResponseEntity<Object> findByPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return Response.ok(service.findByPage(page, size));
    }

    @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
    public ResponseEntity<Object> search(@PathVariable("term") String term) {
        return Response.ok(service.search(term));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Empresa empresa) {
        if (empresa.getId() != null) {
            return Response.error(empresa,
                "Está intentando crear una empresa. Esta no puede tener un id definido.");
        }
        return Response.ok(service.save(empresa));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Empresa empresa) {
        if (empresa.getId() == null || empresa.getId() <= 0) {
            return Response.error(empresa,
                "Debe especificar un id válido para poder modificar una empresa.");
        }
        return Response.ok(service.save(empresa));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") long id) {
        service.delete(id);
        return Response.ok("Empresa " + id + " borrada con éxito.");
    }
}
