import { useState } from 'react'
import './App.css'
import { AddUser } from './components/AddUser'
import { UserList } from './components/UserList'
import { UserContext } from './context'
import { IUser, InputUser } from './types'

export default function App() {
  const [users, setUsers] = useState<IUser[]>([
    { id: 101, name: "Arsen", age: 26, salary: 240000 },
    { id: 102, name: "Artur", age: 21, salary: 320000 },
    { id: 103, name: "Ani", age: 35, salary: 180000 },
    { id: 104, name: "Gevorg", age: 75, salary: 540000 }
  ])

  const generateId = (): number => {
    return Date.now()
  }

  const addUser = (user: InputUser): void => {
    const newId = generateId()
    const newUser: IUser = { id: newId, ...user }
    setUsers([...users, newUser])
    console.log(users)
  }

  const removeUser = (id: number): void => {
    setUsers(users.filter(user => user.id !== id))
  }


  return (
    <UserContext.Provider value={{ users, removeUser, addUser, generateId }}>
      <AddUser />
      <UserList />
    </UserContext.Provider>
  )
}

