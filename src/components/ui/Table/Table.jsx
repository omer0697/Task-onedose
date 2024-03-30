import React, { useState } from 'react';
import { Table } from 'antd';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};
const CustomTable = ({columns, data}) => {
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div className=''>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default CustomTable;