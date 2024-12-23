import Class from './Class';

export default interface Student {
    id: number;
    name: string;
    class: Partial<Class>;
}