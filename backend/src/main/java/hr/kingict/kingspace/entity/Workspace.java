package hr.kingict.kingspace.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "RADNI_PROSTORI")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
                  property = "id",
                  scope = Workspace.class)
public class Workspace extends AuditEntity{

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAZIV_RADNOG_PROSTORA")
    private String name;

    @Column(name = "TIP_RADNOG_PROSTORA_ID")
    private Long typeId;

    @Column(name = "KAPACITET")
    private Integer capacity;

    @Column(name = "SLIKA_URL")
    private String imageURL;

    @ManyToOne()
    @JoinColumn(name = "TIP_RADNOG_PROSTORA_ID", insertable = false, updatable = false)
    private WorkspaceType type;

    @OneToMany(mappedBy = "workspace",
               fetch = FetchType.LAZY)
    private List<Workplace> workplaces = new ArrayList<>();

    @OneToMany(mappedBy = "workspace",
               fetch = FetchType.LAZY)
    private List<Reservation> reservations = new ArrayList<>();
}
