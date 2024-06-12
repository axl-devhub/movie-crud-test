using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieApi.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MovieContext _context;

        public MoviesController(MovieContext context)
        {
            _context = context;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<PaginatedList<Movie>>> GetMovies(int pageNumber = 1, int pageSize=8)
        {
            int count = await _context.Movies.CountAsync();
            int totalPages = count > 0 ? (int)Math.Ceiling(count / (double)pageSize) : 0;
            var movies = await _context.Movies
                           .Skip((pageNumber - 1) * pageSize)
                           .Take(pageSize)
                           .ToListAsync();

            return new PaginatedList<Movie>
            {
                Items = movies,
                CurrentPage = pageNumber,
                TotalPages = totalPages,
                TotalItems = count,
                ItemsPerPage = pageSize
            };
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return movie;
        }

        // POST: api/Movies
        [HttpPost]
        public async Task<ActionResult<Movie>> PostMovie([FromForm] MovieUploadModel movieUpload)
        {
            if (movieUpload.Image != null && movieUpload.Image.Length > 0)
            {
                // Ensure the directory exists
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/public");
                Directory.CreateDirectory(uploadPath); // No effect if already exists

                // Generate a unique file name to prevent overwriting
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(movieUpload.Image.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                // Save the file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await movieUpload.Image.CopyToAsync(stream);
                }
                var moviePost = new Movie
                {
                    Title = movieUpload.Title,
                    Sinopsis = movieUpload.Sinopsis,
                    Year = movieUpload.Year,
                    Rating = movieUpload.Rating,
                    Director = movieUpload.Director,
                    Image = $"public/{fileName}",
                    Budget = movieUpload.Budget,
                    Revenue = movieUpload.Revenue,
                };


                _context.Movies.Add(moviePost);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetMovie", new { id = moviePost.Id }, moviePost);
            }

            else
            {
                return BadRequest("Image is required.");
            }
        }

        // PUT: api/Movies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovie([FromForm] MovieUploadModel movieUpload, int id)
        {
            var movieToUpdate = await _context.Movies.FindAsync(id);
            if (movieToUpdate == null)
            {
                return NotFound($"No movie found with ID {id}.");
            }

            // Update movie details
            movieToUpdate.Title = movieUpload.Title;
            movieToUpdate.Sinopsis = movieUpload.Sinopsis;
            movieToUpdate.Year = movieUpload.Year;
            movieToUpdate.Rating = movieUpload.Rating;
            movieToUpdate.Director = movieUpload.Director;
            movieToUpdate.Budget = movieUpload.Budget;
            movieToUpdate.Revenue = movieUpload.Revenue;

            // Check if an image is provided
            if (movieUpload.Image != null && movieUpload.Image.Length > 0)
            {
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/");
                var existingImagePath = movieToUpdate.Image;
                if (!string.IsNullOrEmpty(existingImagePath) && System.IO.File.Exists($"{uploadPath}{existingImagePath}"))
                {
                    // Delete the existing image
                    System.IO.File.Delete($"{uploadPath}{existingImagePath}");
                }

                // Generate a unique file name to prevent overwriting
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(movieUpload.Image.FileName);
                var filePath = Path.Combine(uploadPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await movieUpload.Image.CopyToAsync(stream);
                }

                // Update the movie object with the new image path
                movieToUpdate.Image = $"public/{fileName}";
            }

            try
            {
                // Attempt to save changes to the database
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // DELETE: api/Movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            if (!String.IsNullOrEmpty(movie.Image)){
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/");
                System.IO.File.Delete($"{uploadPath}{movie.Image}");
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovieExists(int id)
        {
            return _context.Movies.Any(e => e.Id == id);
        }
    }
}