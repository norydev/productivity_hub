require "rails_helper"

RSpec.describe Mutations::NoteCreate, type: :request do
  describe ".resolve" do
    it "creates a note" do
      expect do
        post "/graphql", params: { query: query }
      end.to change { Note.count }.by(1)
    end

    it "returns a note" do
      post "/graphql", params: { query: query }
      json = JSON.parse(response.body)
      data = json["data"]["noteCreate"]["note"]

      expect(data).to include(
        "id" => be_present,
        "name" => "A new note",
        "content" => ["I like oranges", "and bananas"]
      )
    end

    it "fails if name is missing" do
      post "/graphql", params: { query: missing_name_query }
      json = JSON.parse(response.body)

      expect(json["errors"]).to be_present
    end
  end

  def query
    <<~GRAPHQL
      mutation {
        noteCreate(
          input: {
            noteInput: {
              name: "A new note"
              content: ["I like oranges", "and bananas"]
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

  def missing_name_query
    <<~GRAPHQL
      mutation {
        noteCreate(
          input: {
            noteInput: {
              content: ["I like oranges", "and bananas"]
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
