import React from "react"
import { useQuery, gql } from '@apollo/client'
import Task from "./Task"
import Note from "./Note"
import NewTask from "./NewTask"

export const GET_TASKS_AND_NOTES = gql`
  {
    tasks {
      id
      name
      description
      dueDate
    }
    notes {
      id
      name
      content
    }
  }
`

export const ProductivityHub = () => {
  const { loading, error, data } = useQuery(GET_TASKS_AND_NOTES)

  const { tasks, notes } = { ...data }

  return(
    loading ? (<div>loading...</div>) : (
      <div>
        <div className="flex flex-wrap">
          { tasks.map((task) => <Task task={task} key={task.id}/>) }
        </div>
        <div className="text-center m-5">
          <NewTask />
        </div>

        <div className="flex">
          { notes.map((note) => <Note note={note} key={note.id} />) }
        </div>
        <div className="text-center m-5">
          <button className="pointer-events-auto rounded-md bg-green-600 px-3 py-3 font-semibold leading-5 text-white hover:bg-green-500">Add Note</button>
        </div>
      </div>
    )
  )
}
