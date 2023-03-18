import { BiEdit, BiTrash } from "react-icons/bi";
function ListItem({ data, removeItem, editItem}) {
    return (
      <div className='list-item' key={data.id}>
        <p className='title'>{data.title}</p>
        <div className='button-container'>
          <BiEdit 
          className="btn"
          onClick={() => editItem(data.id)}>แก้ไข</BiEdit>
          <BiTrash 
          className="btn"
          onClick={() => removeItem(data.id)}>ลบ</BiTrash>
        </div>
      </div>
    );
  }
  
  export default ListItem;
  
