import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import DataDummy from "../data/dummy.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const dataDummy = DataDummy.messages.data;

  const [threads, setThreads] = useState({});
  const [messages, setMessages] = useState([]);

  async function createThread() {
    try {
      const response = await fetch("/api/threads/run", {
        method: "POST",
      });
      if (response.ok) {
        const newThread = await response.json();
        setThreads(newThread);
        localStorage.setItem(
          "threads",
          JSON.stringify(newThread)
        );
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }

  }

  const fetchData = async () => {
    const storedThreads = localStorage.getItem("threads");
    try {
      const response = await fetch(`/api/messages/run?threadId=${JSON.parse(storedThreads)?.id}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages.data);

      }
    } catch (error) {
      console.error(error);
    }
  };

  async function createMessage() {
    const storedThreads = localStorage.getItem("threads");
    if (!storedThreads) {
      alert('Please create new thread first');
    } else {
      if (formData.text === "") {
        return;
      } else {
        try {
          const response = await fetch("/api/messages/run", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              threadId: threads?.id,
              content: formData.text,
            }),
          });
          if (response.status === 200) {
            const newMessage = response.json();
            setTimeout(() => {
              fetchData();
            }, 3000);
            runAssistant(formData.text);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  const [formData, setFormData] = useState({
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  async function runAssistant(text) {
    try {
      const response = await fetch("/api/assistant/run", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          threadId: threads?.id,
          instructions: text,
        }),
      });
      if (response.ok) {
        const assistant = response.json();
        setTimeout(() => {
          fetchData();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }


  // Retrieve threads from localStorage
  useEffect(() => {
    const storedThreads = localStorage.getItem("threads");
    if (storedThreads) {
      setThreads(JSON.parse(storedThreads));
    }
  }, []);





  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
      >
        <img
          src={"/assets/images/logo_warna.png"}
          width={100}
          height={100}
          className="w-40"
          loading="eager"
          placeholder="blur"
          quality={100}
        />
        <div className="w-full bg-white rounded-lg shadow-md mt-10">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Chat</h2>
              <div className=" flex gap-2">
                <button className="bg-primary text-white p-2 text-xs rounded-lg hover:bg-[#91A9A3]" onClick={() => fetchData()}>
                  <p>Refresh</p>
                </button>
                <button className="bg-primary text-white p-2 text-xs rounded-lg hover:bg-[#91A9A3]" onClick={() => createThread()}>
                  <p>New Threds</p>
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              {messages.map((data, index) => (
                <div className={`px-5 py-2 ${data.role === "assistant" ? "bg-[#0000001f]" : "bg-primary text-white"}`} key={index}>
                  <p>{data.content[0]?.text.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none"
                placeholder="Type a message..."
                onChange={handleChange}
                name="text"
                value={formData.text}

              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2" onClick={() => createMessage()}>
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
