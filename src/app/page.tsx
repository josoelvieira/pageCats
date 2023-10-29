"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { use, useState } from "react";

interface Cats {
  id: string;
  name: string;
  url: string;
  description: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
}

 
export default function Home() {
  const [search, setSearch] = useState<string>("");
  
  const { data, isLoading } = useQuery<Cats[]>({
    queryKey: ["Cats"],
    queryFn: () =>
      axios.get("https://api.thecatapi.com/v1/breeds").then((res) => res.data),
  });

  const raca = "beng"
  const { data:fotos} = useQuery<string>({
    queryKey: ["Fotos"],
    queryFn: () =>
      axios.get(`https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${raca}&api_key=REPLACE_ME`).then((res) => res.data),
  });
 

  const racas = data?.filter((raca) => raca.name.toLocaleLowerCase().includes(search))

  function geraDot(passo: number) {
    const dots = Array.from({ length: passo }, (_, index) => (
      <span key={index} className="w-3 h-3 m-1 bg-slate-800 rounded-full"></span>
    ));
  
    return dots;
  }
  if (isLoading || !data)
    return <p className="animate-ping text-center m-4"> Carregando...</p>;
  return (
    <>
    <header className="flex justify-between bg-slate-400 mb-4 p-2 text-black items-center">
      <h1 className=" text-4xl">Cats</h1>
        <div><label className="font-bold text-lg mx-4">Busca por racas:</label>
        <input 
        className="p-2"
        type="text" 
        value={search}
        onChange={(env) => setSearch(env.target.value)}
        /></div>
        </header>
    <main className=" w-full h-full">
      
      <ul className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 m-auto w-4/5">
        {racas?.map((repo) => (
          <li
            key={repo.id}
            className=" max-w-md rounded-lg bg-slate-400 p-4 text-black"
          >
            
            <h3 className=" text-lg my-4 font-bold border-b-4">{repo.name}</h3>
            {fotos?.map((foto) => <Image  className=" rounded-lg" key={foto.id} src={foto.url} width={400} height={300} alt=""/>)}
            <p>{repo.description}</p>

            <div className="grid columns-1 my-4 p-2">
              <div className="grid">
                <p className=" font-bold">Adaptability</p>
                <span className="flex">{geraDot(repo.adaptability)}</span>
              </div>
              <div className="grid">
                <p className=" font-bold">Affection level </p>
                <span className="flex">{geraDot(repo.affection_level)}</span>
              </div>
              <div className="grid">
                <p className=" font-bold">Child friendly</p>
                <span className="flex">{geraDot(repo.child_friendly)}</span>
              </div>
              <div className="grid">
                <p className=" font-bold">Dog friendly</p>
                <span className="flex">{geraDot(repo.dog_friendly)}</span>
              </div>
              <div className="grid">
                <p className=" font-bold">Energy level</p>
                <span className="flex">{geraDot(repo.energy_level)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
    <footer className=" text-center p-4 bg-slate-400 mt-4 text-black">
      Todos os diretos reservados
    </footer>
    </>
  );
}
