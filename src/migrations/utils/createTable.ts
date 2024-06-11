import { Table, TableColumnOptions, TableOptions } from 'typeorm';

const id: TableColumnOptions = {
  name: 'id',
  type: 'serial',
  isPrimary: true,
  generationStrategy: 'increment',
};

const updatedAt: TableColumnOptions = {
  name: 'updated_at',
  type: 'timestamp',
  default: 'now()',
};

const createdAt: TableColumnOptions = {
  name: 'created_at',
  type: 'timestamp',
  default: 'now()',
};

const createTable = (options: TableOptions) => {
  options.columns?.unshift(id);
  options.columns?.push(updatedAt);
  options.columns?.push(createdAt);

  return new Table(options);
};

export default createTable;
