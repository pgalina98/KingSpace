package hr.kingict.kingspace.controller;

import hr.kingict.kingspace.dto.WorkspaceTypeDto;
import hr.kingict.kingspace.facade.WorkspaceTypeFacade;
import hr.kingict.kingspace.form.WorkspaceTypeForm;
import hr.kingict.kingspace.security.error.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Objects;

@RestController
@RequestMapping("/api/workspaceTypes")
public class WorkspaceTypeController {

    private final WorkspaceTypeFacade workspaceTypeFacade;

    public WorkspaceTypeController(WorkspaceTypeFacade workspaceTypeFacade) {
        this.workspaceTypeFacade = workspaceTypeFacade;
    }

    @GetMapping("/{id}")
    public ResponseEntity getSingleWorspaceType(@PathVariable Long workspaceTypeId) {
        WorkspaceTypeDto workspaceType = workspaceTypeFacade.getWorkspaceById(workspaceTypeId);

        if(Objects.isNull(workspaceType)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("Workspace type with ID " + workspaceTypeId + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(workspaceType, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAllWorkspaceTypes() {
        return new ResponseEntity(workspaceTypeFacade.getAllWorkspaceTypes(), HttpStatus.OK);
    }

    @PostMapping
    public void createNewWorkspaceType(@Valid @RequestBody WorkspaceTypeForm workspaceTypeForm) {
        workspaceTypeFacade.createNewWorkspaceType(workspaceTypeForm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteWorkspaceTypeById(@PathVariable Long workspaceTypeId) {
        WorkspaceTypeDto workspaceType = workspaceTypeFacade.getWorkspaceById(workspaceTypeId);

        if(Objects.isNull(workspaceType)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("Workspace type with ID " + workspaceTypeId + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}
