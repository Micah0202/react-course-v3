import  heroImg from './assets/hero.svg';
const Hero = () => {
  return (
   <section className="hero">
       <div className="hero-center">
         <div className="hero-title">
            <h1>Contentful cms</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio numquam tenetur obcaecati maiores consequatur doloremque voluptatibus quod at necessitatibus? Ut accusantium deleniti repellat, culpa reiciendis nostrum alias accusamus corrupti iusto?
            </p>
         </div>
         <div className="img-container">
            <img src={heroImg} alt="woman and the browser"  className="img"/>
         </div>
       </div>
   </section>
  )
}
export default Hero