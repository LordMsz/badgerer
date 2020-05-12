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
	- like "ng g c badge/components/badge-editor --display-block --lint-fix --module badge --dry-run"
 - a demo with "providedIn": BadgeModule... for three shaking and remove "index" files

##TODO in general, technologies
 - OpenAPI/swagger
 - mssql extension for Visual Studio Code?
 - tasks.json in vs code for node commands and dotnet commands?


#TODO - app. plan

##Badges
 - OK simple badge list (from db to angular)
 - OK simple navigation to badge list
 - OK simple CRUD for badges
	- OK make it simple reactive forms
	- OK delete
	- OK detail
	- OK edit
 - mat-table sorting and paging

##Teams
 - make a simple list of teams (aka environments)
 - selecting a route /{team}/badge


#Links
Angular architecture series
https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/
https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/
https://blog.angular-university.io/angular-component-design-how-to-avoid-custom-event-bubbling-and-extraneous-properties-in-the-local-component-tree/
https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/
https://blog.angular-university.io/angular-ngrx-store-and-effects-crash-course/

Architecture in Angular projects
https://medium.com/@cyrilletuzi/architecture-in-angular-projects-242606567e40

.NET core CRUD
https://docs.microsoft.com/en-us/learn/modules/build-web-api-net-core/
https://docs.microsoft.com/cs-cz/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1&tabs=visual-studio-code
https://docs.microsoft.com/cs-cz/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-3.1#recommended-learning-path

.NET core SignalR
https://docs.microsoft.com/cs-cz/aspnet/core/tutorials/signalr?view=aspnetcore-3.1&tabs=visual-studio-code

.NET core versioning
https://dev.to/99darshan/restful-web-api-versioning-with-asp-net-core-1e8g

Swagger editor
https://editor.swagger.io/

Swashbuckle/swagger .NET Core
https://docs.microsoft.com/cs-cz/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-3.1&tabs=visual-studio-code

Lemon Mart (rel. Angular book)
https://github.com/duluca/lemon-mart/blob/master/src/app/navigation-menu/navigation-menu.component.ts


Material theme generator
https://materialtheme.arcsine.dev/
