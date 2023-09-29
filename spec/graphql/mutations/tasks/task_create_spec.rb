require "rails_helper"

RSpec.describe Mutations::TaskCreate, type: :request do
  let(:due_date) { (1.day.from_now + 43.minutes + 23.seconds).iso8601 }

  describe ".resolve" do
    it "creates a task" do
      expect do
        post "/graphql", params: { query: query(due_date: due_date) }
      end.to change { Task.count }.by(1)
    end

    it "returns a task" do
      post "/graphql", params: { query: query(due_date: due_date) }
      json = JSON.parse(response.body)
      data = json["data"]["taskCreate"]["task"]

      expect(data).to include(
        "id" => be_present,
        "name" => "A new task",
        "description" => "Drink more water",
        "dueDate" => due_date
      )
    end

    it "fails if name is missing" do
      post "/graphql", params: { query: missing_name_query }
      json = JSON.parse(response.body)

      expect(json["errors"]).to be_present
    end
  end

  def query(due_date:)
    <<~GRAPHQL
      mutation {
        taskCreate(
          input: {
            taskInput: {
              name: "A new task"
              description: "Drink more water"
              dueDate: "#{due_date}"
            }
          }
        ) {
          task {
            id
            name
            description
            dueDate
          }
        }
      }
    GRAPHQL
  end

  def missing_name_query
    <<~GRAPHQL
      mutation {
        taskCreate(
          input: {
            taskInput: {
              description: "Wash your clothes"
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
