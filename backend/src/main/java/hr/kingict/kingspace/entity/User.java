package hr.kingict.kingspace.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String organisationalUnit;
    private Set<String> authorities = new HashSet<>();
}
