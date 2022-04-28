package hr.kingict.kingspace.dto;

import lombok.Data;

@Data
public class DashboardProjectionDto
{
    private Long id;
    private String name;
    private Long capacity;
    private Long reserved;
    private Boolean teamIndicator;
    private String teamName;
    private String imageURL;
}
