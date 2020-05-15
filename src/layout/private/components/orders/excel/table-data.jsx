import React from 'react';
import Table from 'react-bootstrap/Table';

const ExcelTable = ({data}) => {

    const TableRow = (object,index) => {

        return(
              <tr key = {index} className='even'>
                  <td> {index + 1} </td>
                  <td>{object.meal}</td>
                  <td>{object.quantity}</td>
                  <td>{object.user}</td>
              </tr>
          )
    }

    const TableData = data.map((object,index) => TableRow(object,index))

    const tableHeader = () => {
        
        return(
            <thead className='bgvi'>
                <tr>
                    <th>#</th>
                    <th>Meal</th>
                    <th>Quantity</th>
                    <th>User</th>
                </tr>
            </thead>
        )
    }
    
    
    return (
        <Table striped bordered hover>
            {tableHeader}
            <tbody>
                {TableData}
            </tbody>
        </Table>
    )
}

export default ExcelTable