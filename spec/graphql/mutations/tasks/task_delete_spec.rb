require "rails_helper"

RSpec.describe Mutations::TaskDelete, type: :request do
  describe ".resolve" do
    it "deletes a task" do
      task = Task.create!(name: "Original name", description: "Take a break")

      expect do
        post "/graphql", params: { query: query(task_id: task.id) }
      end.to change { Task.count }.by(-1)
    end

    it "returns the deleted task" do
      task = Task.create!(name: "Original name", description: "Take a break")

      post "/graphql", params: { query: query(task_id: task.id) }
      json = JSON.parse(response.body)
      data = json["data"]["taskDelete"]["task"]

      expect(data).to include(
        "id" => task.id.to_s,
        "name" => "Original name",
        "description" => "Take a break"
      )
    end
  end

  def query(task_id:)
    <<~GRAPHQL
      mutation {
        taskDelete(
          input: {
            id: #{task_id}
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
