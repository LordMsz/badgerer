-- Create a new table called 'Badge' in schema 'bg'
-- Drop the table if it already exists
IF OBJECT_ID('bg.Badge', 'U') IS NOT NULL
DROP TABLE bg.Badge
GO
-- Create the table in the specified schema
CREATE TABLE bg.Badge
(
    BadgeId INT NOT NULL IDENTITY(1, 1) PRIMARY KEY, -- primary key column
    [Name] [NVARCHAR](250) NOT NULL,
    [Description] [NVARCHAR](MAX) NOT NULL
);
GO