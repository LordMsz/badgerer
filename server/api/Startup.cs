using Badgerer.Api.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Badgerer.Api
{
    public class Startup
    {
        private SpaSettings spaSettings;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            this.spaSettings = Configuration.Get<SpaSettings>();

            services.AddControllers();

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddDbContext<BadgererContext>(opt =>
               opt.UseSqlServer(Configuration.GetConnectionString("BadgererDB")));

            services.AddSpaStaticFiles(spa =>
            {
                spa.RootPath = this.spaSettings.StaticFilesRootPath;
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
                if(env.IsDevelopment())
                {
                    spa.Options.SourcePath = this.spaSettings.SourcePath;
                    spa.UseAngularCliServer(npmScript: "start:dotnet"); // workaround for https://github.com/dotnet/aspnetcore/issues/17277
                }
            });
        }
    }
}
