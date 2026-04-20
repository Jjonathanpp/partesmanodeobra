package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.service.ProyectoService;
import unpsjb.labprog.backend.model.Proyecto;

@RestController
@RequestMapping("proyectos")
public class ProyectoPresenter {

    @Autowired
    ProyectoService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") long id) {
        Proyecto p = service.findById(id);
        return (p != null)
            ? Response.ok(p)
            : Response.notFound("Proyecto id " + id + " no encontrado");
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
    public ResponseEntity<Object> create(@RequestBody Proyecto proyecto) {
        if (proyecto.getId() != null) {
            return Response.error(proyecto,
                "Está intentando crear un proyecto. Este no puede tener un id definido porque la BD lo autogenera.");
        }
        return Response.ok(service.save(proyecto));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Proyecto proyecto) {
        if (proyecto.getId() == null || proyecto.getId() <= 0) {
            return Response.error(proyecto,
                "Debe especificar un id válido para poder modificar un proyecto existente.");
        }
        return Response.ok(service.save(proyecto));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") long id) {
        service.delete(id);
        return Response.ok("Proyecto " + id + " borrado con éxito.");
    }
}
