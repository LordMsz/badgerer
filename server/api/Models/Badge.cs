using System.ComponentModel.DataAnnotations.Schema;

namespace Badgerer.Api.Models
{
    [Table("Badge")]
    public class Badge
    {
        public int BadgeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}