export const generateNoteFilePath = (userId: string, originalName: string) => {
    const sanitized = originalName
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9.-]/g, '')
        .toLowerCase();

    return `notes/${userId}/files/${Date.now()}-${sanitized}`;
};

export const generateAvatarFilePath = (userId: string, originalName: string) => {
    const sanitized = originalName
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9.-]/g, '')
        .toLowerCase();

    return `avatars/${userId}/${Date.now()}-${sanitized}`;
};

export const generateNoteThumbnailFilePath = (userId: string, originalName: string) => {
    const sanitized = originalName
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9.-]/g, '')
        .toLowerCase();

    return `notes/${userId}/thumbnails/${Date.now()}-${sanitized}`;
};
