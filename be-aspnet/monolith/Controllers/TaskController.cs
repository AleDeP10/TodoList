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
        try
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
                return NotFound();

            return Ok(task);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while retrieving task with ID {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("filter")]
    public async Task<IActionResult> FilterTasksAsync([FromBody] TaskFilterDto dto)
    {
        _logger.LogInformation("FilterTasksAsync invoked with DTO: {@Dto}", dto);

        try
        {
            if (dto == null)
                return BadRequest("Missing or invalid filter");

            IQueryable<TaskModel> query = _context.Tasks;

            if (!string.IsNullOrWhiteSpace(dto.Description))
                query = query.Where(t => t.Description != null && EF.Functions.ILike(t.Description, $"%{dto.Description}%"));

            if (dto.StateFilter is not null && dto.StateFilter.Length > 0)
                query = query.Where(t => dto.StateFilter.Contains(t.Status));

            if (dto.AssigneeId is not null)
                query = query.Where(t => t.AssigneeId == dto.AssigneeId);

            query = query.OrderBy(t => t.Id);
            var filteredTasks = await query.ToListAsync();
            return Ok(filteredTasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while filtering tasks with DTO {@Dto}", dto);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateTaskAsync([FromBody] TaskModel task)
    {
        try
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while creating task {@Task}", task);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTaskAsync(int id, [FromBody] TaskModel updatedTask)
    {
        try
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
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while updating task with ID {Id} and data {@Task}", id, updatedTask);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTaskAsync(int id)
    {
        try
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error while deleting task with ID {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }
}