package hotelproject.bl.exceptions;

public class ContactInfoException extends Exception {
    public ContactInfoException(String message) {
        super(message);
    }

    public ContactInfoException(String message, Exception innerException) {
        super(message, innerException);
    }
}
