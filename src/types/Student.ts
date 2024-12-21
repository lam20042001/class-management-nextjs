export interface Class {
    id: number;
    name: string;
    Students: Partial<Student>[];
}

export interface Student {
    id: number;
    name: string;
    class: Partial<Class>;
}