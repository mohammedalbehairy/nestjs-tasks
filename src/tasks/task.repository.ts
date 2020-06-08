import { Repository } from "typeorm";
import { Task } from "./entity/task.entity";

export class TaskRepository extends Repository<Task>{

    getTasks() {

    }

    getTaskById(id: number) {

    }

    createTask(task: any) {

    }


}