# Component Migration Strategy

This document outlines our approach to migrating existing components to the new DDD architecture.

## Migration Workflow

1. **Identify Components to Migrate**

   - Prioritize core UI components and business-critical features
   - Create a migration backlog in JIRA/Trello

2. **Assess Component Dependencies**

   - Determine how widely used the component is
   - Identify all import locations using grep or codebase search
   - Check for any specific business logic that should be extracted

3. **Create New Component Location**

   - Place UI components in appropriate category (atoms, molecules, organisms, templates)
   - Ensure proper directory structure and file organization

4. **Implement Compatibility Layer**

   - Create re-export file at original location
   - Add deprecation notice with migration instruction
   - Example:
     ```typescript
     /**
      * @deprecated Import from new location instead
      * Please import from '@/ui/atoms/button' instead.
      */
     export { Button } from "@/presentation/components/ui/atoms/button";
     ```

5. **Enhance Component in New Location**

   - Add proper TypeScript interfaces
   - Improve documentation and examples
   - Add test coverage if missing
   - Ensure component follows design system guidelines

6. **Gradual Import Updates**

   - Update imports in new code immediately
   - Update existing imports during normal feature work
   - Schedule dedicated migration sprints for widely used components

7. **Remove Compatibility Layer**
   - After a reasonable deprecation period, schedule removal of compatibility layers
   - This should be done in a separate PR with detailed changelog

## Component Categorization Guidelines

- **Atoms**: Smallest building blocks (Button, Input, Icon)
- **Molecules**: Simple combinations of atoms (Form Field, Search Bar)
- **Organisms**: Complex UI sections (Navigation, Header, Sidebar)
- **Templates**: Page layouts and structural components

## Example Migration PR Checklist

- [ ] Component moved to correct new location
- [ ] Compatibility layer added at original location
- [ ] All imports verified to still work
- [ ] Tests added/updated for component
- [ ] Documentation updated
- [ ] Storybook examples updated (if applicable)

## Migration Tracking

We use a dedicated tracking spreadsheet to monitor migration progress. Add your completed migrations to:
`docs/migration-progress.xlsx`
