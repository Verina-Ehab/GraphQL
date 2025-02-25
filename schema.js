const schema=`
type User{
name : String!,
email : String!,
role : String!

}
enum STATUS{
Pending
Completed
InProgress
}

type Todo{

title:String!
status:STATUS
userId:ID!
id:ID!
time:String


}
type Query{
  users: [User]
  user(id:ID):User
  todos: [Todo]
  todo(id:ID):Todo
  }

  type Mutation{
  register(user:newUser):User!
  login(user:loggedInUser):String
  deleteUser(id:ID):String
  addTodo( todo:TodoInput!):Todo
  updateTodo(id:ID!,todo:UpdateTodoInput!):Todo
  deleteTodo(id:ID):String
  }
input newUser{
  name: String!,
  email: String!,
  password: String!,
  role: String
  }
  
input loggedInUser{
email: String!,
password: String!,
}
input TodoInput{
title: String!
status: STATUS
userId:ID!
}
input UpdateTodoInput{
title: String!
status: STATUS
userId:ID
}

`






export default schema