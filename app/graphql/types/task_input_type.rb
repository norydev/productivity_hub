# frozen_string_literal: true

module Types
  class TaskInputType < Types::BaseInputObject
    argument :name, String, required: false
    argument :description, String, required: false
    argument :due_date, GraphQL::Types::ISO8601DateTime, required: false
  end
end
