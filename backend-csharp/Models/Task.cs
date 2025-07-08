using System;
using System.Collections.Generic;

namespace TodoList.Models;

public partial class Task
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public string? Status { get; set; }

    public int? AssigneeId { get; set; }

    public virtual User? Assignee { get; set; }
}
