// For Q promises migration
// Old code using Q
// const Q = require('q');
// const deferred = Q.defer();

// New code using native Promises
async function asyncOperation() {
    try {
        const result = await someAsyncOperation();
        return result;
    } catch (error) {
        throw error;
    }
} 