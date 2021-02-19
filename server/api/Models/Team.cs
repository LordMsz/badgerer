using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Badgerer.Api.Models
{
    [Table("Team")]
    public partial class Team
    {
        [Key]
        public int TeamId { get; set; }
        [Required]
        [StringLength(250)]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
