import './Users.css';
import React from 'react';
import { useUserData, useUserTable } from '../../hook/allHook';
import { TrashForTable } from '../../SVGimg/SVG'

const Users = () => {
  const {
    usersTable, setUsersTable,
    deleteUsers, OpenProfileUsers,
  } = useUserTable();

  const { userMainData } = useUserData()

  return (
    <div className='db-users'>
      <table className='table-db-users'>
        <thead className='head-db-users'>
          <tr className='tr-db-users'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Pass</th>
            <th>Status</th>
            <th>Img</th>
            <th>Delete</th>
            <th>Page</th>
          </tr>
        </thead>
        <tbody className='body-db-users'>
          {usersTable.map(usersTable => {
            if (userMainData.length > 0 && userMainData[0].id !== usersTable.id) {
              return (
                <tr key={usersTable.id}>
                  <td>{usersTable.id}</td>
                  <td>{usersTable.name}</td>
                  <td>{usersTable.email}</td>
                  <td>{usersTable.pass}</td>
                  <td>{usersTable.status}</td>
                  <td>
                    {usersTable.img ? (
                      <img src={usersTable.img} alt={usersTable.name} style={{ width: 150, height: 100 }} />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td>
                    <button onClick={() => deleteUsers(usersTable.id)}>
                      <TrashForTable />
                    </button>
                  </td>
                  <td className="go-link-user-page" onClick={() => OpenProfileUsers(usersTable.id)}>
                    GO
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
