package hr.kingict.kingspace.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "REZERVACIJE")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
                  property = "id",
                  scope = Reservation.class)
public class Reservation extends AuditEntity {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "RADNO_MJESTO_ID")
    private Long workplaceId;

    @Column(name = "RADNI_PROSTOR_ID")
    private Long workspaceId;

    @Column(name = "TIM_ID")
    private Long teamId;

    @Column(name = "KORISNIK")
    private String user;

    @Column(name = "DATUM_REZERVACIJE")
    private LocalDateTime dateOfReservation;

    @Column(name = "REZERIVRANO_OD")
    private LocalDate reservedFrom;

    @Column(name = "REZERVIRANO_DO")
    private LocalDate reservedUntil;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RADNO_MJESTO_ID", insertable = false, updatable = false)
    private Workplace workplace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RADNI_PROSTOR_ID", insertable = false, updatable = false)
    private Workspace workspace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TIM_ID", insertable = false, updatable = false)
    private Team team;
}
