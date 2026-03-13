import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  search?: string;
  perPage?: number;
}

export const fetchNotes = async ({
  page,
  search,
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    params: {
      page,
      search,
      perPage,
    },
    ...config,
  });

  return response.data;
};

export const createNote = async (note: Omit<Note, "id" | "createdAt">) => {
  const response = await axios.post<Note>(BASE_URL, note, config);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete<Note>(`${BASE_URL}/${id}`, config);
  return response.data;
};