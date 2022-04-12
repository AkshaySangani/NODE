import React from "react";
import {useState} from "react";
import axios from "axios";

function Layout() {
    const [lists, setLists] = useState([]);
    const [lists2, setLists2] = useState([]);
    const [lists1, setLists1] = useState([]);
    const [flag, setFlag] = useState('');

    const submitData = async () => {
        if (flag === '') {
            console.log("lists", lists);
            await axios.post("http://localhost:8080/projects", lists);
            showMyData()
        } else {
            console.log("edit working", flag, "list", lists);
            await axios.put(`http://localhost:8080/projects/${flag.id}`,lists);
            showMyData()
        }
    };

    const editData = async (id) => {
        setFlag({id})
        console.log("working", id);
        const selected = await axios.get(`http://localhost:8080/projects/${id}`)
            .then(res => res.data);
        setLists({body: selected.body});
        setLists({title: selected.title});
        await setLists(selected);
    };
    console.log("selected", lists);

    const deleteData = async (id) => {
        console.log("delete", id);
        await axios.delete(`http://localhost:8080/projects/${id}`);
        showMyData()
    };

    const onInputChange = e => {
        setLists({...lists, [e.target.name]: e.target.value});
    };

    const showMyData = async () => {
        const showMyLists = await axios.get("http://localhost:8080/projects")
            .then(res => res.data);
        console.log("showMyLists", showMyLists);
        await setLists1(showMyLists);
        console.log("lists", lists1)
    };

    return (<>
            <form>
                <div className='container'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" name="title" className="form-control" id="title" value={lists.title}
                               onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Body</label>
                        <input type="text" name="body" className="form-control" id="body" value={lists.body}
                               onChange={(e) => onInputChange(e)}/>
                    </div>
                </div>
            </form>
            <button type="submit" className="btn btn-primary mx-2" onClick={() => submitData()}>Submit</button>
            <button type="button" className="btn btn-primary mx-2" onClick={() => showMyData()}>Show My Lists</button>
            <table className="table border shadow">
                <thead className="table-dark ">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Body</th>
                    <th style={{width: "20%"}}>Action</th>
                </tr>
                </thead>
                <tbody>{
                    lists1.map((list, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{list.title}</td>
                            <td>{list.body}</td>
                            <td>
                                <button className=" btn btn-secondary mx-2" onClick={() => editData(list._id)}>update
                                </button>
                                <button className="btn btn-danger" onClick={() => deleteData(list._id)}>delete</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default Layout;