import { api } from './config';

export interface File {
  _id: string;
  name: string;
  url: string;
  size: number;
  content_type: string;
  userId: string;
  folder?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadFileResponse {
  url: string;
  s3URI: string;
  name: string;
  content_type: string;
  size: string;
  folder?: string;
}

export const file = {
  getAllFiles: async (): Promise<File[]> => {
    const response = await api.get<File[]>('/api/files');
    return response.data;
  },
  deleteFile: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/api/files/${id}`);
    return response.data;
  },
};