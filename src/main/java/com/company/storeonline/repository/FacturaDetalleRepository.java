package com.company.storeonline.repository;

import com.company.storeonline.domain.FacturaDetalle;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FacturaDetalle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacturaDetalleRepository extends JpaRepository<FacturaDetalle, Long> {
}
