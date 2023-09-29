require "rails_helper"

RSpec.describe Mutations::NoteUpdate, type: :request do
  describe ".resolve" do
    it "updates a note" do
      note = Note.create!(name: "Original name", content: ["A", "B"])

      post "/graphql", params: { query: query(note_id: note.id) }

      note.reload
      expect(note.name).to eq("New note name")
      expect(note.content).to eq(["Z", "Y"])
    end

    it "returns the updated note" do
      note = Note.create!(name: "Original name", content: ["A", "B"])

      post "/graphql", params: { query: query(note_id: note.id) }
      json = JSON.parse(response.body)
      data = json["data"]["noteUpdate"]["note"]

      expect(data).to include(
        "id" => note.id.to_s,
        "name" => "New note name",
        "content" => ["Z", "Y"]
      )
    end
  end

  def query(note_id:)
    <<~GRAPHQL
      mutation {
        noteUpdate(
          input: {
            id: #{note_id}
            noteInput: {
              name: "New note name"
              content: ["Z", "Y"]
            }
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
