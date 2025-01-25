# SPORT INTEGRATION - CRICKET

## OVERVIEW
- **FC-TeamForge** currently supports football team creation. Cricket would be a good addition to expand the applications capabilities.

## FEATURES

# Player Management

- Complete player profile interface with cricket-specifi attributes
- multiple player role supported (Batsman, Bowler, All-rounder, Wicketkeeper)
- player performance tracking and rating systme

# Team Formation

- Support for cricket formats (T20, ODI, Test)
- Smart player distribution algorithm

## Database Structure
# Player Attributes
- cricket_players {
    - basic info (id, name, age)
    - role (primary_role, secondary_role)
    - batting stats (style, rating)
    - bowling Stats (style, rating)
    - extra skils (wicketkeeping, fielding)
}

# Team Structure
- cricket_teams {
    - team Info (id, name, format)
    - assigning of players
    - role Distribution
}

# BASIC Algorithm
1. Initial Player Sorting
    - sort players by primary roles
    - calc the  player ratings
    - check for extra skills or specialization in plaiyer

2. Role Distribution
    - asssign wicketkeeper
    - assign the all rounders
    - balancing special batsmen and 
    
# Basic Requirements
- Must include:
- 1 wicketkeeper
- Min 5 bowling options
- At least 6 compatable batsmen
- both pace and spin bowlers should be there