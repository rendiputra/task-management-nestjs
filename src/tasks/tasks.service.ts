import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {


//     getAllTasks(): Task[] {
//         return this.tasks;
//     }

//     getTaskById(id: string): Task {
//         // try to get task

//         // if not found, throw an error '404 not found'

//         // otherwise, return the found task

//         const found = this.tasks.find((task) => task.id === id);

//         if(!found) {
//             throw new NotFoundException(`Task with ID "${id}" not found`);
//         }

//         return found;
        
//     }

//     getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
//         const { status, search } = filterDto;

//         // membuat array sementara untuk menampung hasil
//         let tasks = this.getAllTasks();

//         // melakukan sesuati dengan status
//         if(status) {
//             tasks = tasks.filter((task) => task.status === status);
//         }
//         // melakukan sesuatu dengan search
//         if(search) {
//             tasks = tasks.filter((task) => {
//                 if (task.title.includes(search) || task.description.includes(search)) {
//                     return true;
//                 }

//                 return false;
//             })
//         }

//         // mereturn hasil akhir
//         return tasks;
//     }

//     createTask(createTaskDto: CreateTaskDto): Task {
//         const { title, description } = createTaskDto;

//         const task: Task = {
//             id: uuid(),
//             title,
//             description,
//             status: TaskStatus.OPEN,
//         };

//         this.tasks.push(task);
//         return task;
//     }

//     deleteTask(id: string): void {
//         const found = this.getTaskById(id);
//         this.tasks = this.tasks.filter((task) => task.id !== found.id);
//     }

//     updateTaskStatus(id: string, status: TaskStatus) {
//         const task = this.getTaskById(id);
//         task.status = status;
//         return task;
//     }
}
