import React from "react";
import {useState} from "react";
import axios from "axios";
import {Table,Button} from "antd";
import 'antd/dist/antd.css';
import '../App.css';

function Layout() {
    const [lists, setLists] = useState([]);
    const [lists1, setLists1] = useState([]);
    const [flag, setFlag] = useState('');
    const URL="http://localhost:8080/projects";

    const submitData = async () => {
        if (flag === '') {
            console.log("lists", lists);
            await axios.post(URL, lists);
            showMyData()
        } else {
            console.log("edit working", flag, "list", lists);
            await axios.put(`${URL}/${flag.id}`,lists);
            showMyData()
        }
    };

    const editData = async (id) => {
        setFlag({id})
        console.log("working", id);
        const selected = await axios.get(`${URL}/${id}`)
            .then(res => res.data);
        setLists({body: selected.body});
        setLists({title: selected.title});
        await setLists(selected);
    };
    console.log("selected", lists);

    const deleteData = async (id) => {
        console.log("delete", id);
        await axios.delete(`${URL}/${id}`);
        showMyData()
    };

    const onInputChange = e => {
        setLists({...lists, [e.target.name]: e.target.value});
    };

    const showMyData = async () => {
        const showMyLists = await axios.get(URL)
            .then(res => res.data);
        console.log("showMyLists", showMyLists);
        await setLists1(showMyLists);
        console.log("lists", lists1)
    };


    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
        },
        {
            title: 'Action',
            render:(record,value,index)=>{return( <>
                <Button type="primary" shape="round" style={{margin:"5px"}} onClick={() => editData(record._id)} >Edit</Button>
                <Button type="danger" shape="round" style={{margin:"5px"}}  onClick={() => deleteData(record._id)}>Delete </Button></>
            )}
        },
    ];

    return (<>
            <div className='container'>
            <form>
                <div className='container' style={{width:'50%'}}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                        <input  type="text" name="title" className="form-control" id="title" value={lists.title}
                               onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Body</label>
                        <input type="text" name="body" className="form-control" id="body" value={lists.body}
                               onChange={(e) => onInputChange(e)}/>
                    </div>
                </div>
            </form>

            <Button type="primary" style={{margin:"5px"}} onClick={() => submitData()} >Submit</Button>
                <Button danger style={{margin:"5px"}} onClick={() => showMyData()}>Show My Notes</Button></div>

            {/*<table className="table border shadow">*/}
            {/*    <thead className="table-dark ">*/}
            {/*    <tr>*/}
            {/*        <th scope="col">#</th>*/}
            {/*        <th scope="col">Title</th>*/}
            {/*        <th scope="col">Body</th>*/}
            {/*        <th style={{width: "20%"}}>Action</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>{*/}
            {/*        lists1.map((list, index) => (*/}
            {/*            <tr key={index}>*/}
            {/*                <th>{index + 1}</th>*/}
            {/*                <td>{list.title}</td>*/}
            {/*                <td>{list.body}</td>*/}
            {/*                <td>*/}
            {/*                    <button className=" btn btn-secondary mx-2" onClick={() => editData(list._id)}>update*/}
            {/*                    </button>*/}
            {/*                    <button className="btn btn-danger" onClick={() => deleteData(list._id)}>delete</button>*/}
            {/*                </td>*/}
            {/*            </tr>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*    </tbody>*/}
            {/*</table>*/}
            <div style={{display:"flex",justifyContent:"center"}}>
            <Table style={{width:"50%",textAlign:"center"}} dataSource={lists1} columns={columns} />;
            </div></>
    )
}

export default Layout;