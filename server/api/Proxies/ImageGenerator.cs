using Badgerer.Common;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace Badgerer.Api.Proxies
{
    public class ImageGenerator
    {
        public ImageGenerator()
        {
        }

        public async Task<BadgeImage> GenerateImage()
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            // Adding app id as part of the header
            // TODO: go through dapr
            client.DefaultRequestHeaders.Add("dapr-app-id", "badgerer-api");

            // TODO: URL handling, config, error handling etc.
            var response = await client.GetFromJsonAsync<BadgeImage>($"http://localhost:5165/BadgeImage");

            return response;
        }
    }
}
