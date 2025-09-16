"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const newTodo = () => {
  const [todo, setTodo] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        method: "POST",
        body: JSON.stringify({
          title: todo,
          isCompleted: false,
          createdAt: new Date().toISOString(),
        }),
      });

      alert("투두 리스트가 추가되었습니다.");

      router.push("/todolist");

    } catch (error) {
      console.error("error!!", error);
    }

  }

  const handleChangeInput = (e) => {
    setTodo(e.target.value);
  }

  return <form onSubmit={handleSubmit}>
    <input type="text" className="border" value={todo} onChange={handleChangeInput}/>
    <button className="border rounded bg-gray-100">등록</button>
  </form>
}

export default newTodo;