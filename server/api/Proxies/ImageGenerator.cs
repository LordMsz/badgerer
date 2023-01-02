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
            client.DefaultRequestHeaders.Add("dapr-app-id", "badgerer-image-generator");

            // TODO: URL handling, config, error handling etc.
            // TODO: port handling, dapr port config and env vars
            var response = await client.GetFromJsonAsync<BadgeImage>($"http://localhost:5101/BadgeImage");

            return response;
        }
    }
}
