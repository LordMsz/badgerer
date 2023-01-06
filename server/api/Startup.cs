using Badgerer.Api.Infrastructure;
using Badgerer.Api.Proxies;
using Dapr.Client;
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

            services.AddControllers();

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddDbContext<BadgererContext>(opt =>
               opt.UseSqlServer(Configuration.GetConnectionString("BadgererDB")));

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
