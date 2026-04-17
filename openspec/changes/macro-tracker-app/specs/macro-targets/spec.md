## ADDED Requirements

### Requirement: User can configure daily macro targets
The system SHALL allow the user to set daily targets for calories, protein (g), carbohydrates (g), and fat (g). Targets SHALL be persisted locally and survive page reloads.

#### Scenario: Set targets for the first time
- **WHEN** the user opens the app for the first time with no saved targets
- **THEN** the system SHALL prompt the user to enter their daily macro targets before logging food

#### Scenario: Update existing targets
- **WHEN** the user changes one or more macro target values and saves
- **THEN** the system SHALL persist the updated targets and immediately reflect them in the progress views

#### Scenario: Targets persist across sessions
- **WHEN** the user closes and reopens the browser
- **THEN** the system SHALL restore the previously saved macro targets without requiring re-entry

### Requirement: Targets apply per calendar day
The system SHALL use the same daily targets for every day unless the user explicitly updates them. There is no per-day override in the initial version.

#### Scenario: Same targets on a new day
- **WHEN** a new calendar day begins
- **THEN** the system SHALL apply the current saved targets as the goal for that day
