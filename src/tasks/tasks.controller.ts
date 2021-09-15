import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-.dto';
import { GetTasksFilterDto } from './dto/ger-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // http://localhost:3000/tasks/
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // jika kita mempunyai pemfilteran, maka panggil tasksService.getTaskWilFilters
    // selain itu, maka get all Tasks
    if(Object.keys(filterDto).length) {
      // ...
    } else {
      return this.tasksService.getAllTasks();
    }

    return this.tasksService.getAllTasks();
  }

  // http://localhost:3000/tasks/{:id}
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTaks(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  // http://localhost:3000/tasks/{:id}/status
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
