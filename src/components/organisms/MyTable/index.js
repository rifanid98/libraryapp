import React from 'react';
import { Table } from 'reactstrap';

const MyTable = (props) => {
  const {
    tableHead = [],
    tableBody,
  } = props;

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          {tableHead.length > 0
            ? tableHead.map((thead, index) => {
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
        {tableBody
          ? tableBody.length > 0
            ? tableBody.map(tbody => {
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
            : tableBody
          : [1, 2, 3, 4].map(tbody => {
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
        }
      </tbody>
    </Table>
  );
}

export default MyTable;