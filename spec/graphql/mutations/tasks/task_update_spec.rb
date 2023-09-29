require "rails_helper"

RSpec.describe Mutations::TaskUpdate, type: :request do
  describe ".resolve" do
    it "updates a task" do
      task = Task.create!(name: "Original name")

      post "/graphql", params: { query: query(task_id: task.id) }

      task.reload
      expect(task.name).to eq("New task name")
      expect(task.description).to eq("read all the books")
    end

    it "returns the updated task" do
      task = Task.create!(name: "Original name")

      post "/graphql", params: { query: query(task_id: task.id) }
      json = JSON.parse(response.body)
      data = json["data"]["taskUpdate"]["task"]

      expect(data).to include(
        "id" => task.id.to_s,
        "name" => "New task name",
        "description" => "read all the books"
      )
    end
  end

  def query(task_id:)
    <<~GRAPHQL
      mutation {
        taskUpdate(
          input: {
            id: #{task_id}
            taskInput: {
              name: "New task name"
              description: "read all the books"
            }
          }
        ) {
          task {
            id
            name
            description
          }
        }
      }
    GRAPHQL
  end
end
