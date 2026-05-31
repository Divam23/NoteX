export const supportsThumbnailGeneration = (contentType: string) => {
    return ['pdf', 'docx', 'pptx'].includes(contentType);
};
