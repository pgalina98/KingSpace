package hr.kingict.kingspace.controller;

import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.facade.ReservationFacade;
import hr.kingict.kingspace.form.EmailForm;
import hr.kingict.kingspace.form.ReservationForm;
import hr.kingict.kingspace.security.error.ApiError;
import hr.kingict.kingspace.utils.EmailSenderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationFacade facade;
    private final EmailSenderService emailSender;

    public ReservationController(ReservationFacade facade, EmailSenderService emailSender) {
        this.facade = facade;
        this.emailSender = emailSender;
    }


    @GetMapping(path="/allTeam")
    public List<ReservationDto> getAllTeamReservations(){
        return facade.getAllTeamReservations();
    }

    @GetMapping(path="/allSingle")
    public List<ReservationDto> getAllSingleReservations(){
        return facade.getAllSingleReservations();
    }

    @GetMapping("/{id}")
    public ResponseEntity getSingleReservationById(@PathVariable("id") Long reservationId) {
        ReservationDto reservation = facade.getReservationById(reservationId);

        if(Objects.isNull(reservation)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("Reservation with ID " + reservationId + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(reservation, HttpStatus.OK);
    }

    //Post New Reservation
    @PostMapping
    public ResponseEntity createNewReservation(@RequestBody ReservationForm reservationForm) {
        facade.createNewReservation(reservationForm);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/sendEmail")
    public void sendMail(@RequestBody EmailForm emailForm) {
        try {
            emailSender.sendMail(emailForm);
        } catch (MessagingException ex) {
            System.out.println("ERROR: " + ex.getMessage());
        }
    }

    @DeleteMapping
    public void deleteMyReservation(@RequestParam(required = false) Long id,
                                    @RequestParam(required = false) String user){
        facade.deleteMyReservation(id, user);
    }
}
