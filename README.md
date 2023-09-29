# README

Check commit by commit to see the different steps. The commits aren't exactly perfect: message is pretty light and some parts could have been bundled differently. But it should still show the story and how I think.

I added graphiql (localhost:3000/graphiql) to play with the schema, my initial draft schema before implementation was:

```graphql
type Task {
    id: ID!
    name: String!
    description: String
    dueDate: date # not sure what type date is in the final schema, iso8601 defined in the ruby lib
}

type Note {
    id: ID!
    name: String!
    content: [String]
}

## queries:
# - read one `task` by ID, read all tasks
# - read one `note` by ID, read all notes
#
## mutations:
# - Create a task, Update a task given its ID, Delete a task given its ID
# - Create a note, Update a note given its ID, Delete a note given its ID
#
# ignored: the spec does not specify anything about these, so not implemented:
# - user: permission, authorization, etc. Assumption for simplest use case: single user owning all content
# - relation between task and note: nothing specified so let's assume no relation
```

### Unit tests

There are no unit tests, only request specs: the backend code is mostly auto-generated from the gem's CRUD generators. There isn't so much logic in there to unit test, but validating that the mutations work as expected seemed more crutial to me.

### Not implemented

Edit a note and create a note are left out from the frontend. They would look roughly the same as EditTask and NewTask.

### Could have been done better

The due_date management is not ideal, not unserializing those iso strings. Maybe I should have gone with a `Date` type instead of `DateTime`, to start with. This may have made the FE implementation less wobbly. This didn't seem like the crux of the exercise though, so I left it as-is.
