using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace MovieApi.Models
{
    public class MovieUploadModel
    {
        public required string Title { get; set; }

        public required string Sinopsis { get; set; }

        public required int Year { get; set; }

        public required float Rating { get; set; }

        public required string Director { get; set; }

        public required decimal Budget { get; set; }
        public required decimal Revenue { get; set; }

        public required IFormFile? Image { get; set; }
    }

}
