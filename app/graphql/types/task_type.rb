# frozen_string_literal: true

module Types
  class TaskType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :description, String
    field :due_date, GraphQL::Types::ISO8601DateTime
  end
end
