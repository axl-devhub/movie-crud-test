using Microsoft.EntityFrameworkCore;

namespace MovieApi.Models;

public class MovieContext : DbContext
{
    public DbSet<Movie> Movies { get; set; } = null!;

     public MovieContext(DbContextOptions<MovieContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Unique index on the Title column
        modelBuilder.Entity<Movie>()
            .HasIndex(m => m.Title)
            .IsUnique();

        // Specify scale and precision for Budget and Revenue columns
        modelBuilder.Entity<Movie>()
            .Property(m => m.Budget)
            .HasColumnType("decimal(18, 2)");

        modelBuilder.Entity<Movie>()
            .Property(m => m.Revenue)
            .HasColumnType("decimal(18, 2)");

        modelBuilder.Entity<Movie>().Property(m => m.created_at ).HasDefaultValue(DateTime.Now);
    }

}