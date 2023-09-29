# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Task.create!(name: "Stay Hydrated", description: "Drink at least 2l of water", due_date: 3.hours.from_now)
Task.create!(name: "Read all the books", description: "Start with upper shelf")
Task.create!(name: "Write more tasks")

Note.create!(name: "Books I read", content: ["Treasure Island", "A tale of two cities", "Les misérables"])
Note.create!(name: "Great German Food")
