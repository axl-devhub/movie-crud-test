namespace MovieApi.Models {
    public class PaginatedList<T>
    {
        public required List<T> Items { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalItems { get; set; }
        public int ItemsPerPage { get; set; }
    }
}