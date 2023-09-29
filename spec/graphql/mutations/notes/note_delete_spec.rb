require "rails_helper"

RSpec.describe Mutations::NoteDelete, type: :request do
  describe ".resolve" do
    it "deletes a note" do
      note = Note.create!(name: "Original name", content: ["A", "B"])

      expect do
        post "/graphql", params: { query: query(note_id: note.id) }
      end.to change { Note.count }.by(-1)
    end

    it "returns the deleted note" do
      note = Note.create!(name: "Original name", content: ["A", "B"])

      post "/graphql", params: { query: query(note_id: note.id) }
      json = JSON.parse(response.body)
      data = json["data"]["noteDelete"]["note"]

      expect(data).to include(
        "id" => note.id.to_s,
        "name" => "Original name",
        "content" => ["A", "B"]
      )
    end
  end

  def query(note_id:)
    <<~GRAPHQL
      mutation {
        noteDelete(
          input: {
            id: #{note_id}
          }
        ) {
          note {
            id
            name
            content
          }
        }
      }
    GRAPHQL
  end
end
