import React, {useState} from 'react';
import {Button, Input, Space} from "antd";
import moment from "moment";
import Highlighter from "react-highlight-words";
import {SearchOutlined, FilterFilled} from '@ant-design/icons';

const useColumnSearch = (dataIndex: string, dropdownArr?: any[] | null, objectKey?: string) => {
  const [searchText, setSearchText] = useState<string[]>([]);
  const [searchedColumn, setSearchedColumn] = useState('');

  //搜索
  const handleSearch = (selectedKeys: any[], confirm: Function, dataIndex: string) => {
    confirm();
    if (Object.prototype.toString.call(selectedKeys[0]) === '[object Object]') {
      let temp: string[] = [];
      selectedKeys.forEach((arr) => {
        temp.push(arr.label);
      });
      setSearchText(temp);
    } else {
      setSearchText([selectedKeys[0]]);
    }
    setSearchedColumn(dataIndex);
  };

  //重置
  const handleReset = (clearFilters: Function) => {
    clearFilters();
    setSearchText([]);
  };

  return ({
    filterDropdown: dropdownArr ? null : ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
      <div style={{padding: 8}}>
        <Input placeholder="请输入" value={selectedKeys[0]}
               onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
               onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
               style={{width: 188, marginBottom: 8, display: 'block'}}/>

        <Space>
          <Button
            type="primary" icon={<SearchOutlined/>} size="small"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{width: 90}}>搜索</Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small" style={{width: 90}}>重置</Button>
        </Space>
      </div>
    ),
    filters: dropdownArr ? dropdownArr.map(d => {
      return {text: d.Title, value: d.Title}
    }) : null,
    filterIcon: (filtered: boolean) => dropdownArr ? (
      <FilterFilled style={{color: filtered ? '#1890ff' : undefined}}/>
    ) : (
      <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
    ),
    onFilter: (value: string, record: any) => {
      let temp = '';
      //如果展示的是一个object，需要根据key取出值
      if (objectKey) {
        if (Object.prototype.toString.call(record[dataIndex]) === '[object Array]') {
          temp = record[dataIndex].map((r: any) => r[objectKey]).toString();
        } else {
          temp = record[dataIndex] ? record[dataIndex][objectKey] : '';
        }
      } else {
        //如果是日期格式，需要转化一下
        if (moment.isDate(record[dataIndex])) {
          temp = moment(record[dataIndex]).format('YYYY-MM-DD');
        } else {
          temp = record[dataIndex] || '';
        }
      }
      return temp.toString().toLowerCase().includes(value.toLowerCase());
    },
    render: (record: any) => {
      //如果展示的是一个object，需要根据key取出值
      let text = '';
      if (objectKey) {
        if (Object.prototype.toString.call(record) === '[object Array]') {
          text = record.map((r: any) => r[objectKey]).toString();
        } else {
          text = record ? record[objectKey] : '';
        }
      } else {
        if (moment.isDate(record)) {
          text = moment(record).format('YYYY-MM-DD');
        } else {
          text = record || '';
        }
      }
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={searchText}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
    }
  });
}

export default useColumnSearch;