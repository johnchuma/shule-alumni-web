import { Carousel, Container, Image } from "react-bootstrap";
import Heading from "./heading";

const AlumniCarousel = ({objectArray,height,fontSize}) => {
   
    return (  
        <div >
              <div className="d-none d-md-block" style={{ position:"relative" }}>
              <Carousel className="mt-5" nextLabel={false} nextIcon={false} indicatorLabels={false} indicators={false}>
     {
        objectArray.map((item)=>{
            return <Carousel.Item>
       
            <Image fluid style={{ width:"100%",objectFit:"cover",height:height??400 }} src={item.image}/>
         <div style={{ position:"absolute",top:0,left:0,right:0,backgroundColor:"#00000070",height:height??400 }}></div>
            
             <Carousel.Caption  >
                 <div className="d-flex justify-content-center align-items-center" style={{ width:"100%", height:height??400 }}>
                 <Heading fontSize={"4vw"} className={"mt-5 d-none d-md-block"} text={item.title}/>
               <div className="d-block d-md-none" style={{ fontWeight:600,fontSize:"8vw" }}>{item.title}</div>

                 </div>
             </Carousel.Caption>
           </Carousel.Item>
        })
     }
   </Carousel>
    </div>
       
              <div className="d-block d-md-none" style={{ position:"relative" }}>
              <Carousel className="mt-2" nextLabel={false} nextIcon={false} indicatorLabels={false} indicators={false}>
     {
        objectArray.map((item)=>{
            return <Carousel.Item>
       
            <Image fluid style={{ width:"100%",objectFit:"cover",height:200}} src={item.image}/>
         <div style={{ position:"absolute",top:0,left:0,right:0,backgroundColor:"#00000090",height:height??200}}></div>
            
             <Carousel.Caption  >
                 <div className="d-flex justify-content-center align-items-center mt-3" style={{ width:"100%", height:200}}>
                 <div className="d-block d-md-none" style={{ fontWeight:600,fontSize:fontSize??"5vw",marginTop:80 }} dangerouslySetInnerHTML={{ __html:item.title }} ></div>
               
                 {/* <Heading fontSize={"4vw"} className={"mt-5 d-none d-md-block"} text={item.title}/> */}
                 </div>
             </Carousel.Caption>
           </Carousel.Item>
        })
     }
     
   </Carousel>
              </div>
         
 
        </div>
       
    );
}
 
export default AlumniCarousel;