"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [todolist, setTodolist] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/todos`
        );
        const data = await response.json();

        setTodolist(data);
      } catch (e) {
        console.error("error!!", e);
      }
    };
    fetchData();
  }, []);

  const handleCompleteToggle = async (todoId) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`, {
        method: "PATCH",
        body: JSON.stringify({
          isCompleted: !todoId.isCompleted,
          // false-> true o , true->false x ??
        }),
      });

      setTodolist((prev) => {
        return prev.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              isCompleted: !todo.isCompleted,
            };
          } else {
            return todo;
          }
        });
      });
    } catch (e) {
      console.error("error!!", e);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`, {
        method: "DELETE",
      });

      setTodolist((prev) => {
        return prev.filter((todo) => {
          return todo.id !== todoId;
        });
      });
    } catch (e) {
      console.error("error!!", e);
    }
  };

  const handleTitleClick = (id) => {
    router.push(`/todolist/${id}`);
  }

  return (
    <>
      {todolist.map((todo) => (
        <div key={todo.id} className="flex gap-2 mb-4">
          <span className="cursor-pointer" onClick={() => handleTitleClick(todo.id)}>{todo.title}</span>
          <button
            className="border rounded bg-gray-100"
            onClick={() => handleCompleteToggle(todo.id)}
          >
            {todo.isCompleted === true ? "완료취소" : "완료"}
          </button>
          <button
            className="border rounded bg-gray-100"
            onClick={() => handleDelete(todo.id)}
          >
            삭제
          </button>
        </div>
      ))}
    </>
  );
};

export default TodoList;
