package hr.kingict.kingspace.dto;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class UserDto {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String organisationalUnit;
    private Set<String> authorities = new HashSet<>();
}
