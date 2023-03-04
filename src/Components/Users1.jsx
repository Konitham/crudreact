import React, { useEffect, useState } from 'react'
import axios from "axios";

const Users1 = () => {

    const[user,setUser] = useState({
        name:"",
        gender:""
    })
    const [users1, setUsers1] = useState([]);
    const [isEdit,setIsEdit] = useState(false)

    useEffect(() => {
        getDataFromServer()
    }, []);

    const getDataFromServer = () => {
        axios.get("http://localhost:3000/users1").then((res) => {
            setUsers1(res.data)
            // console.log(res.data)
        })
    }
    // console.log(users1)
    const deleteUser =(usr) =>{
        // console.log(usr);
        axios.delete("http://localhost:3000/users1/"+usr.id).then(()=>{
            getDataFromServer();
        })
    }
    const handleChange =(e)=>{
        // console.log(e)
        let newUser = {...user};
        newUser[e.target.name] =e.target.value
        setUser(newUser)
    }
    const addUser=()=>{
        console.log(user);
        axios.post("http://localhost:3000/users1/",user).then(()=>{
            getDataFromServer();
            clearForm();
        })
    }
    const editUser = (usr) =>{
        setUser(usr);
        setIsEdit(true)
    }
    const updateUser = () =>{
        console.log(user);
        axios.put("http://localhost:3000/users1/"+user.id,user).then(()=>{
            getDataFromServer();
            setIsEdit(false);
            clearForm();
        })
    }
    const clearForm = () =>{
        setUser({
            name:"",
            gender:""
        })
    }
    return (
        <div className='container'>
            <div className="forms">
                <form action="">
                    <label htmlFor="">Name</label> <br />
                    <input type="text" name="name" value={user.name} onChange={(e)=>{handleChange(e)}}/> <br />
                    <label htmlFor="">Gender</label> <br />
                    <input type="radio" name="gender"  checked={user.gender == "Male"} value={"Male"} onChange={(e)=>{handleChange(e)}}/> Male
                    <input type="radio" name="gender"  checked={user.gender == "Female"} value={"Female"} onChange={(e)=>{handleChange(e)}}/> Female <br />
                    {isEdit ? 
                    <button type='button' className='btn btn-primary' onClick={()=>{updateUser()}}>Update User</button> 
                    :
                    <button type='button' className='btn btn-primary' onClick={()=>{addUser()}}>Add User</button>
                    }
                    
                </form>
            </div> <br /> <br />
            <div className="table-display">
                <table className='table'>
                    <thead className='table-dark'>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users1.map((usr,i)=>
                        <tr key={i}>
                            <td>{usr.id}</td>
                            <td>{usr.name}</td>
                            <td>{usr.gender}</td>
                            <td>
                                <button type='button' onClick={()=>{editUser(usr)}} className='btn btn-warning'>Edit</button>
                            </td>
                            <td>
                                <button type='button' onClick={()=>{deleteUser(usr)}} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users1