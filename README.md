# Next.js Project Structure

This project follows a scalable and maintainable structure for Next.js applications.

## Directory Structure

```
project/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── forms/        # Form components
│   │   └── layout/       # Layout components
│   └── lib/              # Utility functions and business logic
├── config/               # Configuration files
│   ├── env/             # Environment configurations
│   ├── test/            # Test configurations
│   └── sentry/          # Sentry configurations
├── docs/                # Documentation
│   ├── api/            # API documentation
│   ├── architecture/   # Architecture documentation
│   └── features/       # Feature documentation
├── public/              # Static assets
├── tests/               # Test files
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── e2e/           # End-to-end tests
└── types/               # TypeScript type definitions
```

## Import Aliases

The project uses the following import aliases for cleaner imports:

- `@/*` - App directory
- `@components/*` - React components
- `@lib/*` - Utility functions and business logic
- `@config/*` - Configuration files
- `@utils/*` - Utility functions
- `@hooks/*` - React hooks
- `@contexts/*` - React contexts
- `@types/*` - TypeScript types
- `@public/*` - Public assets

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Build for production:
```bash
npm run build
# or
yarn build
```

## Development Guidelines

1. **Components**
   - Place reusable UI components in `app/components/ui`
   - Form components go in `app/components/forms`
   - Layout components go in `app/components/layout`

2. **Configuration**
   - Environment variables go in `config/env`
   - Test configuration in `config/test`
   - Sentry configuration in `config/sentry`

3. **Testing**
   - Unit tests go in `tests/unit`
   - Integration tests go in `tests/integration`
   - E2E tests go in `tests/e2e`

4. **Documentation**
   - API documentation goes in `docs/api`
   - Architecture documentation goes in `docs/architecture`
   - Feature documentation goes in `docs/features`

## Best Practices

1. Use import aliases instead of relative paths
2. Keep components small and focused
3. Write tests for all new features
4. Document architecture decisions
5. Follow the established folder structure

## Contributing

1. Create a new branch for your feature
2. Follow the established directory structure
3. Write tests for your changes
4. Update documentation as needed
5. Submit a pull request 