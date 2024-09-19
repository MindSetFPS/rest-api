-- Create the database
CREATE DATABASE football_league;

-- Use the database
USE football_league;

-- Create the football_team table
CREATE TABLE football_team (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  creation_date DATE NOT NULL,
  color VARCHAR(10) NOT NULL,
  owner VARCHAR(255),
  PRIMARY KEY (id)
);

-- Create the football_player table
CREATE TABLE football_player (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  team_id INT NOT NULL,
  goal_count INT NOT NULL DEFAULT 0,
  matches_played INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (team_id) REFERENCES football_team(id)
);

-- Create the league table
CREATE TABLE league (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  begining_date DATE NOT NULL,
  ending_date DATE NOT NULL,
  prize_pool DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (id)
);

-- Create the match table
CREATE TABLE football_match (
  id INT AUTO_INCREMENT,
  visitor_team_id INT NOT NULL,
  local_team_id INT NOT NULL,
  visitor_score INT NOT NULL,
  local_score INT NOT NULL,
  league_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (visitor_team_id) REFERENCES football_team(id),
  FOREIGN KEY (local_team_id) REFERENCES football_team(id),
  FOREIGN KEY (league_id) REFERENCES league(id)
);
