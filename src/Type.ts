import internal from "stream";

export interface TaskType{
    key: number;
    name: string;
    description: string;
    dateCreate: string;
    selectedDate: string;
    status: boolean;
}