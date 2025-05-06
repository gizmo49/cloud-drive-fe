export interface IFileData {
    id: string;
    name: string;
    size: string;
    type: string;
    mimetype: string;
    modified: string;
    url?: string;
    createdAt: string;
    icon: string
    // 'pdf' | 'word' | 'excel' | 'powerpoint' | 'file' | 'image';
}

export interface FileIcon {
    pdf: 'pdf';
    word: 'word';
    excel: 'excel';
    powerpoint: 'powerpoint';
    image: 'image';
    video: 'video';
    audio: 'audio';
    code: 'code';
    archive: 'archive';
    file: 'file';
}

export const getFileIcon = (contentType: string): keyof FileIcon => {
    const type = contentType.toLowerCase();
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('word')) return 'word';
    if (type.includes('sheet')) return 'excel';
    if (type.includes('presentation')) return 'powerpoint';
    if (type.includes('image')) return 'image';
    if (type.includes('video')) return 'video';
    if (type.includes('audio')) return 'audio';
    if (type.includes('code')) return 'code';
    if (type.includes('archive')) return 'archive';
    return 'file';
};