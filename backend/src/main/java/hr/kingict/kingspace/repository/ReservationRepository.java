package hr.kingict.kingspace.repository;

import hr.kingict.kingspace.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Reservation findReservationById(Long id);
    List<Reservation> findAllByReservedUntilGreaterThanEqual(LocalDate today);
}
