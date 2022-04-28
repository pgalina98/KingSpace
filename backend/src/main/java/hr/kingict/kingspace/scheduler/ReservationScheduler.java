package hr.kingict.kingspace.scheduler;

import hr.kingict.kingspace.repository.ReservationCustomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Calendar;


@Component
public class ReservationScheduler {

    private static final Logger logger = LoggerFactory.getLogger(ReservationScheduler.class);

    private final ReservationCustomRepository reservationCustomRepository;

    public ReservationScheduler(ReservationCustomRepository reservationCustomRepository) {
        this.reservationCustomRepository = reservationCustomRepository;
    }

    @Scheduled(cron = "00 00 00 * * *", zone = "Europe/Zagreb")
    public void updateReservationStatus() {
        logger.info("[LOG | " + Calendar.getInstance().getTime() + "] Updating reservation status" );

        reservationCustomRepository.updateStatusOfReservations();
    }
}
