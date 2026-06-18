"use client";
import { useRouter } from "next/navigation";
import { FormProduto } from "../_components/FormProduto";

export default function NovoProdutoPage() {
  const router = useRouter();

  return (
    <div className="p-9 max-w-xl mx-auto">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:underline mb-6 flex items-center gap-1"
      >
        Voltar
      </button>
      <h1 className="text-2xl font-semibold mb-6">Novo produto</h1>
      <FormProduto />
    </div>
  );
}
