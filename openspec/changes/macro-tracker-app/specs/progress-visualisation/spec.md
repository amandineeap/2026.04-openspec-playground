## ADDED Requirements

### Requirement: Daily macro progress is shown as a progress bar per nutrient
The system SHALL display four progress bars (calories, protein, carbs, fat) showing logged amount vs daily target for the selected date.

#### Scenario: Progress bars reflect current log
- **WHEN** the user views the dashboard for a given date
- **THEN** each progress bar SHALL show the logged total as a percentage of the daily target

#### Scenario: Over-target indication
- **WHEN** a nutrient total exceeds the daily target
- **THEN** the progress bar SHALL visually indicate the overage (e.g. different colour or overflow indicator)

### Requirement: Weekly trend chart is displayed
The system SHALL display a line or bar chart showing daily totals for each macro over the past 7 days.

#### Scenario: Weekly chart renders with data
- **WHEN** the user has logged food on at least one of the past 7 days
- **THEN** the chart SHALL show a data point for each day with a value, and a zero or empty marker for days with no entries

#### Scenario: Weekly chart renders with no data
- **WHEN** the user has no logged entries in the past 7 days
- **THEN** the chart SHALL display an empty state message rather than a blank chart

### Requirement: User can navigate between dates to view history
The system SHALL allow the user to select a specific date and view the logged entries and progress for that date.

#### Scenario: Navigate to a past date
- **WHEN** the user selects a past date from a date picker or navigation control
- **THEN** the system SHALL display that date's logged entries and progress bars
