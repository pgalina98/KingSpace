package hr.kingict.kingspace.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
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
@Table(name = "TIMOVI")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
                  property = "id",
                  scope = Team.class)
public class Team extends AuditEntity{

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAZIV")
    private String name;

    @OneToMany(mappedBy = "team",
               fetch = FetchType.LAZY)
    //@JsonIgnore
    private List<Reservation> reservations;

    @OneToMany(mappedBy = "team",
               fetch = FetchType.LAZY)
    //@JsonIgnore
    private List<UserTeamRole> usersTeamRoles;
}
