package hr.kingict.kingspace.security.error;

import lombok.Data;

import java.util.Objects;

@Data
public class ApiValidationError {
    private String object;
    private String field;
    private Object rejectedValue;
    private String message;

    ApiValidationError(String object, String message) {
        this.object = object;
        this.message = message;
    }

    public ApiValidationError(String object, String field, Object rejectedValue, String message) {
        this.object = object;
        this.field = field;
        this.rejectedValue = rejectedValue;
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ApiValidationError that = (ApiValidationError) o;
        return Objects.equals(object, that.getObject()) &&
                Objects.equals(field, that.getField()) &&
                Objects.equals(rejectedValue, that.getRejectedValue()) &&
                Objects.equals(message, that.getMessage());
    }

    @Override
    public int hashCode() {
        return Objects.hash(object, field, rejectedValue, message);
    }
}
