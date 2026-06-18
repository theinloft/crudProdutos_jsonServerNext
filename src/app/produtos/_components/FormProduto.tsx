"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Produto } from "@/types/produto";

type Props = {
  produto?: Produto; // undefined = criação, preenchido = edição
};

export function FormProduto({ produto }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: produto?.nome ?? "",
    preco: produto?.preco ?? 0,
    estoque: produto?.estoque ?? 0,
  });

  async function salvar() {
    const url = produto
      ? `http://localhost:3001/produtos/${produto.id}`
      : "http://localhost:3001/produtos";
    const method = produto ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/produtos");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <label className="flex flex-col gap-1 text-sm">
        Nome
        <input
          value={form.nome}
          onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
          className="border rounded-lg px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Preço
        <input
          type="text"
          inputMode="decimal"
          placeholder="0,00"
          value={form.preco === 0 ? "" : String(form.preco).replace(".", ",")}
          onChange={(e) => {
            const valor = e.target.value.replace(",", ".");
            setForm((f) => ({ ...f, preco: Number(valor) || 0 }));
          }}
          className="border rounded-lg px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Estoque
        <input
          type="number"
          value={form.estoque}
          onChange={(e) =>
            setForm((f) => ({ ...f, estoque: Number(e.target.value) }))
          }
          className="border rounded-lg px-3 py-2"
        />
      </label>

      <button
        onClick={salvar}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg self-start"
      >
        {produto ? "Salvar alterações" : "Criar produto"}
      </button>
    </div>
  );
}
