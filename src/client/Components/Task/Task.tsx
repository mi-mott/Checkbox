export interface TaskType {
  id: number;
  name: string;
  description: string;
  create_date: number;
  due_date: number;
}

export const Task = (props: TaskType) => {
  const { id, name, description, create_date, due_date } = props;

  return (
    <div>
      <span>{id}</span>
      <span>{name}</span>
      <span>{description}</span>
      <span>{create_date}</span>
      <span>{due_date}</span>
    </div>
  );
};
