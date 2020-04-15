package com.company.storeonline.web.rest;

import com.company.storeonline.domain.FacturaDetalle;
import com.company.storeonline.repository.FacturaDetalleRepository;
import com.company.storeonline.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.company.storeonline.domain.FacturaDetalle}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FacturaDetalleResource {

    private final Logger log = LoggerFactory.getLogger(FacturaDetalleResource.class);

    private static final String ENTITY_NAME = "facturaDetalle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FacturaDetalleRepository facturaDetalleRepository;

    public FacturaDetalleResource(FacturaDetalleRepository facturaDetalleRepository) {
        this.facturaDetalleRepository = facturaDetalleRepository;
    }

    /**
     * {@code POST  /factura-detalles} : Create a new facturaDetalle.
     *
     * @param facturaDetalle the facturaDetalle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new facturaDetalle, or with status {@code 400 (Bad Request)} if the facturaDetalle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/factura-detalles")
    public ResponseEntity<FacturaDetalle> createFacturaDetalle(@RequestBody FacturaDetalle facturaDetalle) throws URISyntaxException {
        log.debug("REST request to save FacturaDetalle : {}", facturaDetalle);
        if (facturaDetalle.getId() != null) {
            throw new BadRequestAlertException("A new facturaDetalle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FacturaDetalle result = facturaDetalleRepository.save(facturaDetalle);
        return ResponseEntity.created(new URI("/api/factura-detalles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /factura-detalles} : Updates an existing facturaDetalle.
     *
     * @param facturaDetalle the facturaDetalle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated facturaDetalle,
     * or with status {@code 400 (Bad Request)} if the facturaDetalle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the facturaDetalle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/factura-detalles")
    public ResponseEntity<FacturaDetalle> updateFacturaDetalle(@RequestBody FacturaDetalle facturaDetalle) throws URISyntaxException {
        log.debug("REST request to update FacturaDetalle : {}", facturaDetalle);
        if (facturaDetalle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FacturaDetalle result = facturaDetalleRepository.save(facturaDetalle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, facturaDetalle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /factura-detalles} : get all the facturaDetalles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of facturaDetalles in body.
     */
    @GetMapping("/factura-detalles")
    public List<FacturaDetalle> getAllFacturaDetalles() {
        log.debug("REST request to get all FacturaDetalles");
        return facturaDetalleRepository.findAll();
    }

    /**
     * {@code GET  /factura-detalles/:id} : get the "id" facturaDetalle.
     *
     * @param id the id of the facturaDetalle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the facturaDetalle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/factura-detalles/{id}")
    public ResponseEntity<FacturaDetalle> getFacturaDetalle(@PathVariable Long id) {
        log.debug("REST request to get FacturaDetalle : {}", id);
        Optional<FacturaDetalle> facturaDetalle = facturaDetalleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facturaDetalle);
    }

    /**
     * {@code DELETE  /factura-detalles/:id} : delete the "id" facturaDetalle.
     *
     * @param id the id of the facturaDetalle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/factura-detalles/{id}")
    public ResponseEntity<Void> deleteFacturaDetalle(@PathVariable Long id) {
        log.debug("REST request to delete FacturaDetalle : {}", id);
        facturaDetalleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
