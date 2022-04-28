package hr.kingict.kingspace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JWTTokenDto {

    private String token;

    private String refreshToken;
}
