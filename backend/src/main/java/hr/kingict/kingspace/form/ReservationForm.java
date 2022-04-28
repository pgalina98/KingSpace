package hr.kingict.kingspace.form;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ReservationForm {

    private Long workplaceId;

    private Long workspaceId;

    private Long teamId;

    private String user;

    @JsonFormat(shape=JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy HH:mm:ss")
    private LocalDateTime dateOfReservation;

    @JsonFormat(shape=JsonFormat.Shape.STRING,
                pattern = "dd.MM.yyyy")
    private LocalDate reservedFrom;

    @JsonFormat(shape=JsonFormat.Shape.STRING,
                pattern = "dd.MM.yyyy")
    private LocalDate reservedUntil;

    private String createdByUser;

    private String updatedByUser;

    @JsonFormat(shape=JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy HH:mm:ss")
    private LocalDateTime created;

    @JsonFormat(shape=JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy HH:mm:ss")
    private LocalDateTime updated;

    @JsonFormat(shape=JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy")
    private LocalDate validFrom;

    @JsonFormat(shape=JsonFormat.Shape.STRING,
            pattern = "dd.MM.yyyy")
    private LocalDate validUntil;

    private Boolean isActive;
}
