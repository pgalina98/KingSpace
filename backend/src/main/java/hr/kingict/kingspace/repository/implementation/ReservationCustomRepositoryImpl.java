package hr.kingict.kingspace.repository.implementation;

import hr.kingict.kingspace.entity.Reservation;
import hr.kingict.kingspace.repository.ReservationCustomRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ReservationCustomRepositoryImpl implements ReservationCustomRepository {

    private final EntityManager entityManager;

    public ReservationCustomRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<Reservation> findAllByWorkspaceIdAndDate(Long workspaceId, LocalDate dateFrom, LocalDate dateUntil) {
        List<Reservation> allReservationsByDate = new ArrayList<>();

        TypedQuery<Reservation> typedQueryWSIdByDate = entityManager.createQuery(
                "SELECT re FROM Reservation re WHERE re.workspaceId = :workspaceId " +
                                                   "AND re.reservedUntil >= :dateFrom " +
                                                   "AND re.reservedFrom <= :dateUntil " +
                                                   "AND re.reservedUntil >= current_date " +
                                                   "AND re.isActive = true",
                Reservation.class
        );

        typedQueryWSIdByDate.setParameter("workspaceId", workspaceId);
        typedQueryWSIdByDate.setParameter("dateFrom", dateFrom);
        typedQueryWSIdByDate.setParameter("dateUntil", dateUntil);

        TypedQuery<Reservation> typedQueryWPWSIdByDate = entityManager.createQuery(
                "SELECT re FROM Reservation re WHERE re.workplace.workspaceId = :workspaceId " +
                                                   "AND re.reservedUntil >= :dateFrom " +
                                                   "AND re.reservedFrom <= :dateUntil " +
                                                   "AND re.reservedUntil >= current_date " +
                                                   "AND re.isActive = true",
                Reservation.class
        );

        typedQueryWPWSIdByDate.setParameter("workspaceId", workspaceId);
        typedQueryWPWSIdByDate.setParameter("dateFrom", dateFrom);
        typedQueryWPWSIdByDate.setParameter("dateUntil", dateUntil);

        allReservationsByDate.addAll(typedQueryWSIdByDate.getResultList());
        allReservationsByDate.addAll(typedQueryWPWSIdByDate.getResultList());

        return allReservationsByDate;
    }

    @Override
    public List<Reservation> findAllByWorkspaceId(Long workspaceId) {
        List<Reservation> allReservations = new ArrayList<>();

        TypedQuery<Reservation> typedQueryWSId = entityManager.createQuery(
                "SELECT re FROM Reservation re WHERE re.workspaceId = :workspaceId " +
                                                   "AND re.reservedUntil >= current_date " +
                                                   "AND re.isActive = true",
                Reservation.class
        );

        typedQueryWSId.setParameter("workspaceId", workspaceId);

        TypedQuery<Reservation> typedQueryWPWSId = entityManager.createQuery(
                "SELECT re FROM Reservation re WHERE re.workplace.workspaceId = :workspaceId " +
                                                   "AND re.reservedUntil >= current_date " +
                                                   "AND re.isActive = true",
                Reservation.class
        );

        typedQueryWPWSId.setParameter("workspaceId", workspaceId);

        allReservations.addAll(typedQueryWSId.getResultList());
        allReservations.addAll(typedQueryWPWSId.getResultList());

        return allReservations;
    }

    @Override
    public List<Reservation> findByDate(LocalDate dateFrom, LocalDate dateUntil) {
        TypedQuery<Reservation> typedQuery = entityManager.createQuery(
                "SELECT re FROM Reservation re WHERE re.reservedUntil >= :dateFrom " +
                                                   "AND re.reservedFrom <= :dateUntil " +
                                                   "AND re.reservedUntil >= current_date " +
                                                   "AND re.isActive = true",
                Reservation.class
        );

        typedQuery.setParameter("dateFrom", dateFrom);
        typedQuery.setParameter("dateUntil", dateUntil);

        return typedQuery.getResultList();
    }

    @Override
    public List<Reservation> findAllByTeamIdAndDate(Long teamId, LocalDate dateFrom, LocalDate dateUntil) {

        TypedQuery<Reservation> typedQuery = entityManager.createQuery(
                "SELECT re FROM Reservation re WHERE re.teamId = :teamId " +
                                                    "AND re.reservedUntil >= :dateFrom " +
                                                    "AND re.reservedFrom <= :dateUntil " +
                                                    "AND re.reservedUntil >= current_date " +
                                                    "AND re.isActive = true",
                Reservation.class
        );

        typedQuery.setParameter("teamId", teamId);
        typedQuery.setParameter("dateFrom", dateFrom);
        typedQuery.setParameter("dateUntil", dateUntil);

        return typedQuery.getResultList();
    }

    @Override
    public List<Reservation> findAllByTeamId(Long teamId) {
        TypedQuery<Reservation> typedQuery = entityManager.createQuery(
                "SELECT re FROM Reservation re WHERE re.teamId = :teamId " +
                                                   "AND re.reservedUntil >= current_date " +
                                                   "AND re.isActive = true",
                Reservation.class
        );

        typedQuery.setParameter("teamId", teamId);

        return typedQuery.getResultList();
    }

    @Override
    public List<Reservation> findAllByUsernameAndDate(String username, LocalDate dateFrom, LocalDate dateUntil) {
        TypedQuery<Reservation> typedQuery = entityManager.createQuery(
                "SELECT re FROM Reservation re WHERE re.user = :username " +
                                                   "AND re.reservedUntil >= :dateFrom " +
                                                   "AND re.reservedFrom <= :dateUntil " +
                                                   "AND re.reservedUntil >= current_date " +
                                                   "AND re.isActive = true",
                Reservation.class
        );

        typedQuery.setParameter("username", username);
        typedQuery.setParameter("dateFrom", dateFrom);
        typedQuery.setParameter("dateUntil", dateUntil);

        return typedQuery.getResultList();
    }

    @Override
    public List<Reservation> findAllByUsername(String username) {
        TypedQuery<Reservation> typedQuery = entityManager.createQuery(
                "SELECT re FROM Reservation re WHERE re.user = :username " +
                                                   "AND re.reservedUntil >= current_date " +
                                                   "AND re.isActive = true",
                Reservation.class
        );

        typedQuery.setParameter("username", username);

        return typedQuery.getResultList();
    }

    @Override
    @Transactional
    public void updateStatusOfReservations() {
        Query query = entityManager.createQuery(
                "UPDATE Reservation SET isActive = false " +
                                      "WHERE reservedUntil <= current_date");

        query.executeUpdate();
    }
}
