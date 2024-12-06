export interface ITopicCreate {
  name: string;
  color: string;
}

export interface ITopicDelete {
  id: number;
}

export interface ITopicUpdate {
  id: number;
  name?: string;
  color?: string;
}
