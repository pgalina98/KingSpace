package hr.kingict.kingspace.repository.implementation;

import hr.kingict.kingspace.dto.DashboardProjectionDto;
import hr.kingict.kingspace.repository.WorkspaceCustomRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class WorkspaceCustomRepositoryImpl implements WorkspaceCustomRepository
{
    private final JdbcTemplate jdbc;

    public WorkspaceCustomRepositoryImpl(JdbcTemplate jdbc)
    {
        this.jdbc = jdbc;
    }

    @Override
    public List<DashboardProjectionDto> getAllWorkspacesByDate(LocalDate date)
    {
        LocalDateTime localDateTime = date.atStartOfDay();
        Timestamp timestamp = Timestamp.valueOf(localDateTime);

        return jdbc.query(
                "select distinct rp.id,\n" +
                        "                rp.naziv_radnog_prostora,\n" +
                        "                rp.kapacitet,\n" +
                        "                rp.kapacitet as reserved,\n" +
                        "                true         as teamIndicator,\n" +
                        "                t.naziv      as teamName,\n" +
                        "                rp.slika_url as imageURL\n" +
                        "from radni_prostori rp\n" +
                        "         join rezervacije rez on rp.id = rez.radni_prostor_id\n" +
                        "         join timovi t on rez.tim_id = t.id\n" +
                        "where rez.radno_mjesto_id is null\n" +
                        "  and rp.aktivno = true\n" +
                        "  and rez.aktivno = true\n" +
                        "  and ? between rez.rezerivrano_od and rez.rezervirano_do\n" +
                        "union\n" +
                        "select rp.id,\n" +
                        "       rp.naziv_radnog_prostora,\n" +
                        "       rp.kapacitet,\n" +
                        "       count(*)     as reserved,\n" +
                        "       false        as teamIndicator,\n" +
                        "       null         as teamName,\n" +
                        "       rp.slika_url as imageURL\n" +
                        "from radni_prostori rp\n" +
                        "         join radna_mjesta rm on rp.id = rm.radni_prostor_id\n" +
                        "         join rezervacije rez on rm.id = rez.radno_mjesto_id\n" +
                        "where rez.radni_prostor_id is null\n" +
                        "  and rp.aktivno = true\n" +
                        "  and rez.aktivno = true\n" +
                        "  and ? between rez.rezerivrano_od and rez.rezervirano_do\n" +
                        "group by rp.id, rp.kapacitet, rp.naziv_radnog_prostora, rezervirano_do, rezerivrano_od\n" +
                        "union\n" +
                        "select rp.id,\n" +
                        "       rp.naziv_radnog_prostora,\n" +
                        "       rp.kapacitet,\n" +
                        "       0                                             as reserved,\n" +
                        "       case when trp.id = 2 then true else false end as teamIndicator,\n" +
                        "       null                                          as teamName,\n" +
                        "       rp.slika_url                                  as imageURL\n" +
                        "from radni_prostori rp\n" +
                        "         join tip_radnih_prostora trp on rp.tip_radnog_prostora_id = trp.id\n" +
                        "where rp.id not in (select radni_prostor_id\n" +
                        "                    from rezervacije rez\n" +
                        "                    where rez.radni_prostor_id is not null\n" +
                        "                      and rez.aktivno = true\n" +
                        "                      and ? between rez.rezerivrano_od and rez.rezervirano_do\n" +
                        "                    union\n" +
                        "                    select distinct radna_mjesta.radni_prostor_id\n" +
                        "                    from rezervacije\n" +
                        "                             join radna_mjesta on rezervacije.radno_mjesto_id = radna_mjesta.id\n" +
                        "                    where rezervacije.aktivno = true\n" +
                        "                      and ? between rezervacije.rezerivrano_od and rezervacije.rezervirano_do)\n" +
                        "  and rp.aktivno = true\n" +
                        "order by id;",
                this::mapRowToDashboardProjectionDto, timestamp, timestamp, timestamp, timestamp);
    }

    private DashboardProjectionDto mapRowToDashboardProjectionDto(ResultSet rs, int rowNum) throws SQLException
    {
        DashboardProjectionDto dto = new DashboardProjectionDto();
        dto.setId(rs.getLong("id"));
        dto.setName(rs.getString("naziv_radnog_prostora"));
        dto.setCapacity(rs.getLong("kapacitet"));
        dto.setReserved(rs.getLong("reserved"));
        dto.setTeamIndicator(rs.getBoolean("teamIndicator"));
        dto.setTeamName(rs.getString("teamName"));
        dto.setImageURL(rs.getString("imageURL"));
        return dto;
    }
}
