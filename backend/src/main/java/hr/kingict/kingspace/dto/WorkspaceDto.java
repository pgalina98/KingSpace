package hr.kingict.kingspace.dto;

import lombok.Data;

import java.util.List;

@Data
public class WorkspaceDto {

    private Long id;

    private String name;

    private WorkspaceTypeDto type;

    private Integer capacity;

    private String imageURL;

    private List<WorkplaceDto> workplaces;
}
