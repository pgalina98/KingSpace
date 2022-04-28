package hr.kingict.kingspace.controller;

import hr.kingict.kingspace.dto.JWTTokenDto;
import hr.kingict.kingspace.dto.ReservationDto;
import hr.kingict.kingspace.dto.UserDto;
import hr.kingict.kingspace.facade.LoginLogFacade;
import hr.kingict.kingspace.facade.UserFacade;
import hr.kingict.kingspace.facade.UserTeamRoleFacade;
import hr.kingict.kingspace.form.LoginForm;
import hr.kingict.kingspace.mapper.UserMapper;
import hr.kingict.kingspace.security.error.ApiError;
import hr.kingict.kingspace.security.jwt.JwtFilter;
import hr.kingict.kingspace.security.jwt.TokenProvider;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/users")
public class UserController {
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    private final UserTeamRoleFacade userTeamRoleFacade;
    private final UserFacade userFacade;
    private final LoginLogFacade loginLogFacade;

    private final UserMapper userMapper;

    public UserController(TokenProvider tokenProvider,
                          AuthenticationManager authenticationManager,
                          UserTeamRoleFacade userTeamRoleFacade,
                          UserFacade userFacade,
                          LoginLogFacade loginLogFacade, UserMapper userMapper) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.userTeamRoleFacade = userTeamRoleFacade;
        this.userFacade = userFacade;
        this.loginLogFacade = loginLogFacade;
        this.userMapper = userMapper;
    }

    //GET All Team where User is participating
    @GetMapping("/{username}/teams")
    public ResponseEntity getAllUsersTeamParticipation(@PathVariable("username") String username,
                                                       @RequestParam(required = false) String roleName) {

        UserDto user = userFacade.getSingleUserByUsername(username);

        if (Objects.isNull(user)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("User with username " + username + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        //TODO -> implement method in a way that can accept @RequestParam (specific rolename)
        return new ResponseEntity(userTeamRoleFacade.getAllUserTeamsAndRolesByUsername(username), HttpStatus.OK);
    }

    //GET All User Reservations
    @GetMapping("/{username}/reservations")
    public ResponseEntity getAllUserReservations(@PathVariable("username") String username,
                                                 @RequestParam(required = false) @DateTimeFormat(pattern="dd.MM.yyyy") LocalDate dateFrom,
                                                 @RequestParam(required = false) @DateTimeFormat(pattern="dd.MM.yyyy") LocalDate dateUntil) {

        UserDto user = userFacade.getSingleUserByUsername(username);

        if (Objects.isNull(user)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("User with username " + username + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        List<ReservationDto> userReservations;

        if(!Objects.isNull(dateFrom)) {
            userReservations = userFacade.getAllUserReservationsByUsersUsernameAndDateInterval(username, dateFrom, dateUntil);
        }else {
            userReservations = userFacade.getAllUserReservationsByUsersUsername(username);
        }

        return new ResponseEntity(userReservations, HttpStatus.OK);
    }

    @GetMapping("/{emailAddress}")
    public ResponseEntity getUserByEmail(@PathVariable("emailAddress") String emailAddress) {
        UserDto userDto = userFacade.getSingleUserByEmail(emailAddress);

        if(Objects.isNull(userDto)) {
            ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
            apiError.setMessage("User with e-mail address " + emailAddress + " Not Found.");

            return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(userDto, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<JWTTokenDto> authenticate(@Valid @RequestBody LoginForm loginForm,
                                                    HttpServletRequest request) {
        if(loginForm.getEmail().isEmpty() || loginForm.getPassword().isEmpty()) {
            return new ResponseEntity(new ApiError(HttpStatus.BAD_REQUEST),
                    HttpStatus.BAD_REQUEST);
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginForm.getEmail(),
                loginForm.getPassword()
        );

        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);
        String refreshJwt = tokenProvider.createRefreshToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        loginLogFacade.addLoginLog(loginForm, request.getRemoteAddr());

        return new ResponseEntity<>(new JWTTokenDto(jwt, refreshJwt), httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/refreshToken")
    public ResponseEntity<JWTTokenDto> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String newJwt = "";
        String refreshJwt = resolveToken(request);
        
        if (StringUtils.hasText(refreshJwt) && this.tokenProvider.validateToken(request, refreshJwt)) {
            newJwt = tokenProvider.createToken(refreshJwt);
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + newJwt);

        return new ResponseEntity<>(new JWTTokenDto(newJwt, refreshJwt), httpHeaders, HttpStatus.OK);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @GetMapping("/allUsers")
    public List<UserDto> getAllUsers(){
        return userFacade.getAllUsers();
    }
}
