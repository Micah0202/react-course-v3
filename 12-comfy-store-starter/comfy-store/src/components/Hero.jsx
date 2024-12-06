import { Link } from 'react-router-dom';

//below are the images 
import hero1 from '../assets/hero1.webp';
import hero2 from '../assets/hero2.webp';
import hero3 from '../assets/hero3.webp';
import hero4 from '../assets/hero4.webp';

const carouselImages = [hero1, hero2, hero3, hero4]; //giving the images names 

const Hero = () => {
  return (
    //when we get to 1024px we set up  a 2 column  layout
    <div className="grid lg:grid-cols-2 gap-24 items-center">
        {/*INFO COLUMN WITH THE LINK TO OUR PRODUCTS */}
        <div>
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">We are changing the way people shop</h1>
            <p className="mt-8 max-w-xl text-lg leading-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis a odit quo ab tenetur consequatur aliquid pariatur tempore adipisci sapiente.</p>
            <div className="mt-10">
                <Link to="/products" className="btn btn-primary">Our products</Link>
            </div>
        </div>
     
        {/*carousel dont display on small screen */}
        <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
             {carouselImages.map((image)=>{
                         return <div key={image} className="carousel-item">
                        <img src={image} className="rounded-box h-full w-80 object-cover" />
                              
                         </div>
             })}

        </div>
    </div>
  )
}
export default Hero