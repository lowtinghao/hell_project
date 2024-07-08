

import { useState, Component, useEffect } from "react";
import React from "react";


/**
 * Component for the Department input bar
 * the component consists of 
 *   -  a text input (dept code)  
 *   -  a submit button
 * @param {props} param0 
 *    - code (state dept code)
 *    - onCodeChange (state dept code update)
 *    - onSubmitClick (submitButton click event handler) 
 * @returns 
 */
function NewWorkshopBar({code, onCodeChange, onSubmitClick}) {
    return (
        <><div>
            Add Option
        </div><div>
                <input type="text" placeholder="New Workshop Type"
                    value={code}
                    onChange={(e) => { onCodeChange(e.target.value); } }>
                </input>
                <button onClick={onSubmitClick}> + </button>
            </div></>
    )
}

// TASK 1, complete the following component so that the dept list can be rendered.
/** 
 * Components for the Department list
 * @param {props} param0 
 *    - a list of depts (depts state)
 * @returns 
 */

function WorkshopList({workshops, onDeleteClick}) {
    let rows = [];
    for (let i in workshops) {
        //console.log(workshops[i].code);
        rows.push(
            <>
            <tr key={i}>
                <td>{[i]+ ': '}{workshops[i].code}</td>
                <td>
                    <button onClick={()=>onDeleteClick(workshops[i].code)}>Delete</button>
                </td>
            </tr>
            </>
        );
    }
    return (      
        //TODO: fix me  
        <div>
            <table>
            <thead>
                <tr><th>Workshop Types</th></tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
            </table>
        </div>
    );
}




const EditForm = () => {
    //code refer to the input typed into box
    const [code, setCode] = useState('');

    function handleSubmitClick() {
        submitNewWorkshop();
    }
    function handleDeleteClick(workshopcode){
        deleteWorkshopType(workshopcode);
    }


    const [workshops, setWorkshops] = useState([]);
    
    /**
     * triggered when the submit button is clicked.
     * submit a new dept by calling the API
     * then set the depts state, which will 
     * render the dept table
     */
    async function submitNewWorkshop() {
        const response = await fetch(`http://localhost:3000/workshop/submit`,
        {
            method: 'POST',
            body: `code=${code}`,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }              
        });
        const text = await response.text();
        const json = JSON.parse(text);
        setWorkshops(json);
    }

    async function deleteWorkshopType(workshopcode){
        const response = await fetch(`http://localhost:3000/workshop/delete`,
            {
                method: 'POST',
                body: `code=${workshopcode}`,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }     
        });
            const text = await response.text();
            const json = JSON.parse(text);
            setWorkshops(json);
    }

    /**
     * triggered when the component did mount.
     * submit to API to query all the depts
     * then set the depts state, which will 
     * render the dept table
     */
    async function initWorkshops() {
        const response = await fetch(`http://localhost:3000/workshop/all`);
        const text = await response.text();
        const json = JSON.parse(text);
        setWorkshops(json);
    }

    useEffect( () => {
        initWorkshops()
    }, []);



    return (
        <><h1>Edit Workshop Form Request</h1>
        <div>
            Comapany Name: <input type="text"></input>
        </div>
        <WorkshopList workshops={workshops} onDeleteClick={handleDeleteClick}/>
        <NewWorkshopBar code={code} onCodeChange={setCode} onSubmitClick={handleSubmitClick}/>
        </>
    );
}
 
export default EditForm;