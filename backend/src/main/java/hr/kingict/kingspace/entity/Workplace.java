package hr.kingict.kingspace.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "RADNA_MJESTA")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
                  property = "id",
                  scope = Workplace.class)
public class Workplace extends AuditEntity{

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAZIV_SJEDALA")
    private String name;

    @Column(name = "RADNI_PROSTOR_ID")
    private Long workspaceId;

    @ManyToOne()
    @JoinColumn(name = "RADNI_PROSTOR_ID", insertable = false, updatable = false)
    //@JsonIgnore
    private Workspace workspace;

    @OneToMany(mappedBy = "workplace",
               fetch = FetchType.LAZY)
    //@JsonIgnore
    private List<Reservation> reservations;
}
