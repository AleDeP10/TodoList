using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.DTOs;
using TodoList.Models;

namespace TodoList.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly TodoListContext _context;

    public UserController(ILogger<UserController> logger, TodoListContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("by-id/{id}")]
    public IActionResult GetUser([FromRoute] int id)
    {
        try
        {
            var user = _context.Users.FirstOrDefault(t => t.Id == id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while retrieving user with ID {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("filter")]
    public async Task<IActionResult> FilterUsersAsync([FromBody] UserFilterDto dto)
    {
        _logger.LogInformation("FilterUsersAsync invoked with DTO: {@Dto}", dto);

        try
        {
            if (dto == null)
                return BadRequest("Missing or invalid filter");

            IQueryable<User> query = _context.Users;

            if (!string.IsNullOrWhiteSpace(dto.Username))
                query = query.Where(u => u.Username != null && EF.Functions.ILike(u.Username, $"%{dto.Username}%"));

            if (!string.IsNullOrWhiteSpace(dto.FullName))
                query = query.Where(u => u.FullName != null && EF.Functions.ILike(u.FullName, $"%{dto.FullName}%"));

            if (dto.IsAdmin is not null)
                query = query.Where(u => u.IsAdmin != null && u.IsAdmin.Value == dto.IsAdmin.Value);

            if (dto.StateFilter is not null && dto.StateFilter.Length > 0)
                query = query.Where(u => dto.StateFilter.Contains(u.Status));

            query = query.OrderBy(u => u.Id);
            var filteredUsers = await query.ToListAsync();
            return Ok(filteredUsers);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while filtering users with DTO {@Dto}", dto);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateUserAsync([FromBody] User user)
    {
        try
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while creating user {@User}", user);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUserAsync(int id, [FromBody] User updatedUser)
    {
        try
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
                return NotFound();

            existingUser.FullName = updatedUser.FullName;
            existingUser.Username = updatedUser.Username;
            existingUser.Password = updatedUser.Password;
            existingUser.Status = updatedUser.Status;
            existingUser.IsAdmin = updatedUser.IsAdmin;

            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while updating user with ID {Id} and data {@User}", id, updatedUser);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserAsync(int id)
    {
        try
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while deleting user with ID {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }
}
