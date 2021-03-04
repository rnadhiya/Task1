using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ProductDetails
    {
        public string ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int UnitPrice { get; set; }
        public int MaximumQuantity { get; set; }
    }
}