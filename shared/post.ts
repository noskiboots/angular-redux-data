export interface Post {
    id: number;
    title: string;
    author: string;
    body: string;
    comments: string[] | Comment[];
}
