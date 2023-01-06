using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Badgerer.Api.Models
{
    [Table("Badge")]
    public partial class Badge
    {
        [Key]
        public int BadgeId { get; set; }

        [Required]
        [StringLength(250)]
        public string? Name { get; set; }

        [Required]
        public string? Description { get; set; }
    }
}
