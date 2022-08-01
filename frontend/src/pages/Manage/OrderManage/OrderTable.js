import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Table, Switch } from 'antd';
//import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css'
const FlexBox = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid palevioletred;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    margin: 20px;
  }
`;

const data = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
export default function OrderTable() {
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState('');
  const [fixedTop, setFixedTop] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const cancel = () => {
    setEditingKey('');
  };

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={value}
      onChange={e => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = data.filter(entry =>
          entry.name.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );

  const columns = [
    {
      title: FilterByNameInput,
      dataIndex: 'name',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    }
  ];

  return (
    <FlexBox>
      <Table columns={columns} dataSource={dataSource} 
      summary={() => (
        <Table.Summary>
          
        </Table.Summary>
      )}
      sticky/>
    </FlexBox>
  );
}
