
export default function ProgressPar({progress}){

const colors = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 206, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(255, 159, 64)",
  "rgb(201, 203, 207)",
  "rgb(255, 99, 71)",
  "rgb(144, 238, 144)",
  "rgb(173, 216, 230)"
];

   const randomColor = colors[Math.floor(Math.random()*colors.length)];
    return(
       <div className="outer-bar">
         <div
          className="inner-bar"
           style={{ width: `${progress}%` , backgroundColor: randomColor}}
          >

         </div>
       </div>
    )
}