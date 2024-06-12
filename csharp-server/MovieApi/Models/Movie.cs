namespace MovieApi.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("movie")]
    public class Movie : BaseModel
    {
        [Key]
        public int Id { get; set; }

        public required string Title { get; set; }

        public required string Sinopsis { get; set; }

        public int Year { get; set; }

        public float Rating { get; set; }

        public required string Director { get; set; }

        public required string Image { get; set; }

        public decimal Budget { get; set; }
        public decimal Revenue { get; set; }
    }
}