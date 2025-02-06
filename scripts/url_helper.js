// Helper function to migrate from querystring to URLSearchParams
function parseQuery(queryString) {
    if (typeof queryString !== 'string') {
        throw new Error('Query string must be a string');
    }
    return Object.fromEntries(new URLSearchParams(queryString));
}

// Usage example
const query = 'foo=bar&baz=qux';
const params = parseQuery(query); 