## MODIFIED Requirements

### Requirement: User can configure daily macro targets
The system SHALL allow the user to set daily targets for calories, protein (g), carbohydrates (g), fat (g), and fibre (g). Targets SHALL be persisted locally and survive page reloads. When loading previously saved targets that do not include a fibre value, the system SHALL default fibre to 0.

#### Scenario: Set targets for the first time
- **WHEN** the user opens the app for the first time with no saved targets
- **THEN** the system SHALL prompt the user to enter their daily macro targets (calories, protein, carbohydrates, fat, fibre) before logging food

#### Scenario: Update existing targets
- **WHEN** the user changes one or more macro target values and saves
- **THEN** the system SHALL persist the updated targets and immediately reflect them in the progress views

#### Scenario: Targets persist across sessions
- **WHEN** the user closes and reopens the browser
- **THEN** the system SHALL restore the previously saved macro targets without requiring re-entry

#### Scenario: Legacy targets missing fibre are migrated
- **WHEN** the app loads stored targets that have no fibre field
- **THEN** the system SHALL treat fibre target as 0 without prompting the user to re-enter targets

## ADDED Requirements

### Requirement: Macro percentage split totals 100%
The system SHALL display protein, carbohydrates, fat, and fibre targets as a gram-based percentage split (each macro's grams ÷ total macro grams × 100). The four percentages SHALL always sum to exactly 100%. This split is gram-based so that fibre can be included alongside the other macros.

#### Scenario: Percentage split shown for valid targets
- **WHEN** the user has set non-zero protein, carbs, fat, and/or fibre targets
- **THEN** the system SHALL display protein%, carbs%, fat%, and fibre% values that sum to exactly 100%

#### Scenario: Percentage split when all macro targets are zero
- **WHEN** protein, carbs, fat, and fibre targets are all zero
- **THEN** the system SHALL display an equal split (25% / 25% / 25% / 25%) or equivalent fallback totalling 100%

### Requirement: User can track daily fibre intake against target
The system SHALL display the user's daily fibre progress (consumed vs. target in grams) alongside other macro progress indicators.

#### Scenario: Fibre progress displayed
- **WHEN** the user views their daily progress
- **THEN** the system SHALL show fibre consumed and fibre target in grams
