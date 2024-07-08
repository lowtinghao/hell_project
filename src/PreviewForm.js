import { useState, Component, useEffect } from "react";
import React from "react";

/**
 * Component for the Staff input bar
 * the component consists of 
 *   -  a text box (name of the staff)
 *   -  a dropdown (dept code of the staff)  
 *   -  a submit button
 * @param {props} param0 
 *    - name (state name)
 *    - code (state dept code)
 *    - depts (state the list of all depts)
 *    - onNameChange (state name update)
 *    - onCodeChange (state dept code update)
 *    - onSubmitClick (submitButton click event handler) 
 * @returns 
 */
function NewClientBar({name, code, workshops, onNameChange, onCodeChange, onSubmitClick}) {
    let rows = [];
    for (let i in workshops) {
        if (workshops[i].code === code) {
            rows.push(<option value={workshops[i].code} selected>{workshops[i].code}</option>);
        } else {
            rows.push(<option value={workshops[i].code}>{workshops[i].code}</option>);
        }
    }
    return (
        <><div>
            Company Name: <input type="text" placeholder="name"
                value={name}
                onChange={(e) => { onNameChange(e.target.value); } }>
            </input>
        </div><div>
                Workshop Type: <select onChange={(e) => { onCodeChange(e.target.value); } }>
                    {rows}
                </select>
                
            </div>
            <div>
                <button onClick={onSubmitClick}> Submit </button>
            </div>
            </>
    )
}







const PreviewForm = () => {

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [clients, setClients] = useState([]);
    const [workshops, setWorkshops] = useState([]);
    function handleSubmitClick() {
        submitNewClient();
    }

    /**
     * triggered when the submit button is clicked.
     * submit a new staff by calling the API
     * then set the staffs state, which will 
     * render the staff table
     */
    async function submitNewClient() {
        const response = await fetch(`http://localhost:3000/client/submit`,
        {
            method: 'POST',
            body: `name=${name}&code=${code}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }              
        });
        const text = await response.text();
        const json = JSON.parse(text);
        setClients(json);
    }
    useEffect( () => {
        initClients(); 
    }, []);

    /**
     * triggered when the component did mount.
     * submit to API to query all the staffs
     * then set the staffs state, which will 
     * render the staff table
     */
    async function initClients() {
        const response = await fetch(`http://localhost:3000/client/all`);
        const text = await response.text();
        const json = JSON.parse(text);
        setClients(json);
    }

    // Task 2, complete the following so that the list of dept codes will loaded
    // when the component is mounted.
    /**
     * triggered when the component did mount.
     * submit to API to query all the depts
     * then set the depts state, which will
     * render the dropdown list of dept codes.
     */
    async function initWorkshops() {
        const response = await fetch(`http://localhost:3000/workshop/all`);
        const text = await response.text();
        const json = JSON.parse(text);
        setWorkshops(json);
    }


    useEffect( () => {
        // TODO: fixme:
        initWorkshops()
    }, []);

    return (
        <div>
            <NewClientBar name={name} code={code} workshops={workshops} onCodeChange={setCode} onNameChange={setName} onSubmitClick={handleSubmitClick}/>

        </div>
    );
}
 
export default PreviewForm ;