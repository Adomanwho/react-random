import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
   return (
      <div id='quote-box' className="min-h-40 min-w-40 col-4 bg-muted rounded-5">
         <Writing />
      </div>
   );
};

function Writing() {
   const [quoteApi, setQuoteApi] = useState('');
   const [authorApi, setAuthorApi] = useState('');
   const [changer, setChanger] = useState([]);

   useEffect(()=>{
      fetch('http://api.quotable.io/random')
      .then(resolve => resolve.json())
      .then(data => {
         setQuoteApi(data.content);
         setAuthorApi(data.author);
      })
      const x = document.getElementById('text');
      x.classList.toggle('fadeout');
      let time = setTimeout(() => {
         x.classList.toggle('fadein');
       }, 300)
       let time2 = setTimeout(() => {
          x.classList.remove('fadein');
          x.classList.remove('fadeout');
       }, 350)
       return()=>{
         clearTimeout(time);
         clearTimeout(time2);
       }
   }, [changer]);

   function handleClick(){
      setChanger((prev)=>[...prev, 'a'])
   };

   if(changer.length>=100000){
      setChanger([]);
   };

   return(
      <>
         <div>
            <header id="text" className="m-2"><h2 className='m-0 text-center text-secondary'>{quoteApi}</h2></header>
            <div className="text-end"><cite id="author" className="m-3">- {authorApi}</cite></div>
         </div>
         <br />
         <div className="container-fluid d-flex my-3 justify-content-between">
            <a id="tweet-quote" href="twitter.com/intent/tweet" target="_top"
            className="btn btn-outline-primary"><i className="bi bi-twitter">   Tweet</i></a>
            <button className="btn btn-outline-light" id="new-quote" onClick={handleClick}>New Quote</button>
         </div>
      </>
   );
};
