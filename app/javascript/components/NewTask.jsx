import React, { useRef } from 'react'

import { gql, useMutation } from '@apollo/client'
import { GET_TASKS_AND_NOTES } from './ProductivityHub'

export default () => {
  const nameRef = useRef()
  const descriptionRef = useRef()
  const dueDateRef = useRef()

  const [createTask] = useMutation(
    gql`
      mutation($taskInput: TaskInput!) {
        taskCreate(
          input: {
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

    createTask({ variables: { taskInput } })
  }

  return (
    <div className="border rounded-lg shadow-xl text-slate-900 mx-auto w-96 dark:text-slate-300 mx-2 my-2 p-4 flex">
      <form>
        <input
          className="mb-2 w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          placeholder="name"
          name="nameInput"
          ref={nameRef}
        />
        <input
          className="mb-2 w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          placeholder="description"
          ref={descriptionRef}
        />
        <input
          className="mb-2 w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="date"
          placeholder="due date"
          ref={dueDateRef}
        />
        <button
          className="pointer-events-auto rounded-md bg-green-600 px-2 py-2 font-semibold leading-5 text-white hover:bg-green-500"
          onClick={submit}
        >
          Create Task
        </button>
      </form>
    </div>
  )
}
