"use client";
import { Input, Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick = async (event) => {
    setResult([]);
    setFetching(true);
    const response = await fetch("http://localhost:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textInput }),
    });

    const data = await response.json();
    setResult(data.movies);
    onOpen();
    setFetching(false);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-10 bg-black text-white backdrop">
        <div className="flex flex-col items-center p-6 text-center">
          <h1 className="font-bold text-9xl text-red-600 mb-4 animate-text font-detroit">CINEGEST</h1>
          <h1 className="font-bold text-6xl text-warning mb-4 animate-text font-detroit">MOVIE RECOMMENDATION</h1>
          <p className="font-medium text-xl text-gray-300 mb-8 font-busorama">Find movies tailored to your preferences using our advanced recommendation system.</p>
        </div>

        <div className="flex flex-col items-center justify-center px-10 w-full max-w-md">
          <Card className="w-full bg-warning my-4" radius="none">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center text-center">
              <h4 className="text-3xl font-detroit text-secondary">ENTER KEYWORD</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-4">
              <Input
                value={textInput}
                type="text"
                className="text-slate-50 font-busorama"
                radius="none"
                size="lg"
                variant="underlined"
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
              />

              {fetching ? (
                <Button
                  isDisabled
                  isLoading
                  color="secondary"
                  variant="solid"
                  radius="none"
                  size="lg"
                  className="mt-4 font-busorama"
                  onClick={handleClick}
                >
                  Crunching data
                </Button>
              ) : (
                <Button
                  color="secondary"
                  variant="solid"
                  radius="none"
                  size="lg"
                  className="mt-4 font-busorama"
                  onClick={handleClick}
                >
                  Get me my movies
                </Button>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="none"
        classNames={{
          body: "py-6",
          backdrop: "bg-secondary/50 backdrop-opacity-40",
          base: "border-black bg-gray-900 text-white",
          header: "border-b-[1px] border-gray-700",
          footer: "border-t-[1px] border-gray-700",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-4xl text-yellow-500 font-detroit">KEYWORD: {textInput}</ModalHeader>
              <ModalBody>
                <h1 className="my-2 font-detroit text-secondary text-2xl">Your Movies</h1>
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

      <style jsx global>{`
        .backdrop {
          background-image: url('/images/bg4.gif');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .animate-text {
          animation: fadeIn 2s ease-in-out infinite;
        }
        @keyframes fadeIn {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
