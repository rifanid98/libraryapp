import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';

const MyTable = (props) => {
  const {
    tableHead = [],
    tableBody,
  } = props;

  const [theadState] = useState(tableHead);
  const [tbodyState, setTbodyState] = useState(tableBody);

  // tableBody didupdate
  useEffect(() => {
    setTbodyState(tableBody)
  }, [tableBody])

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          {theadState.length > 0
            ? theadState.map((thead, index) => {
              return (
                <th key={index}>{thead.title}</th>
              )
            })
            : [1, 2, 3, 4].map(thead => {
              return (
                <th key={thead}>Table heading {thead}</th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {tbodyState
          ? tbodyState.length > 0
            ? tbodyState.map(tbody => {
              return (
                <tr>
                  <th scope="row">{tbody}</th>
                  <td>Table cell 1</td>
                  <td>Table cell 2</td>
                  <td>Table cell 3</td>
                  <td>Table cell 4</td>
                </tr>
              )
            })
            : tbodyState
          : [1, 2, 3, 4].map(tbody => {
            return (
              <tr key={tbody}>
                <th scope="row">{tbody}</th>
                <td>Table cell 1</td>
                <td>Table cell 2</td>
                <td>Table cell 3</td>
                <td>Table cell 4</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  );
}

export default MyTable;