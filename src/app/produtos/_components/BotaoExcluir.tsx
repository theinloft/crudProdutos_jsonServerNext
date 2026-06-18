"use client";
import { useRouter } from "next/navigation";

export function BotaoExcluir({ id }: { id: string }) {
  const router = useRouter();

  async function excluir() {
    if (!confirm("Excluir produto?")) return;
    await fetch(`http://localhost:3001/produtos/${id}`, { method: "DELETE" });
    router.refresh(); // revalida a página sem navegar
  }

  return (
    <button onClick={excluir} className="text-red-500 hover:underline">
      Excluir
    </button>
  );
}
