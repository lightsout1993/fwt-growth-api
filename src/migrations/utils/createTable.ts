import { Table, TableColumnOptions, TableOptions } from 'typeorm';

const id: TableColumnOptions = {
  name: 'id',
  type: 'int',
  isPrimary: true,
  isGenerated: true,
  generationStrategy: 'increment',
};

const updatedAt: TableColumnOptions = {
  name: 'updatedAt',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP',
  onUpdate: 'CURRENT_TIMESTAMP',
};

const createdAt: TableColumnOptions = {
  name: 'createdAt',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP',
};

const createTable = (options: TableOptions) => {
  options.columns?.unshift(id);
  options.columns?.push(updatedAt);
  options.columns?.push(createdAt);

  return new Table(options);
};

export default createTable;
