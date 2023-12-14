package hotelproject.bl.exceptions;

public class AddressException extends Exception {
    public AddressException(String message) {
        super(message);
    }

    public AddressException(String message, Exception innerException) {
        super(message, innerException);
    }
}
