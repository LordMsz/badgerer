using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Badgerer.Api.Models
{
    [Table("Team")]
    public partial class Team
    {
        public int Id { get; set; }
        [Required]
        [StringLength(250)]
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
