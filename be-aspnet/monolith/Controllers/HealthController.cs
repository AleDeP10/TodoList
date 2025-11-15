using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.Models;

namespace ToDoList.Controllers
{

    [ApiController]
    [Route("health")]
    public class HealthController : ControllerBase
    {
        private readonly ToDoListContext _db;

        public HealthController(ToDoListContext db)
        {
            _db = db;
        }

        [HttpGet("db")]
        public async Task<IActionResult> CheckDatabase()
        {
            try
            {
                // Simple query to verify DB connectivity
                await _db.Database.ExecuteSqlRawAsync("SELECT 1");
                return Ok(new { status = "Healthy" });
            }
            catch (Exception ex)
            {
                return StatusCode(503, new { status = "Unhealthy", error = ex.Message });
            }
        }
    }
}
