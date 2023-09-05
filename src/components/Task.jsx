import React from 'react'
import './task.css'
import classNames from 'classnames'
import { useStore } from '../store'

const Task = ({title}) => {
  const task = useStore((store) => store.tasks.find((task) => task.title == title ))
  const deleteTask = useStore((store)=> store.deleteTask)
  const setDraggedTask = useStore((store) => store.setDraggedTask)

  return (
    <div className='task' draggable onDragStart={()=>setDraggedTask(task.title)}>
        <div>{task.title}</div>
        <div className='bottomWrapper'>
          <div className='delete' onClick={()=>deleteTask(task.title)}>X</div>
          <div className={classNames('status', task.state)}>{task.state}</div>
        </div>
    </div>
  )
}

export default Task