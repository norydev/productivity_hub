import React from "react"
import { useQuery, gql } from '@apollo/client'
import Task from "./Task"
import Note from "./Note"

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
        <div className="flex">
          { tasks.map((task) => <Task task={task}/>) }
        </div>
        <div className="text-center m-5">
          <button className="pointer-events-auto rounded-md bg-green-600 px-3 py-3 font-semibold leading-5 text-white hover:bg-green-500">Add Task</button>
        </div>

        <div className="flex">
          { notes.map((note) => <Note note={note} />) }
        </div>
        <div className="text-center m-5">
          <button className="pointer-events-auto rounded-md bg-green-600 px-3 py-3 font-semibold leading-5 text-white hover:bg-green-500">Add Note</button>
        </div>
      </div>
    )
  )
}
