export interface ICategory extends Document {
  readonly category: string;
  description: string;
  events: Array<CategoryEvent>;
}

export interface CategoryEvent {
  name: string;
  operation: string;
  value: number;
}
