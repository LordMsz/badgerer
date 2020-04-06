Badgerer app

#Ideas
##TODO - lessons learned to make
 - counter example for selectedRequest (in list or anywhere)
	- Monitor using redux + selection service + passing it all the levels up and down + whatever...
	- it can simply be done using a service (ideally provided in some level that will clear itself up) and using smart components reading it
 - (related to selected request) property viewer built in to dumb request list component... makes no sense
	- smart component for property viewer for selected request using the service
	- we don't need to pass anything around
 - a demo with onpush on root and setInterval and other stuff?
	- also an example of what we have in wolf
	- in routes, there's a tabRoot container (default strategy), inside there's tabroot component with <router-outlet> and is OnPush!
	- I think this is the reason why no normal change detection works for us
 - component tests demo
 - let's use https://www.npmjs.com/package/tslint-origin-ordered-imports-rule ?
 - a demo using angular CLI, like @angular/material schematics for table or nav?

##TODO in general, technologies
 - OpenAPI/swagger
 - mssql extension for Visual Studio Code?
 - tasks.json in vs code for node commands and dotnet commands?


#TODO - app. plan

##Badges
 - OK simple badge list (from db to angular)
 - simple navigation to badge list
 - mat-table sorting and paging