## ADDED Requirements

### Requirement: User can browse and search the recipe dataset
The system SHALL provide a recipe browser where the user can search recipes by name and view macro details for each recipe.

#### Scenario: Search by name
- **WHEN** the user types a search term in the recipe search box
- **THEN** the system SHALL display recipes whose names contain the search term (case-insensitive), updating results as the user types

#### Scenario: Browse without a search term
- **WHEN** the user opens the recipe browser without entering a search term
- **THEN** the system SHALL display a paginated or virtualized list of recipes from the full dataset

### Requirement: Recipe detail view shows full macro breakdown
The system SHALL display a detail view for each recipe showing name, serving size, and macro values (calories, protein, carbs, fat).

#### Scenario: View recipe details
- **WHEN** the user selects a recipe from the browser or suggestions list
- **THEN** the system SHALL display the recipe's name, serving size, calories, protein, carbs, and fat

### Requirement: User can add any recipe from the browser to their food log
The system SHALL allow the user to add any recipe from the browser as a food log entry, pre-populating macro values.

#### Scenario: Add recipe from browser
- **WHEN** the user taps "Add to log" on a recipe in the browser
- **THEN** the system SHALL create a food log entry for today with the recipe's macro values

### Requirement: Recipe list loads without noticeable delay
The system SHALL render the initial recipe list and respond to search queries within 300 ms on a mid-range device, using client-side indexing or virtualisation as needed.

#### Scenario: Search performance
- **WHEN** the user types a search query into the recipe browser
- **THEN** results SHALL appear or update within 300 ms
