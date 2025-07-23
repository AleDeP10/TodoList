using System;
using System.Collections.Generic;

namespace TodoList.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string? FullName { get; set; }

    public Boolean? IsAdmin { get; set; } = false;

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
