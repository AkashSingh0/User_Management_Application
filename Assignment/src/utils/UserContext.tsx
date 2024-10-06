import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserAttribute } from '../components/HomePage';

interface UsersContextType {
  users: UserAttribute[];
  addUser: (user: UserAttribute[]) => void;
  updateUser: (id: number, updatedUser: Partial<UserAttribute>) => void;
  deleteUser: (id: number) => void;
}

// Create the context
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Create a provider component
const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserAttribute[]>([]); // Initialize with empty array

  const addUser = (user: UserAttribute[]) => {
    setUsers((prevUsers) => [...prevUsers, ...user]);
  };

  const updateUser = (id: number, updatedUser: Partial<UserAttribute>) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
  };

  const deleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
};

const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return context;
};

export { UsersProvider, useUsersContext };
