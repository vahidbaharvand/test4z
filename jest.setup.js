const {toBeSuccessfulResult, toBeHaveTestData, toBeSuccessful, toBeNotificationDatesEqualTo, toBeSuccessfulDb2} = require("./src/test/samples/Test4zMatchers")
expect.extend({
    toBeSuccessful,
    toBeHaveTestData,
    toBeSuccessfulResult,
    toBeNotificationDatesEqualTo,
    toBeSuccessfulDb2
});