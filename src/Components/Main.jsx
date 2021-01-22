// import React, { Component } from "react";
// import Navbar1 from "../Components/Navbar1";
// import Modal from "../Components/Modal";

// import Pagination from "../Components/Pagination";
// import { paginate } from "../utils/Pagination";

// class Main extends Component {
//   state = {
//     pageSize: 5,
//     currentPage: 1,
//     students: [],
//     addModalShow: false,
//     EditUserShow: false,
//   };

//   componentDidMount = () => {
//     this.refreshList();
//   };

//   refreshList = () => {
//     fetch("http://localhost:55392/api/Students")
//       .then((Response) => Response.json())
//       .then((data) => {
//         this.setState({ students: data });
//       });
//   };

//   componentDidUpdate = () => {
//     this.refreshList();
//   };

//   DeleteStudent = (id) => {
//     if (window.confirm("Are you sure?")) {
//       fetch("http://localhost:55392/api/Students/" + id, {
//         method: "DELETE",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });
//     }
//   };

//   handlePageChange = (page) => {
//     this.setState({ currentPage: page });
//   };

//   render() {
//     const {
//       students,
//       id,
//       std_Name,
//       std_RegistrationNo,
//       std_Email,
//       std_Phone,
//       std_Address,
//     } = this.state;
//     let addModalClose = () => this.setState({ addModalShow: false });
//     let EditUserClose = () => this.setState({ EditUserShow: false });
//     const { length: count } = this.state.students;
//     const { pageSize, currentPage, students: allStudents } = this.state;

//     const Students = paginate(allStudents, currentPage, pageSize);

//     return sessionStorage.getItem("accessToken") == null ? (
//       this.props.history.push("/Login")
//     ) : (
//       <>
//         <Navbar1 />
//         <div className="container">
//           <button
//             type="button"
//             className="btn btn-success float-right mt-3 mb-3"
//             data-toggle="modal"
//             data-target="#exampleModalCenter"
//             onClick={() => this.setState({ addModalShow: true })}
//           >
//             Add Student
//           </button>
//           <Modal show={this.state.addModalShow} onHide={this.addModalClose} />
//           <EditUser
//             show={this.state.EditUserShow}
//             onHide={this.EditUserClose}
//             id={id}
//             std_Name={std_Name}
//             std_RegistrationNo={std_RegistrationNo}
//             std_Email={std_Email}
//             std_Phone={std_Phone}
//             std_Address={std_Address}
//           />
//         </div>
//         <div className="container">
//           <h6 className="display-6 mt-2">
//             There are {count} students in records.
//           </h6>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th scope="col">Id</th>
//                 <th scope="col">Name</th>
//                 <th scope="col">Registration No.</th>
//                 <th scope="col">Email</th>
//                 <th scope="col">Phone</th>
//                 <th scope="col">Address</th>
//                 <th scope="col">Edit</th>
//                 <th scope="col">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Students.map((student) => (
//                 <tr key={student.id}>
//                   <td>{student.id}</td>
//                   <td>{student.std_Name}</td>
//                   <td>{student.std_RegistrationNo}</td>
//                   <td>{student.std_Email}</td>
//                   <td>{student.std_Phone}</td>
//                   <td>{student.std_Address}</td>
//                   <td>
//                     <button
//                       className="btn btn-warning btn-sm"
//                       data-toggle="modal"
//                       data-target="#editexampleModalCenter"
//                       onClick={() =>
//                         this.setState({
//                           EditUserShow: true,
//                           id: student.id,
//                           std_Name: student.std_Name,
//                           std_RegistrationNo: student.std_RegistrationNo,
//                           std_Email: student.std_Email,
//                           std_Phone: student.std_Phone,
//                           std_Address: student.std_Address,
//                         })
//                       }
//                     >
//                       Edit
//                     </button>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => this.DeleteStudent(student.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <Pagination
//             itemsCount={count}
//             pageSize={pageSize}
//             currentPage={currentPage}
//             onPageChange={this.handlePageChange}
//           />
//         </div>
//       </>
//     );
//   }
// }

// export default Main;




