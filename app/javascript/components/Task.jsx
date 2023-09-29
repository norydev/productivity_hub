import React from 'react'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

import { gql, useMutation } from '@apollo/client'
import { GET_TASKS_AND_NOTES } from './ProductivityHub'

export default ({task}) => {
  const { id, name, description, dueDate } = task

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

  return (
    <div className="border rounded-lg shadow-xl text-slate-900 mx-auto w-96 dark:text-slate-300 mx-2 my-2 p-4 flex" key={id}>
      <div className="grow">
        <h1 className="text-lg font-semibold text-slate-900">{name}</h1>
        <p>{description}</p>
        { dueDate && (<p className="text-sm mt-3">Due date: {dueDate}</p>) }
      </div>
      <div>
        <EditButton />
        <DeleteButton onClick={deleteTask} />
      </div>
    </div>
  )
}
