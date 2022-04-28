package hr.kingict.kingspace.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "KORISNICI_TIMOVI_ROLE")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class              ,
                  property = "id",
                  scope = UserTeamRole.class)
public class UserTeamRole extends AuditEntity {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "KORISNIK")
    private String user;

    @Column(name = "ROLA_ID")
    private Long roleId;

    @Column(name = "TIM_ID")
    private Long teamId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLA_ID", insertable = false, updatable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TIM_ID", insertable = false, updatable = false)
    private Team team;
}
