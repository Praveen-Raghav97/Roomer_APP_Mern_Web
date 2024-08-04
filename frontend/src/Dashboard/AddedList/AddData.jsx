import React from 'react'
import './AddedList.css'
const AddData = ({title,date,mongoId , price , deleteProperty}) => {
  return (
    <tr className='tr'>
     <th scope='row' className='th hide'>
   {mongoId}
     </th>
     <td className='td'>
{title}
     </td>

     <td className='td hide'>
      {price}
     </td>
     <td className='td' onClick={()=>deleteProperty(mongoId)}>X</td>
    </tr>
  )
}

export default AddData
