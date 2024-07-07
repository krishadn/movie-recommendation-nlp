"use client"
import {Input, Card, CardHeader, CardBody, Button} from "@nextui-org/react";
import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

export default function Home() {
  const [textInput, setTextInput] = useState("")
  const [fetching, setFetching] = useState(false)
  const [result, setResult] = useState()
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleClick = async (event) => {
    setResult()
    setFetching(true)
    const response = await fetch('http://localhost:5000/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: textInput})
    })

    const data = await response.json()
    setResult(data.movies)
    onOpen()
    setFetching(false)
  }


  return (
    <>
    <div className="z-0 flex min-h-screen flex-col items-start justify-start p-10">
      <div className="flex flex-col items-start p-6">
        <h1 className="font-detroit font-bold text-8xl text-primary [text-shadow:_0px_6px_0_var(--tw-shadow-color)] shadow-secondary mb-4">MOVIE</h1>
        <h1 className="font-detroit font-bold text-8xl text-primary [text-shadow:_0px_6px_0_var(--tw-shadow-color)] shadow-secondary mb-4">RECOMMENDATION</h1>
      </div>



      <div className="flex flex-row items-center justify-stretch px-10 z-0">

        <Card className="w-96 bg-primary my-4" radius="none">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="text-4xl font-detroit">ENTER KEYWORD</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
          <Input
            value={textInput}
            type="text"
            className="font-busorama"
            radius="none"
            size="lg"
            variant="underlined"
            onChange={(e) => {setTextInput(e.target.value)}}
          />

          {fetching ? (<Button isDisabled isLoading color="warning" variant="solid" radius="none" size="lg" className="mt-2 font-busorama" onClick={handleClick}>
            Crunching data
          </Button>)
          :(<Button color="warning" variant="solid" radius="none" size="lg" className="mt-2 font-busorama" onClick={handleClick}>
            I'm kinda curious about that myself...
          </Button>)}
            
          </CardBody>
        </Card>
      
      </div>

      <div className="flex flex-col items-start justify-end px-10">
            <h2 className="font-busorama font-bold text-7xl text-primary">MADE USING</h2>
            <h2 className="font-busorama font-bold text-7xl text-primary">NATURAL LANGUAGE PROCESSING</h2>
      </div>
      

    </div>

    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} radius="none" classNames={{
          body: "py-6",
          backdrop: "bg-secondary/50 backdrop-opacity-40",
          base: "border-black bg-secondary dark:bg-secondary text-[#a8b0d3]",
          header: "border-b-[1px] border-black",
          footer: "border-t-[1px] border-black",
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-detroit text-4xl text-warning">YOUR MOVIES</ModalHeader>
              <ModalBody>
              <ul className="font-busorama text-warning-300">
                {result.map((movie) => (         
                  <li key={movie}>{movie}</li>
                ))}  

              </ul>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>


    </>
  );
}
