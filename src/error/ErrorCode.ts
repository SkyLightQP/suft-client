enum ErrorCode {
    SERVER_ERROR = '1',
    USER_NOT_FOUND = '200',
    USER_ALREADY_EXISTS = '201',
    USER_BLOCK = '202',
    BLOCK_EMAIL = '203',
    JWT_EXPIRED = '400',
    REFRESH_EXPIRED = '401',
    JWT_INVALID = '402',
    PW_NOT_MATCH = '403',
    USER_NOT_MATCH = '404',
    USER_WAITING = '405',
    USER_DENY = '406',
    NO_PERMISSION = '407',
    PROBLEM_NOT_FOUND = '501'
}

export default ErrorCode;
