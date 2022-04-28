package hr.kingict.kingspace.controller;

import hr.kingict.kingspace.dto.WorkplaceDto;
import hr.kingict.kingspace.facade.WorkplaceFacade;
import hr.kingict.kingspace.form.WorkplaceForm;
import hr.kingict.kingspace.security.error.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/workplaces")
public class WorkplaceController {

    private final WorkplaceFacade workplaceFacade;

    public WorkplaceController(WorkplaceFacade workplaceFacade) {
        this.workplaceFacade = workplaceFacade;
    }

    @GetMapping("/{id}")
    public ResponseEntity getWorkplaceById(@PathVariable("id") Long workplaceId) {
        WorkplaceDto workplace = workplaceFacade.getWorkplaceById(workplaceId);

        if(Objects.isNull(workplace)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("Workplace with ID " + workplaceId + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }


        return new ResponseEntity(workplace, HttpStatus.OK);
    }

    @GetMapping
    public List<WorkplaceDto> getAll() {
        return workplaceFacade.getAllWorplaces();
    }

    @PostMapping
    public void createNewWorkplace(@Valid @RequestBody WorkplaceForm workplaceForm) {
        workplaceFacade.createNewWorkplace(workplaceForm);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkplaceById(@PathVariable Long id) {
        workplaceFacade.deleteWorkplaceById(id);
    }
}
