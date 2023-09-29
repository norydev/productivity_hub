import React, { useState } from 'react'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import EditTask from './EditTask'

import { gql, useMutation } from '@apollo/client'
import { GET_TASKS_AND_NOTES } from './ProductivityHub'

export default ({task}) => {
  const { id, name, description, dueDate } = task

  const [editMode, setEditMode] = useState(false)

  const [deleteTask] = useMutation(
    gql`
      mutation {
        taskDelete(
          input: {
            id: ${id}
          }
        ) {
          task {
            id
          }
        }
      }
    `,
    {
      refetchQueries: [GET_TASKS_AND_NOTES]
    },
  )

  const showEdit = () => {
    setEditMode(true)
  }
  const hideEdit = () => {
    setEditMode(false)
  }

  return (
    editMode ? (
      <EditTask task={task} onCancel={hideEdit} key={id} />
    ) : (
      <div className="border rounded-lg shadow-xl text-slate-900 mx-auto w-96 dark:text-slate-300 mx-2 my-2 p-4 flex">
        <div className="grow">
          <h1 className="text-lg font-semibold text-slate-900">{name}</h1>
          <p>{description}</p>
          { dueDate && (<p className="text-sm mt-3">Due date: {dueDate}</p>) }
        </div>
        <div>
          <EditButton onClick={showEdit}/>
          <DeleteButton onClick={deleteTask} />
        </div>
      </div>
    )
  )
}
