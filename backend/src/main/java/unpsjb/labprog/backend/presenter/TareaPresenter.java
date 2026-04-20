package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.service.TareaService;
import unpsjb.labprog.backend.model.Tarea;

@RestController
@RequestMapping("tareas")
public class TareaPresenter {

    @Autowired
    TareaService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") long id) {
        Tarea t = service.findById(id);
        return (t != null)
            ? Response.ok(t)
            : Response.notFound("Tarea id " + id + " no encontrada");
    }

    @RequestMapping(value = "/proyecto/{proyectoId}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByProyectoId(@PathVariable("proyectoId") long proyectoId) {
        return Response.ok(service.findByProyectoId(proyectoId));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Tarea tarea) {
        if (tarea.getId() != null) {
            return Response.error(tarea, "Está intentando crear una tarea. Esta no puede tener un id definido porque la BD lo autogenera.");
        }
        return Response.ok(service.save(tarea));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Tarea tarea) {
        if (tarea.getId() == null || tarea.getId() <= 0) {
            return Response.error(tarea, "Debe especificar un id válido para poder modificar una tarea existente.");
        }
        return Response.ok(service.save(tarea));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") long id) {
        service.delete(id);
        return Response.ok("Tarea " + id + " borrada con éxito.");
    }
}
