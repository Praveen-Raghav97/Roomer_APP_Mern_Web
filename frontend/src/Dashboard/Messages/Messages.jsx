import React from 'react'
import './Messages.css'
const Messages = () => {
  return (
    <div className='message'>
      <h1>All Messages</h1>
      <div className="cone">
        <table className='table'>
        <thead className='t-head'>
      <tr>
        <th scope='column' className='th1'>
          Name
        </th>
     
        <th scope='column' className='th2'>
          Email
        </th><th scope='column' className='th1'>
          Phone
        </th>
        <th scope='column' className='th3'>
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      
   
    </tbody>
        </table>
      </div>
    </div>
  )
}

export default Messages
