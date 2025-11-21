export default interface Todo {
    id?: number;
    title: string;
    description: string;
    dateLimite: Date;
    isFinished: boolean;
    tags?: string[];
}
