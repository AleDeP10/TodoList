namespace ToDoList.DTOs;

public class TaskFilterDto
{
    public string? Description { get; set; }
    public string[]? StateFilter { get; set; }
    public int? AssigneeId { get; set; }
}
