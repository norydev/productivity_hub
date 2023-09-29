import React from 'react'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

import { gql, useMutation } from '@apollo/client'
import { GET_TASKS_AND_NOTES } from './ProductivityHub'

export default ({note}) => {
  const { id, name, content } = note

  const [deleteNote] = useMutation(
    gql`
      mutation {
        noteDelete(
          input: {
            id: ${id}
          }
        ) {
          note {
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
    <div className="border rounded-lg shadow-xl text-slate-900 mx-auto w-96 dark:text-slate-300 mx-2 my-2 p-4 flex bg-slate-50" key={id}>
      <div className="grow">
        <h1 className="text-lg font-semibold text-slate-900">{name}</h1>
        { content.map((line, index) => <p key={index}>{line}</p>) }
      </div>
      <div>
        <EditButton />
        <DeleteButton onClick={deleteNote} />
      </div>
    </div>
  )
}
