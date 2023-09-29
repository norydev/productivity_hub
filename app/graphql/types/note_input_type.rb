# frozen_string_literal: true

module Types
  class NoteInputType < Types::BaseInputObject
    argument :name, String, required: false
    argument :content, [String]
  end
end
