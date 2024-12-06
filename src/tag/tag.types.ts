export interface ITagCreate {
  name: string;
  color: string;
  topicId: number;
}

export interface ITagDelete {
  id: number;
}

export interface ITagUpdate {
  id: number;
  name?: string;
  color?: string;
  topicId?: number;
}
