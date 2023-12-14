package hotelproject.bl.exceptions;

public class MemberServiceException extends Exception {
    public MemberServiceException(String message) {
        super(message);
    }

    public MemberServiceException(String message, Exception innerException) {
        super(message, innerException);
    }
}
