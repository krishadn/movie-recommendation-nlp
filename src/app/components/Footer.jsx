import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer fixed bottom-0 left-0 w-full items-center bg-transparent px-10">
        <div className="flex flex-row items-end justify-end">
          
            <Image src={'/images/uma.gif'}
                height={300}
                width={300}
                alt={`Uma Thurman in Pulp Fiction`}
                unoptimized={true} 
            />
        </div>
    </footer>
  );
}
