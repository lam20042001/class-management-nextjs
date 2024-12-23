import Student from './Student';
export default interface Class {
    id: number;
    name: string;
    Students: Partial<Student>[];
}