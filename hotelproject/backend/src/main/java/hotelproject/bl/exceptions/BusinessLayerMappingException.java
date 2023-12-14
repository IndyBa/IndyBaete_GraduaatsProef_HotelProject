package hotelproject.bl.exceptions;

public class BusinessLayerMappingException extends Exception {
    public BusinessLayerMappingException(String message) {
        super(message);
    }

    public BusinessLayerMappingException(String message, Exception innerException) {
        super(message, innerException);
    }
}

