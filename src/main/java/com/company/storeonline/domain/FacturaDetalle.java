package com.company.storeonline.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;

/**
 * A FacturaDetalle.
 */
@Entity
@Table(name = "factura_detalle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FacturaDetalle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "producto_id")
    private Long productoId;

    @Column(name = "cantidad")
    private Long cantidad;

    @Column(name = "precio_unictario", precision = 21, scale = 2)
    private BigDecimal precioUnictario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductoId() {
        return productoId;
    }

    public FacturaDetalle productoId(Long productoId) {
        this.productoId = productoId;
        return this;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public FacturaDetalle cantidad(Long cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getPrecioUnictario() {
        return precioUnictario;
    }

    public FacturaDetalle precioUnictario(BigDecimal precioUnictario) {
        this.precioUnictario = precioUnictario;
        return this;
    }

    public void setPrecioUnictario(BigDecimal precioUnictario) {
        this.precioUnictario = precioUnictario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FacturaDetalle)) {
            return false;
        }
        return id != null && id.equals(((FacturaDetalle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FacturaDetalle{" +
            "id=" + getId() +
            ", productoId=" + getProductoId() +
            ", cantidad=" + getCantidad() +
            ", precioUnictario=" + getPrecioUnictario() +
            "}";
    }
}
