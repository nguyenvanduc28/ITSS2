package com.domdom.taskbe.exceptions;

public class UnAuthorizedException extends RuntimeException {

    public UnAuthorizedException() {
        super("Unauthorized");
    }
}
