using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.DTOs;
using TodoList.Models;
using TaskModel = TodoList.Models.Task;

namespace TodoList.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{

    private readonly ILogger<TaskController> _logger;

    private readonly TodoListContext _context;

    public TaskController(ILogger<TaskController> logger, TodoListContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("by-id/{id}")]
    public IActionResult GetTask([FromRoute] int id)
    {
        var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
        if (task == null)
            return NotFound();

        return Ok(task);
    }

    [HttpPost("filter")]
    public async Task<IActionResult> FilterTasksAsync([FromBody] TaskFilterDto dto)
    {
        IQueryable<TaskModel> query = _context.Tasks;
        if (!string.IsNullOrWhiteSpace(dto.Description))
        {
            query = query.Where(t =>
                t.Description != null && EF.Functions.ILike(t.Description, $"%{dto.Description}%")
            );
        }
        if (dto.StateFilter is not null && dto.StateFilter.Length > 0)
        {
            query = query.Where(t =>
                dto.StateFilter.Contains(t.Status)
            );
        }
        if (dto.AssigneeId is not null)
        {
            query = query.Where(t =>
                t.AssigneeId == dto.AssigneeId
            );
        }
        var filteredTasks = await query.ToListAsync();
        return Ok(filteredTasks);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTaskAsync([FromBody] TaskModel task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTaskAsync(int id, [FromBody] TaskModel updatedTask)
    {
        var existingTask = await _context.Tasks.FindAsync(id);
        if (existingTask == null)
            return NotFound();

        existingTask.Description = updatedTask.Description;
        existingTask.Status = updatedTask.Status;
        existingTask.AssigneeId = updatedTask.AssigneeId;

        await _context.SaveChangesAsync();
        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTaskAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
            return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
