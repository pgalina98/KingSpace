package hr.kingict.kingspace.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@JsonInclude(Include.NON_NULL)
public class ReservationDto {

    private Long id;

    private String reservedByUser;

    private String typeOfReservation;

    private WorkspaceDto workspace;

    private WorkplaceDto workplace;

    private TeamDto team;

    @JsonFormat(shape=JsonFormat.Shape.STRING,
                 pattern = "dd.MM.yyyy HH:mm:ss")
    private LocalDateTime dateOfReservation;

    //  @JsonFormat(shape=JsonFormat.Shape.STRING,
 //               pattern = "dd.MM.yyyy")
    private LocalDate reservedFrom;

//    @JsonFormat(shape=JsonFormat.Shape.STRING,
//              pattern = "dd.MM.yyyy")
    private LocalDate reservedUntil;
}
