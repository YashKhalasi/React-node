import React from 'react'
import {  Button } from 'react-bootstrap'

const Cards = (props) => {
console.log("Cards Data..",props);
    return(<>
        <div class="card" >

  <div class="card-body">
    <h5 class="card-title">{props.invetorsData.holder_name} - {props.invetorsData.holder_accno}</h5>
    <table class="table table-primary table-striped">
          <thead>
            <tr>
              { props.tableTitle.map((list, index) =>
                  <th key={index} scope="col">{list}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {props.investData.map((list, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                    <td>{list.scheme_name}</td>
                    <td>{list.total_investment }</td>
                    <td>{list.holder_portfolio}</td>
                    <td>{list.profit}</td>
                    {/* <td><Button variant="primary" onClick={()=>editUserData(list, index+1)}>Edit User</Button></td>

                  <td><Button variant="danger" onClick={()=>deleteUser(list.holder_accno)}>Delete User</Button></td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
    {/* <button>Go somewhere</button> */}
  </div>
</div>
</>
    )
}
export default Cards; 