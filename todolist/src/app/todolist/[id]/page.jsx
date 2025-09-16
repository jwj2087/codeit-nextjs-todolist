"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TodoListDetail = ({ title }) => {
  const router = useRouter();
  const { id } = useParams();
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`
        );
        const data = await response.json();

        console.log(data);
        setTodo(data);
      } catch (e) {
        console.error("error!!", e);
      }
    };

    fetchData(id);
  }, []);

  const handleTitleClick = () => {
    router.push(`/todolist`);
  };

  return (
    <div>
      <button onClick={handleTitleClick}>뒤로가기</button>
      <span>{todo.title}</span>
    </div>
  );
};

export default TodoListDetail;
