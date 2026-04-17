## ADDED Requirements

### Requirement: User data persists across browser sessions
The system SHALL store all user-generated data (macro targets, food logs) in the browser's local storage mechanisms so that data survives page reloads and browser restarts.

#### Scenario: Data survives reload
- **WHEN** the user reloads the page
- **THEN** all previously saved macro targets and food logs SHALL be restored without any action from the user

#### Scenario: Data survives browser restart
- **WHEN** the user closes and reopens the browser and navigates to the app
- **THEN** all data SHALL be intact

### Requirement: Recipe dataset is indexed locally on first load
The system SHALL load the bundled recipe dataset into IndexedDB on the first app visit and skip re-indexing on subsequent visits, using a version flag to detect whether indexing has already been performed.

#### Scenario: First visit indexes recipes
- **WHEN** the user opens the app for the first time (no IndexedDB version flag present)
- **THEN** the system SHALL index the full recipe dataset into IndexedDB and set the version flag

#### Scenario: Subsequent visits skip indexing
- **WHEN** the user opens the app and the IndexedDB version flag is present
- **THEN** the system SHALL skip the indexing step and load directly from the existing IndexedDB store

### Requirement: Data storage does not require network access
The system SHALL function fully offline after the initial page load. No data read or write operation SHALL depend on network connectivity.

#### Scenario: Offline usage
- **WHEN** the user has no network connection
- **THEN** all logging, viewing, and recipe browsing features SHALL remain fully functional
