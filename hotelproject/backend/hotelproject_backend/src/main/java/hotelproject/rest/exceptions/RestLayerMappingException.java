package hotelproject.rest.exceptions;

public class RestLayerMappingException extends Exception {
    public RestLayerMappingException(String message) {
        super(message);
    }

    public RestLayerMappingException(String message, Exception innerException) {
        super(message, innerException);
    }
}
