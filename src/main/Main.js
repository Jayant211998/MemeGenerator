import './main.css'
import React from "react"
import {SketchPicker} from "react-color"

export default function Main(){
    
    const [styles,setStyles] = React.useState([]);
    const [textColors, setTextColors] = React.useState([]);
    const [reRender,setReRender]= React.useState(false)
    const [inputArray, setInputArray] = React.useState([])
    const [memeData,setMemeData] = React.useState({   
        img:"https://static.langimg.com/thumb/msid-76057636,width-680,resizemode-3/navbharat-times.jpg",
        text:[]
    })
    function handelChange(event){
        const {name, value} = event.target
        setMemeData(prevMeme => {
            const newMeme = {...prevMeme}
            newMeme.text[name]=value;
            return newMeme;
        })
    }
    
    function addInputField(){
        setInputArray((prevArray) => {
            return [...prevArray,(prevArray.length)]
        })
        setTextColors((prevArray) => {
            return [...prevArray,'#00ff00']
        })
        setStyles((prevArray)=>{
            return [...prevArray,false]
        })
    }
    function changeFontFamily(field){
        const id="p"+field
        const font="font"+field
        document.getElementById(id).style.fontFamily=document.getElementById(font).value
        setReRender(!reRender)
    }
    function changeSize(field){
        const id="p"+field
        const font="size"+field
        document.getElementById(id).style.fontSize=document.getElementById(font).value+"px"
        setReRender(!reRender)
    }
    function changeColor(field,color){
            setTextColors((prev)=>{
            const colorArray = [...prev];
            colorArray[field]=color.hex
            return colorArray
        })
    }
    function styleField(field){
        setStyles(prev=> {
           const newstyle = [...prev]
            newstyle[field]=!prev[field]
            return newstyle
        })
    }    
    function setContent(event){
        
        const id = event.target.id
        const content = document.getElementById(id)
       
        content.onmousedown = function(event) {
        let shiftX = event.clientX - content.getBoundingClientRect().left;
        let shiftY = event.clientY - content.getBoundingClientRect().top;
        
        content.style.position = 'absolute';
        content.style.zIndex=1000
        
        document.body.append(content)
        function moveAt(pageX, pageY) {
            content.style.left = pageX - content.offsetWidth / 2 + 'px';
            content.style.top = pageY - content.offsetHeight / 2 + 'px';
          }
        // moveAt(event.pageX, event.pageY);
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
          }
        document.getElementById("image").addEventListener('mousemove', onMouseMove);
        document.getElementById("image").onclick = function() {
            document.getElementById("image").removeEventListener('mousemove', onMouseMove);
            document.getElementById("image").onclick = null;
              };        

        }  
        document.getElementById("image").ondragstart = function() {
        return false;
        };
        
    }
    const memeContent = inputArray.map((field) => {      
        return  <p
        id={"p"+field}
        style={{color: textColors[field],
        position:'absolute',
        // zIndex: 1000,
        }}
        onMouseDown = {(event)=>{setContent(event)}}
        >
            {memeData.text[field]}
        </p>
        })

    const inputText = inputArray.map(field => {
        return (
            <div key={field}>
                <input 
                    type='text' 
                    placeholder={'text'+field}  
                    name={field} 
                    id={field} 
                    className="input" 
                    onChange={handelChange}
                    value={memeData.text[field]}
                />  
            <button type="button" onClick={()=>{styleField(field)}}>Set Styles</button>
            {styles[field] &&<div className="style-block">
            <div className="style-fields" >
            <select id={"font"+field} className="style" onChange={()=>{changeFontFamily(field)}} >
            <option value="Arial" selected="selected"></option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Arial">Arial</option>
            <option value="fantasy">Fantasy</option>
            <option value="cursive">cursive</option>
            </select>
            <input type="number" id={"size"+field} className="style" onChange={()=>{changeSize(field)}} ></input>
            </div>
            <SketchPicker  id={"color"+field} color={textColors[field]} onChange={(color)=>{changeColor(field,color)}}/>
            </div>}          
            {/* <Titles field={field} textColors={textColors} memeData={memeData}></Titles> */}
        
        </div>
            )
    })
    return( 
        <center>
        <main className="main">
            <div className="meme-img" 
                    style={{
                        backgroundImage: "url(" + 'https://static.langimg.com/thumb/msid-76057636,width-680,resizemode-3/navbharat-times.jpg'+")",
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                        }}
                id="image"
            >
            {memeContent}
            </div>
            <div className="meme-content">
                <h1>Add Content</h1>
                <form className="forms">
                    {inputText}
                    <br></br>
                    <button 
                        type="button" 
                        name="add" 
                        id="add" 
                        className="button" 
                        onClick={addInputField}
                    >Add Text
                    </button><br/>
                    <input type='text' placeholder="Search" name='search' id='search' className="input"></input><br/>
                    <button type="submit" name="save" id="save" className="button" >Save</button>
                    <button type="submit" name="download" id="download" className="button">Download Your Image</button>
                    <div className='sm-handels'>
                        <button className="handel-button"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="facebook" className="handel"></img></button>
                        <button className="handel-button"><img src="https://parentzone.org.uk/sites/default/files/Instagram%20logo.jpg" alt="instagram" className="handel"></img></button>
                        <button className="handel-button"><img src="https://www.shareicon.net/data/128x128/2015/08/28/92444_whatsapp_512x512.png" alt="whatsapp" className="handel"></img></button>
                    </div>
                </form>
            </div>
        </main>
        </center>
    )
}