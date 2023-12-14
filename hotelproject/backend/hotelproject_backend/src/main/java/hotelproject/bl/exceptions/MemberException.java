package hotelproject.bl.exceptions;

public class MemberException extends Exception {
    public MemberException(String message) {
        super(message);
    }

    public MemberException(String message, Exception innerException) {
        super(message, innerException);
    }
}
