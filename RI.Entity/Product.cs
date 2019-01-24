using System;
using System.ComponentModel.DataAnnotations;

namespace RI.Entity
{
    public class Product
    {
        [Required]
        public Guid ProductId { get; set; }
    }
}
