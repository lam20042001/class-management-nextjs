interface Class {
    id: number;
    name: string;
    Students: Partial<Student>[];
}

export default interface Student {
    id: number;
    name: string;
    class: Partial<Class>;
}