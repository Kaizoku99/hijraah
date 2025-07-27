// This is the mock for the query builder returned by from()
const mockQueryBuilder = {
  select: jest.fn(),
  upsert: jest.fn(),
  insert: jest.fn(),
  or: jest.fn().mockReturnThis(), // Added for compatibility
};

// This is the main mock client instance
const mockSupabaseClient = {
  rpc: jest.fn(),
  from: jest.fn(() => mockQueryBuilder),
};

// The createClient function is what the application code calls
const createClient = jest.fn(() => mockSupabaseClient);

// Exporting the mock functions so they can be imported and used in tests
module.exports = {
  createClient,
  mockRpc: mockSupabaseClient.rpc,
  mockFrom: mockSupabaseClient.from,
  mockSelect: mockQueryBuilder.select,
  mockUpsert: mockQueryBuilder.upsert,
  mockInsert: mockQueryBuilder.insert,
  mockOr: mockQueryBuilder.or,
};
