import './main.css'
import React from "react"
import {SketchPicker} from "react-color"
import images from "../components/images"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver';


export default function Main(){
    
    const [styles,setStyles] = React.useState([]);
    const [textColors, setTextColors] = React.useState([]);
    const [reRender,setReRender]= React.useState(false)
    const [inputArray, setInputArray] = React.useState([])
    const [memeData,setMemeData] = React.useState({   
        img:"",
        text:[]
    })
    const [templateNum,setTemplateNum] =  React.useState(0)
    const [selectedImage, setSelectedImage] = React.useState(null);


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

    // function downloadURI(uri, name) {
    //     var link = document.createElement("a");
    
    //     link.download = name;
    //     link.href = uri;
    //     document.body.appendChild(link);
    //     link.click();
    //     // clearDynamicLink(link); 
    // }
    
    function DownloadAsImage() {
            htmlToImage.toPng(document.getElementById("image"))
             .then(function (dataUrl) {
                saveAs(dataUrl, 'meme.png');
                console.log(dataUrl)
             });
    }



    const memeContent = inputArray.map((field) => {      
        return  <p
        id={"p"+field}
        style={{color: textColors[field],
        position:'absolute',
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
        
        </div>
            )
    })
    return( 
        <center>
        <main className="main">
        <div className="image-section">    
        <button type="button" className="image-change-button" onClick={()=>{setTemplateNum(templateNum>0?templateNum-1:images.length-1)}}><ArrowBackIosIcon/></button>
            <div className="meme-img" id="image" >
                <img src={selectedImage?URL.createObjectURL(selectedImage):images[templateNum]} alt="meme-image" color="white" className="image"></img>
            {memeContent}
            </div>
        <button type="button" className="image-change-button" onClick={()=>{setTemplateNum(templateNum<images.length-1?templateNum+1:0)}}><ArrowForwardIosIcon/></button>
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
                    </button><br/><br></br>
                    {!selectedImage &&   <input
                        style={{color:"white"}}
                        
                        type="file"
                        name="myImage"
                        className="myImage"
                        onChange={(event) => {
                        // console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                        }}
                    />}
                    {selectedImage&&<button type="button" name="remove" id="remove" className="remove-button" 
                    onClick={()=>{setSelectedImage(null)}}>
                        Remove Image
                    </button>}
                    <br/><br/>
                    {/* <button type="submit" name="save" id="save" className="button" >Save</button> */}
                    <button type="submit" name="download" id="download" className="button" 
                    onClick={()=>{DownloadAsImage()}}
                    >Download Your Template</button>
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