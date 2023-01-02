using Badgerer.Common;
using Microsoft.AspNetCore.Mvc;

namespace Badgerer.ImageGenerator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BadgeImageController : ControllerBase
    {
        private readonly ILogger<BadgeImageController> _logger;

        public BadgeImageController(ILogger<BadgeImageController> logger)
        {
            this._logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<BadgeImage>> Get()
        {
            _logger.LogInformation("Image generation request received");
            return new BadgeImage {
                Data = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<svg viewBox=\"139.497 111.325 181.679 187.462\" width=\"181.679\" height=\"187.462\" xmlns=\"http://www.w3.org/2000/svg\">\r\n  <circle style=\"stroke-width: 4px; stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255);\" cx=\"268.539\" cy=\"148.876\" r=\"21.91\"/>\r\n  <circle style=\"stroke-width: 4px; stroke: rgb(0, 0, 0); fill: rgb(187, 218, 85);\" cx=\"192.134\" cy=\"148.876\" r=\"21.91\"/>\r\n  <path d=\"M 403.689 194.773 Q 410 191.129 416.311 194.773 L 466.797 223.921 Q 473.108 227.565 473.108 234.852 L 473.108 293.148 Q 473.108 300.436 466.797 304.079 L 416.311 333.227 Q 410 336.871 403.689 333.227 L 353.203 304.079 Q 346.892 300.436 346.892 293.148 L 346.892 234.852 Q 346.892 227.565 353.203 223.921 Z\" style=\"stroke: rgb(0, 0, 0); stroke-width: 4px; fill: rgb(255, 255, 255);\" transform=\"matrix(0.866025, 0.5, -0.5, 0.866025, 7.266613, -228.574631)\"/>\r\n  <path d=\"M 403.439 194.34 C 407.771 191.877 412.229 191.877 416.561 194.34 L 467.047 223.488 C 471.346 226.009 473.575 229.869 473.608 234.852 L 473.608 293.148 C 473.575 298.132 471.346 301.992 467.047 304.512 L 416.561 333.66 C 412.229 336.123 407.771 336.123 403.439 333.66 L 352.953 304.512 C 348.654 301.992 346.425 298.132 346.392 293.148 L 346.392 234.852 C 346.425 229.869 348.654 226.009 352.953 223.488 Z M 353.453 224.354 C 349.337 226.692 347.359 230.119 347.392 234.852 L 347.392 293.148 C 347.359 297.882 349.337 301.309 353.453 303.646 L 403.939 332.794 C 408.021 335.19 411.979 335.19 416.061 332.794 L 466.547 303.646 C 470.663 301.309 472.641 297.882 472.608 293.148 L 472.608 234.852 C 472.641 230.119 470.663 226.692 466.547 224.354 L 416.061 195.206 C 411.979 192.81 408.021 192.81 403.939 195.206 Z\" style=\"fill: none;\" transform=\"matrix(0.866025, 0.5, -0.5, 0.866025, 7.266613, -228.574631)\"/>\r\n  <path d=\"M 429.896 572.892 Q 431 572.255 432.104 572.892 L 440.934 577.99 Q 442.037 578.628 442.037 579.902 L 442.037 590.098 Q 442.037 591.373 440.934 592.01 L 432.104 597.108 Q 431 597.745 429.896 597.108 L 421.066 592.01 Q 419.963 591.373 419.963 590.098 L 419.963 579.902 Q 419.963 578.628 421.066 577.99 Z\" style=\"stroke-width: 4px; stroke: rgb(0, 0, 0); fill: rgb(187, 218, 85);\" transform=\"matrix(0.866025, -0.5, 0.5, 0.866025, -436.121582, -34.494095)\" />\r\n  <rect x=\"242.135\" y=\"143.882\" width=\"23.596\" height=\"102.247\" rx=\"4\" ry=\"4\" style=\"stroke-width: 4px; stroke: rgb(0, 0, 0); fill: rgb(187, 218, 85);\"/>\r\n  <circle style=\"\" cx=\"252.809\" cy=\"205.119\" r=\"3.877\"/>\r\n  <circle style=\"\" cx=\"205.618\" cy=\"206.242\" r=\"3.877\"/>\r\n</svg>"
            };
        }
    }
}
