module Types
  class MutationType < Types::BaseObject
    field :task_create, mutation: Mutations::TaskCreate
    field :task_update, mutation: Mutations::TaskUpdate
    field :task_delete, mutation: Mutations::TaskDelete

    field :note_create, mutation: Mutations::NoteCreate
    field :note_update, mutation: Mutations::NoteUpdate
    field :note_delete, mutation: Mutations::NoteDelete
  end
end
