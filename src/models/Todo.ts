export class Todo {
  constructor(
    public title: string,
    public completed: boolean,
    public dueDate: string,
    public priority: "low" | "medium" | "high"
  ) {}
}
