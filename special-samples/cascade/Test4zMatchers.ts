// Definition of the Test4z matchers for the custom assertions.

// Global declaration of the custom matchers
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeSuccessful(): R;
        }
    }
}

/**
 * Custom matcher for job submission. Checks the return code from the ZOWE result.
 * Allowed successful return codes are CC 0004 and CC 0000 for our particular use case.
 * @param received - Return code
 */
export function toBeSuccessful(received:any): jest.CustomMatcherResult {
    let pass = 0;
    if(received == "CC 0004" || received == "CC 0000")
        pass = 1;

    if (pass) {
        return {
            message: () =>
                `Received: ${received}, job was successful`,
            pass: true,
        };
    } else {
        return {
            message: () =>
                `Expected return code CC 0000 or CC 0004 but received: ${received}`,
            pass: false,
        };
    }
}
