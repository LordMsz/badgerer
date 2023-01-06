using Badgerer.Common;
using Badgerer.Common.Exceptions;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace Badgerer.Api.Proxies
{
    public class ImageGenerator
    {
        private HttpClient _httpClient;
        public ImageGenerator(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<BadgeImage> GenerateImage()
        {
            // TODO: config, error handling etc.
            // TODO: dapr port config and env vars
            var img = await _httpClient.GetFromJsonAsync<BadgeImage>($"BadgeImage");

            if (img == null)
            {
                throw new BadgererException("Failed to get generated image from service");
            }

            return img;
        }
    }
}
