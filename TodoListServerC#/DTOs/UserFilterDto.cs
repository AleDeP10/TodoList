namespace TodoList.DTOs;

public class UserFilterDto
{
    public string? Username{ get; set; }
    public string? FullName { get; set; }
    public string[]? StateFilter { get; set; }
}
