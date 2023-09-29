import React, { useRef } from 'react'

import { gql, useMutation } from '@apollo/client'
import { GET_TASKS_AND_NOTES } from './ProductivityHub'

export default ({task, onCancel}) => {
  const { id, name, description, dueDate } = task
  const nameRef = useRef()
  const descriptionRef = useRef()
  const dueDateRef = useRef()

  const [updateTask] = useMutation(
    gql`
      mutation($id: ID!, $taskInput: TaskInput!) {
        taskUpdate(
          input: {
            id: $id
            taskInput: $taskInput
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

  const submit = () => {
    const taskInput = {
      name: nameRef.current.value
    }

    if (descriptionRef.current.value !== "") {
      taskInput.description = descriptionRef.current.value
    }

    if (dueDateRef.current.value !== "") {
      taskInput.dueDate = dueDateRef.current.value
    }

    updateTask({ variables: { id, taskInput } })
  }

  return (
    <div className="border rounded-lg shadow-xl text-slate-900 mx-auto w-96 dark:text-slate-300 mx-2 my-2 p-4 flex" key={id}>
      <form>
        <input
          className="mb-2 w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          placeholder="name"
          name="nameInput"
          ref={nameRef}
          defaultValue={name}
        />
        <input
          className="mb-2 w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          placeholder="description"
          ref={descriptionRef}
          defaultValue={description}
        />
        <input
          className="mb-2 w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          placeholder="due date"
          ref={dueDateRef}
          defaultValue={dueDate}
        />
        <button
          className="pointer-events-auto rounded-md bg-blue-600 px-1 py-1 font-semibold leading-5 text-white hover:bg-blue-500"
          onClick={submit}
        >
          Update
        </button>
        <button className="ml-2" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  )
}
