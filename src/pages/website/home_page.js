import { Card, Carousel, Col, Container, Image, Row, Stack } from "react-bootstrap";
import Heading from "../../general_widgets/heading";
import Paragraph from "../../general_widgets/paragraph";
import CustomButton from "../../general_widgets/button";
import { mutedBlack, primaryColor } from "../../utils/colors";
import { BsCheck2Circle, BsOption, BsQuestion, BsQuote } from "react-icons/bs";
import Small from "../../general_widgets/small";
import OutlinedButton from "../../general_widgets/outlined_button";
import { useNavigate } from "react-router-dom";
import AlumniCarousel from "../../general_widgets/carousel";

const HomePage = () => {
    const navigate = useNavigate()
    const  heroItems = [{
        image:"https://www.un.org/africarenewal/sites/www.un.org.africarenewal/files/styles/ar_main_story_big_picture/public/00182530.jpg?itok=ghwF9AN-",
        title:"Service, Integrity, Community, Education"
    },
    {
        image:"https://img.freepik.com/premium-photo/group-young-black-african-college-students-reading-books-studying-laptop-preparing-exam-working-group-project_505521-500.jpg",
        title:"Service, Integrity, Community, Education"
    }];
    return ( <div>
        <div className={"d-block d-md-none"}>
        <AlumniCarousel fontSize={"7vw"} height={400}  objectArray={heroItems}/>

        </div>

        <Container>
        <div className="d-block d-md-none">
              
              <Paragraph className={"my-4 text-center"} text={"Shule alumni is a network of graduates from different educational institutions, such as a university or schools, who stay connected with each other and with the institution they graduated from"}/>
               <Stack className="mt-4 d-flex justify-content-center" direction="horizontal">
                  <CustomButton className={"py-2 px-4 me-3"} onClick={()=>navigate("/register")} text={"JOIN NOW"}/>
               </Stack>
              </div>
        <Row className="my-4 d-flex align-items-center">
            <Col md="6">
                <div className="d-none d-md-block">
                <Heading fontSize={"4vw"} text={"Service, Integrity, Community, <br/>Education"}/>
                <Paragraph className={"my-4"} text={"Shule alumni is a network of graduates from different educational institutions, such as a university or schools, who stay connected with each other and with the institution they graduated from"}/>
                 <Stack className="mt-4" direction="horizontal">
                    <CustomButton className={"py-2 px-4 me-3"} onClick={()=>navigate("/register")} text={"JOIN NOW"}/>
                    <OutlinedButton textColor={primaryColor} onClick={()=>navigate('/about-us')} className={"py-1 px-4 d-none d-md-block"} text={"LEARN MORE"}/>
                 </Stack>
                </div>
               
            </Col>
            
            <Col md="6 ">
                <Row>
                    <Col md={{ span:10,offset:1 }}>
                    <div  className="p-1 d-none d-md-block" style={{ overflow:'hidden',  borderRadius:500,borderColor:primaryColor,borderStyle:"solid",borderWidth:4 }}>
                <Carousel className="" nextLabel={false} nextIcon={false} indicatorLabels={false} indicators={false}>
                    {
                        [
                        "https://www.udsm.ac.tz//upload/galleryphoto/20220712_095509_758_.jpg",
                            "https://cse.udsm.ac.tz/storage/eventsImages/Aplication.jpg",
                    ].map((item)=>{
                            return <Carousel.Item>
                            <Image fluid style={{ height:"90vh",borderRadius:500,objectFit:"cover" }}  src={item}/>
                        </Carousel.Item>
                        })
                    }
                </Carousel>
                </div>
                    </Col>
                </Row>
               
            </Col>
        </Row>
        </Container>
        <div className="py-5" style={{ backgroundColor:primaryColor }}>
            <Container>
                <Row className="d-flex align-items-center" >
                <Col md="6">
                <Image className="py-3" fluid src="https://live.staticflickr.com/3700/12368841324_55067491b0_b.jpg"/>
                        </Col>
                        <Col md="6">
                        <Heading fontSize={"3.5vw"} className={""} color={"white"} text={"Networking And Benchmarking With Other Alumni Organisations"}/>
                        <Paragraph color={"white"} className={"my-4"} text={"Use learnings from research to develop a digital solution that will be leveraged to provide a transparent and efficient platform with which the alumni community can engage with schools and each other."}/>
                         <OutlinedButton className={"px-4 py-2 text-white"} color={"white"}   text={"Learn more"}/>
                    </Col>
                    <Image className="mt-5 d-none d-md-block"style={{ height:300,objectFit:"cover" }} src="https://www.brookings.edu/wp-content/uploads/2018/08/2018.08.02_metro_perry_STEM-college-graduates-photo.jpg"/>
                </Row>
            </Container>
            
        </div>
       <Container>
        <div className="py-5">
           <Row>
            <Col md={{ span:10,offset:1 }}>
            <Heading fontSize={"3vw"} className={"text-center"} text={"What we do ?"}/>
        <Paragraph className={"text-center py-4"} text={"We aim to use digital innovation to bring alumni community to engage with their schools"}/>
        <Row>
            {["Networking and benchmarking with other alumni organisations",
            "Opportunity to pool finances for Community activities through the Alumni Endowment Fund",
            "Establishing Alumni Organisations in Public Primary and Secondary Learning Institutions",
            "Partnership and engagement with respective Government ministries and agencies to address education-related policies",
            "Training for alumni leadership and advocacy",
            "Build and strengthen the operational and governance capacity of alumni associations"
            ].map((item)=>{
               return <Col md={6}><Card className="my-2 shadow">
                     <Card.Body className="py-3 px-2">
                        <Stack direction="horizontal">
                            <div style={{  }}>
                            <BsCheck2Circle className="me-3"  size={30} color={primaryColor}/>

                            </div>
                        <Paragraph text={item}/>
                        </Stack>
                       
                     </Card.Body>
                    </Card></Col>

            })}
            
      
            
            
        </Row>
            </Col>
           </Row>
        </div>
        <div className="d-flex justify-content-center">
        <CustomButton className={"text-center px-5 py-2"} text={"Join us"}/>

        </div>
           
       </Container>
       <div className="bg-dark mt-5 py-5">
        <Container>
            <Row className="d-flex align-items-center">
                <Col md="6">
                    <Image className="my-4" fluid src="https://img.freepik.com/free-photo/group-five-african-college-students-spending-time-together-campus-university-yard-black-afro-friends-studying-education-theme_627829-6007.jpg?w=2000"/>
                </Col>
                <Col md="6 text-center ">
                    <Heading color="white" className={"px-3"} text={"WHY DONATE TO SHULE ALUMNI ?"}/>
                    <Paragraph className={"py-4"} color={"white"} text={"Each year, alumni, students, parents, and friends choose to support Shule Alumni. Their gifts fund research, student assistance, travel to academic conferences, and so much more—everything from software to softballs."}/>
                    <Stack direction="horizontal" className="d-flex justify-content-center">
                    <CustomButton fontSize={15} className={"text-center py-2 px-5"}  onClick={()=>{
            window.open("https://flutterwave.com/pay/shulealumni","_blank")
           }} text={"Donate now"}/>
           
                    </Stack>
                   
                </Col>

            </Row>
        </Container>
       </div>
       <Container className="py-5">
        <Heading className={"text-center mb-5"}  fontSize={"3vw"} text={"Community Testimonial"}/>
            <Row>
                {[{description:"I can confidently say that my time at Kibaha Secondary School was the most enriching period of my educational journey. The exceptional faculty and staff went above and beyond to nurture our talents and instill a passion for learning. The range of extracurricular activities and clubs offered at the school allowed me to explore my interests and develop leadership skills",
                    member:"Martin laurent",
                    image:"https://as1.ftcdn.net/v2/jpg/03/91/34/72/1000_F_391347204_XaDg0S7PtbzJRoeow3yWO1vK4pnqBVQY.jpg"
            },
            {description:"Kibaha School provided me with an exceptional educational experience that has shaped my future in remarkable ways. The dedicated teachers and staff created a nurturing environment where I felt encouraged to explore my interests and push my boundaries. The school's emphasis on holistic development, including academic excellence and character building",
                    member:"David Mwakalebela",
                    image:"https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt5474ca13c6a41b56/60da719cf1ff900f4d3b55f2/c1940cf7ee384ac3b102cb1c37c6e4f71b548312.jpg?auto=webp&format=pjpg&width=3840&quality=60"
            } 
            ].map((item)=>
            <Col md="6">
               <Card className="mb-2">
                <Card.Body>
                    <BsQuote size={40} color={mutedBlack}/>
                    <Paragraph text={item.description}/>
                    <Stack direction="horizontal" className="mt-4">
                        <Image src={item.image} roundedCircle style={{ height:60,width:60,objectFit:"cover" }}/>
                        <div className="ms-2">
                            <Paragraph text={item.member}/>
                            <Small text={"Former student"}/>
                        </div>
                    </Stack>
                </Card.Body>
            </Card>
            </Col>
            )}
                

            </Row>
            <div className="text-center">
            <Heading fontSize={"3vw"} className={"mt-5 "} text={"Integrated Schools"}/>
            <Paragraph className={"my-4"} text={"The common goal of this system is to create a community of individuals who share common experiences and interests, and who can support each other both personally and professionally. Our systems play an important role in building a sense of community and fostering lifelong connections between graduates and their educational institutions"}/>
         
            </div>
           
          <Row>
          {
 [{image:"https://kibahasec.sc.tz/wp-content/uploads/2020/08/20200131_084631-1024x768.jpg"},
 {image:"https://images.squarespace-cdn.com/content/v1/5838b7e2be6594d45ac5bab6/a9907e31-f8a4-4821-9d4b-25e43b63c1c2/50f8970a-cd1f-454e-8493-4061829a9f8d.jpg?format=1000w"},
 {image:"/ikizu high school.jpg"},
 {image:"/musoma technical image.jpg"},
 {image:"/MINAKI.jpg"},
 {image:"https://pbs.twimg.com/media/FjCMSrWXEAI84D_.jpg:large"}
].map((item)=>{
    return <Col md={4}>
        <Image fluid src={item.image} className="mb-5" style={{ height:250,width:"100%", objectFit:"cover" }}></Image>
    </Col>
})
            }
          </Row>
      
           
        </Container>
    </div> );
}
 
export default HomePage;