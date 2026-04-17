## ADDED Requirements

### Requirement: System suggests recipes that fit remaining macro budget
The system SHALL compute the remaining macro budget for the current day (target minus logged totals) and return a ranked list of recipes whose macro values fit within that budget, subject to a configurable tolerance.

#### Scenario: Suggestions shown when budget remains
- **WHEN** the user views the recipe suggestions panel and has remaining macro budget for the day
- **THEN** the system SHALL display a ranked list of recipes sorted by how well they match the remaining budget

#### Scenario: No suggestions when budget is exhausted
- **WHEN** the user has met or exceeded all macro targets for the day
- **THEN** the system SHALL display a message indicating targets have been reached rather than suggesting recipes

#### Scenario: Suggestions exclude recipes exceeding budget by more than tolerance
- **WHEN** a recipe's macro values exceed any remaining macro budget by more than 20%
- **THEN** that recipe SHALL NOT appear in the suggestions list

### Requirement: Suggestions update when log changes
The system SHALL recalculate and refresh recipe suggestions whenever the user adds or removes a food log entry, reflecting the updated remaining budget.

#### Scenario: Suggestions refresh after logging a meal
- **WHEN** the user logs a food entry
- **THEN** the suggestions list SHALL update to reflect the new remaining budget

### Requirement: User can add a suggested recipe to their food log
The system SHALL allow the user to add a recipe directly from the suggestions list as a food log entry for the current day, pre-populating the macro values from the recipe.

#### Scenario: Log a suggested recipe
- **WHEN** the user taps "Add to log" on a suggested recipe
- **THEN** the system SHALL create a food log entry for today with the recipe's name and macro values
