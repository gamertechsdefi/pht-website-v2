import Link from "next/link";
import Image from "next/image";

import image1 from "/public/images/1.jpg";
import image2 from "/public/images/2.jpg";
import image3 from "/public/images/3.jpg";
import image4 from "/public/images/4.jpg";
import image5 from "/public/images/5.jpg";
import image6 from "/public/images/6.jpg";
import image7 from "/public/images/7.jpg";
import image8 from "/public/images/8.jpg";
import image9 from "/public/images/9.jpg";
import image10 from "/public/images/10.jpg";
import image11 from "/public/images/11.jpg";
import image12 from "/public/images/12.jpg";
import image13 from "/public/images/13.jpg";
import image14 from "/public/images/14.jpeg";
import image15 from "/public/images/15.jpg";
import image16 from "/public/images/16.jpg";
import image17 from "/public/images/17.jpg";
import image18 from "/public/images/18.jpg";
import image19 from "/public/images/19.jpeg";
import image20 from "/public/images/20.jpeg";
import image21 from "/public/images/21.jpeg";
import image22 from "/public/images/22.jpeg";
import image23 from "/public/images/23.jpeg";
import { PictureHolder } from "@/components/PictureHolders";


export default function BrandAssetsPage() {
    return (
        <div className="">
            <main className="flex flex-col px-8 py-8 md:px-16 md:py-16">
                <h1 className="text-4xl pb-4 font-bold text-orange-500">Memes Collection</h1>
                <p className="pb-4 text-sm">Push the goal to the world through our countless set of memes</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* <Image src={image1} width={60} height={60} /> */}
                    {pictures.map((item, index) => (
                        <PictureHolder
                            key={item.id}
                            imageholder={item.imageholder}
                            imagealt={item.imagealt}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

const pictures = [
    {
        id: 1,  
        imageholder: "/images/1.jpg",
        imagealt: "meme alt 1",
    },
    {
        id: 2,
        imageholder: "/images/2.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 3,
        imageholder: "/images/3.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 4,
        imageholder: "/images/4.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 5,
        imageholder: "/images/5.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 6,
        imageholder: "/images/6.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 7,
        imageholder: "/images/7.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 8,
        imageholder: "/images/8.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 9,
        imageholder: "/images/9.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 10,
        imageholder: "/images/10.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 11,
        imageholder: "/images/11.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 12,
        imageholder: "/images/12.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 13,
        imageholder: "/images/13.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 14,
        imageholder: "/images/14.jpeg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 15,
        imageholder: "/images/15.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 16,
        imageholder: "/images/16.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 17,
        imageholder: "/images/17.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 18,
        imageholder: "/images/18.jpg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 19,
        imageholder: "/images/19.jpeg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 20,
        imageholder: "/images/20.jpeg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 21,
        imageholder: "/images/21.jpeg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 22,
        imageholder: "/images/22.jpeg", 
        imagealt: "meme alt 2",  
    },
    {
        id: 23,
        imageholder: "/images/23.jpeg", 
        imagealt: "meme alt 2",  
    },
];