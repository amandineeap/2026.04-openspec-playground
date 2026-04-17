## ADDED Requirements

### Requirement: User can log a meal or food item
The system SHALL allow the user to add a food entry for a given day, specifying name, serving size, and macro values (calories, protein, carbs, fat). Entries SHALL be associated with the selected date.

#### Scenario: Log a food item for today
- **WHEN** the user submits a food entry form with valid macro values
- **THEN** the system SHALL save the entry to the current day's log and update the daily totals

#### Scenario: Log a food item for a past date
- **WHEN** the user navigates to a past date and submits a food entry
- **THEN** the system SHALL save the entry under that date's log

#### Scenario: Reject invalid entry
- **WHEN** the user submits a food entry with missing required fields or negative macro values
- **THEN** the system SHALL display a validation error and NOT save the entry

### Requirement: User can delete a logged food entry
The system SHALL allow the user to remove any previously logged food entry from a given day.

#### Scenario: Delete an entry
- **WHEN** the user deletes a food entry
- **THEN** the system SHALL remove it from the day's log and recalculate daily totals immediately

### Requirement: Daily totals are calculated in real time
The system SHALL display the sum of calories, protein, carbs, and fat for all entries on the selected date, updating immediately when entries are added or removed.

#### Scenario: Totals update on add
- **WHEN** a new food entry is saved
- **THEN** the daily macro totals SHALL increase by the entry's macro values

#### Scenario: Totals update on delete
- **WHEN** a food entry is deleted
- **THEN** the daily macro totals SHALL decrease by the entry's macro values
