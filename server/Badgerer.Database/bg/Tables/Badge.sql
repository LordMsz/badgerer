CREATE TABLE [bg].[Badge] (
    [BadgeId]     INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (250) NOT NULL,
    [Description] NVARCHAR (MAX) NOT NULL,
    PRIMARY KEY CLUSTERED ([BadgeId] ASC)
);

