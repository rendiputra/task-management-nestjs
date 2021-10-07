import { User } from "src/auth/user.entity";
import { Brackets, EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task-.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

    // Menggunakan query builder
    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where({ user });

        if (status) {
            query.andWhere('status = :status', { status });
        }

        if (search) {
            query.andWhere(
                new Brackets((qb) => {
                    qb.where('title ILIKE :search OR description ILIKE :search', {
                        search: `%${search}%`,
                    });
                }),
            );
        }
        
        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });

        await this.save(task);
        return task;
    }
}