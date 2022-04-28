package hr.kingict.kingspace.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "KORISNICI_PRIJAVE")
public class LoginLog extends AuditEntity {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="KORISNIK")
    private String user;

    @Column(name="DATUM_PRIJAVE")
    private LocalDateTime dateOfLogin;

    @Column(name="IP_ADRESA")
    private String ipAddress;
}
