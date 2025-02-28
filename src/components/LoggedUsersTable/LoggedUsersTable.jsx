import React from "react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const UserTable = ({ users, counts }) => {
  return (
    <motion.div 
      className="p-6 bg-white rounded-lg shadow-lg" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4">User Login Data</h2>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.3 }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Last Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <motion.tr 
                key={user._id} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: index * 0.1 }}
                className="border-b hover:bg-gray-100 transition"
              >
                <TableCell>{user.username}</TableCell>
                <TableCell>{new Date(user.lastLoginAt).toLocaleString()}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <div className="mt-4 text-gray-600">
        <p><strong>Total Users:</strong> {counts.total}</p>
        <p><strong>Currently Logged In:</strong> {counts.loggedIn}</p>
      </div>
    </motion.div>
  );
};

export default UserTable;
