package hr.kingict.kingspace.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AuditDto {

    private String createdByUser;

    private String updatedByUser;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime validFrom;

    private LocalDateTime validUntil;

    private Boolean active;
}
