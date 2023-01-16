using Badgerer.Api.Infrastructure;
using Badgerer.Api.Proxies;
using Dapr.Client;
using EntityGraphQL.AspNet;
using EntityGraphQL.Schema;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NLog;
using NLog.Web;
using System;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace Badgerer.Api
{
    public class Startup
    {
        private Logger _logger = LogManager.GetCurrentClassLogger();

        private SpaSettings _spaSettings = new SpaSettings { SourcePath = "../../client.web", StaticFilesRootPath = "ClientApp" };

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            this._spaSettings = Configuration.Get<SpaSettings>() ?? this._spaSettings;

            var daprHttpPort = Environment.GetEnvironmentVariable("DAPR_HTTP_PORT") ?? "5101";
            var daprGrpcPort = Environment.GetEnvironmentVariable("DAPR_GRPC_PORT") ?? "61001";
            this._logger.Debug("Using dapr http port: {httpPort} and grpc port: {grpcPort}", daprHttpPort, daprGrpcPort);
            services.AddDaprClient(builder => builder
                .UseHttpEndpoint($"http://localhost:{daprHttpPort}")
                .UseGrpcEndpoint($"http://localhost:{daprGrpcPort}"));

            services.AddSingleton(_ => new ImageGenerator(
                DaprClient.CreateInvokeHttpClient("badgerer-image-generator", $"http://localhost:{daprHttpPort}")
            ));

            services.AddControllers()
                .AddJsonOptions(o =>
                {
                    // Use enum field names instead of numbers
                    o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    // EntityGraphQL internally builds types with fields
                    o.JsonSerializerOptions.IncludeFields = true;
                });

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddDbContext<BadgererContext>(opt =>
               opt.UseSqlServer(Configuration.GetConnectionString("BadgererDB")));

            services.AddGraphQLSchema<BadgererContext>(); // add SchemaProvider and build schema

            services.AddSpaStaticFiles(spa =>
            {
                spa.RootPath = this._spaSettings.StaticFilesRootPath;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseStaticFiles(); // for GraphiQL atm

                app.UseSwagger(c => c.RouteTemplate = "api/swagger/{documentname}/swagger.json");
                app.UseSwaggerUI(c =>
                {
                    c.RoutePrefix = "api";
                    c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "Badgerer API v1");
                });
            }

            app.UseHttpsRedirection();

            app.UseCors(cors => cors.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                // TODO: try to revive, was problematic, killing the whole app; see QueryController for more details
                //endpoints.MapGraphQL<BadgererContext>(); // default /graphql endpoint
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                if (env.IsDevelopment())
                {
                    spa.Options.SourcePath = this._spaSettings.SourcePath;
                    spa.UseAngularCliServer(npmScript: "start:dotnet"); // workaround for https://github.com/dotnet/aspnetcore/issues/17277
                }
            });
        }
    }
}
