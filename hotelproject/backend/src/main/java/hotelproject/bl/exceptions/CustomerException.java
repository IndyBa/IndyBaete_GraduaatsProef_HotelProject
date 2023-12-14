package hotelproject.bl.exceptions;

public class CustomerException extends Exception {
    public CustomerException(String message) {
        super(message);
    }

    public CustomerException(String message, Exception innerException) {
        super(message, innerException);
    }
}
