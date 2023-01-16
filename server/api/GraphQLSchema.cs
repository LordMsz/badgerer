using Badgerer.Api.Infrastructure;
using EntityGraphQL.Extensions;
using EntityGraphQL.Schema;
using EntityGraphQL.Schema.FieldExtensions;

namespace Badgerer.Api
{
    // derived from sample at https://github.com/EntityGraphQL/EntityGraphQL/blob/master/src/examples/demo/GraphQLSchema.cs
    public class GraphQLSchema
    {
        public static void ConfigureSchema(SchemaProvider<BadgererContext> badgererSchema)
        {
            // Add custom root fields
            badgererSchema.UpdateQuery(queryType =>
            {
                queryType.ReplaceField("badges",
                    new { name = (string?)null }, // arguments definition
                    (ctx, args) => // query itself
                        ctx.Badges.WhereWhen(b => b.Name!.StartsWith(args.name!), !string.IsNullOrWhiteSpace(args.name)),
                    "Badges list with filtering and paging")
                .UseFilter()
                .UseSort()
                .UseOffsetPaging();
            });
        }
    }
}
