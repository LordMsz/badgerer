using EntityGraphQL.Schema;
using EntityGraphQL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Badgerer.Api.Infrastructure;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using System.Linq;
using Humanizer;

namespace Badgerer.Api.Controllers
{
    // using custom controller instead of endpoints.MapGraphQL in startup because it was throwing StackOverflow on serialization
    // and taking down the whole application istead of handling the exception properly
    // TODO: try to make it work with newer version of the GraphQL library
    // see: https://github.com/EntityGraphQL/EntityGraphQL/issues/288
    [Route("graphql")]
    public class QueryController : Controller
    {
        private readonly BadgererContext _dbContext;
        private readonly SchemaProvider<BadgererContext> _schemaProvider;
        private readonly JsonSerializerOptions _jsonSerializerOptions;
        private readonly ILogger<QueryController> _logger;

        public QueryController(BadgererContext dbContext, SchemaProvider<BadgererContext> schemaProvider, ILogger<QueryController> logger)
        {
            this._dbContext = dbContext;
            this._schemaProvider = schemaProvider;
            this._jsonSerializerOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase, IncludeFields = true };
            this._jsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            this._logger = logger;
        }

        [HttpPost]
        public async Task<object> Post([FromBody] QueryRequest query)
        {
            try
            {
                var results = await _schemaProvider.ExecuteRequestAsync(query, _dbContext, HttpContext.RequestServices, null);

                if (results.HasErrors())
                {
                    this._logger.LogWarning("GraphQL query error {graphQLErrors}", results.Errors?.Select(e => e.Humanize()));
                }

                return base.Json(results, _jsonSerializerOptions);
            }
            catch (System.Exception e)
            {
                this._logger.LogError("GraphQL query failed", e);
                return this.Problem(detail: "GraphQL query failed", statusCode: StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("schema")]
        public string GetSchema()
        {
            return _schemaProvider.ToGraphQLSchemaString();
        }

    }
}
