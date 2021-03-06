import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}

    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.tasksRepository.findOne({ where: { id, user }});

        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }

        return found;
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id:string, user: User,): Promise<void> {
        const result = await this.tasksRepository.delete({ id, user });
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task>{
        const task = await this.getTaskById(id, user);
        
        task.status = status;
        await this.tasksRepository.save(task);

        return task;
    }


    // latihan rest api tanpa database
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
