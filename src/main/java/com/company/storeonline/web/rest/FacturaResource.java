package com.company.storeonline.web.rest;

import com.company.storeonline.domain.Factura;
import com.company.storeonline.repository.FacturaRepository;
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
 * REST controller for managing {@link com.company.storeonline.domain.Factura}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FacturaResource {

    private final Logger log = LoggerFactory.getLogger(FacturaResource.class);

    private static final String ENTITY_NAME = "factura";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FacturaRepository facturaRepository;

    public FacturaResource(FacturaRepository facturaRepository) {
        this.facturaRepository = facturaRepository;
    }

    /**
     * {@code POST  /facturas} : Create a new factura.
     *
     * @param factura the factura to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new factura, or with status {@code 400 (Bad Request)} if the factura has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/facturas")
    public ResponseEntity<Factura> createFactura(@RequestBody Factura factura) throws URISyntaxException {
        log.debug("REST request to save Factura : {}", factura);
        if (factura.getId() != null) {
            throw new BadRequestAlertException("A new factura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Factura result = facturaRepository.save(factura);
        return ResponseEntity.created(new URI("/api/facturas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /facturas} : Updates an existing factura.
     *
     * @param factura the factura to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated factura,
     * or with status {@code 400 (Bad Request)} if the factura is not valid,
     * or with status {@code 500 (Internal Server Error)} if the factura couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/facturas")
    public ResponseEntity<Factura> updateFactura(@RequestBody Factura factura) throws URISyntaxException {
        log.debug("REST request to update Factura : {}", factura);
        if (factura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Factura result = facturaRepository.save(factura);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, factura.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /facturas} : get all the facturas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of facturas in body.
     */
    @GetMapping("/facturas")
    public List<Factura> getAllFacturas() {
        log.debug("REST request to get all Facturas");
        return facturaRepository.findAll();
    }

    /**
     * {@code GET  /facturas/:id} : get the "id" factura.
     *
     * @param id the id of the factura to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the factura, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/facturas/{id}")
    public ResponseEntity<Factura> getFactura(@PathVariable Long id) {
        log.debug("REST request to get Factura : {}", id);
        Optional<Factura> factura = facturaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(factura);
    }

    /**
     * {@code DELETE  /facturas/:id} : delete the "id" factura.
     *
     * @param id the id of the factura to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/facturas/{id}")
    public ResponseEntity<Void> deleteFactura(@PathVariable Long id) {
        log.debug("REST request to delete Factura : {}", id);
        facturaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
