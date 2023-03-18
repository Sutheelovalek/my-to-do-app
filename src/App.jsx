import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Alert from './components/Alert';
import ListItem from './components/ListItem';
import './App.css';


function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: true, msg: '', type: '' });
  const [checkEditItem, setCheckEditItem] = useState(false);
  const [editId, setEditId] = useState(null)

  const submitData = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({ show: true, msg: 'กรุณาป้อนข้อมูลด้วยค่ะ!!', type: 'error' });
    } else if (checkEditItem && name){
      const result =  list.map((item)=>{
        if(item.id === editId) {
          return {...item, title:name}
        }
        return item
      })
      setList(result)
      setName('')
      setCheckEditItem(false)
      setEditId(null)
      setAlert({show: true, msg: "แก้ไขข้อมูลเรียบร้อย", type:"success"})
    }else {
      const newItem = {
        id: uuidv4(),
        title: name,
      };
      setList([...list, newItem]);
      setName('');
      setAlert({ show: true, msg: 'บันทึกข้อมูลเรียบร้อย', type: 'success' });
    }
  };

  const removeItem = (id) => {
    const result = list.filter((item) => item.id !== id);
    setList(result);
    setAlert({ show: true, msg: 'ลบข้อมูลเรียบร้อย', type: 'success' });
  };

  const editItem=(id)=>{
    setCheckEditItem(true)
    setEditId(id)
    const searchItem = list.find((item)=>item.id === id)
    setName(searchItem.title)
  }

  return (
      <section className="container">
        <h1>To Do List App</h1>
        {alert.show && <Alert msg={alert.msg} type={alert.type} setAlert={setAlert} list={list} />}
        <form className="form-group" onSubmit={submitData}>
          <div className="form-control">
            <input type="text" className="text-input" onChange={(e) => setName(e.target.value)} value={name} />
            <button type="submit" className="submit-btn">
              {checkEditItem ? "แก้ไขข้อมูล" : "เพื่มข้อมูล"}
            </button>
          </div>
        </form>
        <section className="list-container">
          {list.map((data) => (
            <ListItem key={data.id} data={data} removeItem={removeItem} editItem={editItem}/>
          ))}
        </section>
      </section>
  );
}

export default App;
