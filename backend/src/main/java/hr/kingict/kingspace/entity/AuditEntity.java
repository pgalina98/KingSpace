package hr.kingict.kingspace.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class AuditEntity {

    @Column(name = "KREIRAO_KORISNIK")
    public String createdByUser;

    @Column(name = "AZURIRAO_KORISNIK")
    public String updatedByUser;

    @Column(name = "KREIRANO")
    public LocalDateTime created;

    @Column(name = "AZURIRANO")
    public LocalDateTime updated;

    @Column(name = "VRIJEDI_OD")
    public LocalDate validFrom;

    @Column(name = "VRIJEDI_DO")
    public LocalDate validUntil;

    @Column(name = "AKTIVNO")
    public Boolean isActive;
}
