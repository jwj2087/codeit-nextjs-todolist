import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between">
      <Link href="/">Home</Link>
      <div className="flex gap-4">
        <Link href="todolist">todolist</Link>
        <Link href="newTodo">new-todo</Link>
      </div>  
    </div>
  );
}
