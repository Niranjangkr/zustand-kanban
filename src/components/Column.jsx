import React, { useMemo, useState } from 'react'
import Task from './Task'
import './column.css'
import { useStore } from '../store'
import { shallow } from 'zustand/shallow'
import classNames from 'classnames'

const Column = ({state}) => {
  const [ open, setOpen ] = useState(false)
  const [ text, setText ] = useState('')
  const tasks = useStore((store) => store.tasks.filter((task) => task.state === state, shallow))
  const [drop, setDrop ] = useState(false)

//   const filtered = useMemo(
//     () => tasks.filter((task) => task.state === state),
//     [tasks, state]
//   )

// add task
  const addTask = useStore((store) => store.addTask)
  
  // Drag and drop
  const draggedTask = useStore((store) => store.draggedTask)
  const setDraggedTask = useStore((store) => store.setDraggedTask)
  const moveTask = useStore((store) => store.moveTask)
  return (
    <div className={classNames('column', {drop:drop})} 
    onDragOver={(e) =>{ 
      e.preventDefault()
      setDrop(true)
    }
    }
    onDragLeave={(e) => {
        e.preventDefault()
        setDrop(false)
      }
    }
    onDrop={
      () =>{ 
        setDrop(false)
        moveTask(draggedTask, state)
        setDraggedTask(null)
      }
    }
    >
        <div className='titieWrapper'>
          <p>{state}</p>
          <button onClick={()=> setOpen(true)}>Add</button>
        </div>
        {
          tasks.map(task => (<Task title={task.title} key={task.title}/>))
        }
        {
          open&&(
            <div className='ModalContent'>
              <div className='modalInput'>
                <input type="text" onChange={(e) => setText(e.target.value)} value={text} />
                <button onClick={()=> {
                  addTask(text, state)
                  setText('')
                  setOpen(false)
                }}>Submit</button>    
              </div>
            </div>
          )
        }
    </div>
  )
}

export default Column