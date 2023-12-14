package hotelproject.rest.controllers.advice;

import hotelproject.rest.exceptions.CustomBadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(CustomBadRequestException.class)
    public ResponseEntity<String> handleBadRequestException(CustomBadRequestException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
