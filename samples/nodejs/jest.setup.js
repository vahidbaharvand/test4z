const {toBeSuccessfulResult, toBeHaveTestData, toBeSuccessful, toBeNotificationDatesEqualTo} = require("./Test4zMatchers")
expect.extend({
    toBeSuccessful,
    toBeHaveTestData,
    toBeSuccessfulResult,
    toBeNotificationDatesEqualTo
});
