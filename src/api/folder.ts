import { api } from './config';

export interface Folder {
  _id: string;
  name: string;
  owner: string;
  createdAt: string;
  files: File[];
  subFolders: Folder[];
  breadcrumb: {
    _id: string;
    name: string;
  }[];
  fileCount: number;
  totalFileSize: number;
}

export interface File {
  _id: string;
  name: string;
  url: string;
  size: number;
  mimetype: string;
  userId: string;
  folder?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetFoldersResponse {
  folders: Folder[];
  files: File[];
}

export interface CreateFolderData {
  name: string;
  parentFolderId?: string;
}

export const folder = {
  getAllFolders: async (): Promise<GetFoldersResponse | null> => {
    const response = await api.get('/api/folders');
    return response.data.data;
  },

  getFolder: async (id: string): Promise<Folder> => {
    const response = await api.get(`/api/folders/${id}`);
    return response.data.data[0];
  },

  createFolder: async (data: CreateFolderData): Promise<Folder> => {
    const response = await api.post('/api/folders', data);
    return response.data.data;
  },

  deleteFolder: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/api/folders/${id}`);
    return response.data;
  },
};