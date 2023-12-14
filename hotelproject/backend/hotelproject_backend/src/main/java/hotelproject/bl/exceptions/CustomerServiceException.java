package hotelproject.bl.exceptions;

public class CustomerServiceException extends Exception {
    public CustomerServiceException(String message) {
        super(message);
    }

    public CustomerServiceException(String message, Exception innerException) {
        super(message, innerException);
    }
}
