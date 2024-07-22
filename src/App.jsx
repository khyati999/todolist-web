import React, { useEffect, useState } from "react";
import ToDoLists from "./TodoLists";
import axios from "axios";
const App=()=>{
    const [input, setData]=useState("");
    const [items, setItems]=useState([]);
    const [loader, setLoader]=useState(false);
    

    const dataEvent=(event)=>{       
            setData(event.target.value);
   };

   
    const AddData = async() => {
        
        try{
            setLoader(true);
            const { data, status }=await axios.post("http://localhost:8000/add/item", { data: input });
            setLoader(false);
            console.log(data, status);
            setData('');
            
        }
        
        catch(err){
            setLoader(false);
            console.log(err);
            if (err.response && err.response.status === 400) {
                alert("Data already exists");
            } else {
                alert("There was an error adding the item!");
            }

        }

    };
    
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:8000/add/list");
                setItems(response.data.data || []); 
            } catch (error) {
                console.error("There was an error fetching the items!", error);
            }
        };

        fetchItems();
    }, [loader]);
    
    const deleteItems = async(id) => {
       try
       {
            setLoader(true);
            const { data, status } = await axios.delete(`http://localhost:8000/add/item/${id}`);
            setLoader(false);
            
       }
       catch(error) {
                if (error.response && error.response.status === 400) {
                    alert("Can't delete data");
                }
                console.error("There was an error deleting the item!", error);
                setLoader(false);
            };
    };
   return(
    <>
        <div className="main_div">
            <div className="center_div">
                <br />
                <h1 className="head">ToDo List</h1>
                <br />
                <input type="text" placeholder="Add Items" value={input} onChange={dataEvent}/>

                <button onClick={AddData}> + </button>
                
                <ol>
                    {
                        items.map((itemval, index)=>{
                            return <ToDoLists 
                            key={index} 
                            id={itemval.id} 
                            text={itemval.data} 
                            onSelect={deleteItems}
                            />
                        })
                    } 
                </ol>
            </div>
        </div>
    </>
   );
};
export default App;
