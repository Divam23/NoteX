export interface StorageProvider{
    uploadFile(
        file:Buffer,
        path:string,
        mimeType: string
    ): Promise<string>;
    
    deleteFile(path:string): Promise<void>
}