export interface CreateCommentDto{
    content: string;
    parentComment?:string | null;
}