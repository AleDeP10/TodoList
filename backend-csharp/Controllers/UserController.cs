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
        var user = _context.Users.FirstOrDefault(t => t.Id == id);
        if (user == null)
            return NotFound();

        return Ok(user);
    }

    [HttpPost("filter")]
    public async Task<IActionResult> FilterUsersAsync([FromBody] UserFilterDto dto)
    {
        IQueryable<User> query = _context.Users;
        if (!string.IsNullOrWhiteSpace(dto.Username))
        {
            query = query.Where(t =>
                t.Username != null && EF.Functions.ILike(t.Username, $"%{dto.Username}%")
            );
        }
        if (!string.IsNullOrWhiteSpace(dto.FullName))
        {
            query = query.Where(t =>
                t.FullName != null && EF.Functions.ILike(t.FullName, $"%{dto.FullName}%")
            );
        }
        if (dto.IsAdmin != null)
        {
            query = query.Where(t =>
                t.IsAdmin != null && t.IsAdmin.Value == dto.IsAdmin.Value
            );
        }
        if (dto.StateFilter is not null && dto.StateFilter.Length > 0)
        {
            query = query.Where(t =>
                dto.StateFilter.Contains(t.Status)
            );
        }
        var filteredUsers = await query.ToListAsync();
        return Ok(filteredUsers);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUserAsync([FromBody] User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUserAsync(int id, [FromBody] User updatedUser)
    {
        var existingUser = await _context.Users.FindAsync(id);
        if (existingUser == null)
            return NotFound();

        existingUser.Username = updatedUser.Username;
        existingUser.FullName = updatedUser.FullName;
        existingUser.Status = updatedUser.Status;

        await _context.SaveChangesAsync();
        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound();

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
