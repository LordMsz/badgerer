﻿SET IDENTITY_INSERT [bg].[Badge] ON 

INSERT [bg].[Badge] ([BadgeId], [Name], [Description]) VALUES (1, N'Test badge 1', N'A test badge')

SET IDENTITY_INSERT [bg].[Badge] OFF


SET IDENTITY_INSERT [bg].[Team] ON 

INSERT [bg].[Team] ([TeamId], [Name], [Description]) VALUES (1, N'Test team 1', N'A test team')

SET IDENTITY_INSERT [bg].[Team] OFF