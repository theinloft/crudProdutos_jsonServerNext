import Link from "next/link";
import { Produto } from "@/types/produto";
import { BotaoExcluir } from "./_components/BotaoExcluir";

async function getProdutos(): Promise<Produto[]> {
  const res = await fetch("http://localhost:3001/produtos", {
    cache: "no-store", // sempre busca dados frescos (SSR)
  });
  return res.json();
}

export default async function ProdutosPage() {
  const produtos = await getProdutos();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <Link
          href="/produtos/createProduto"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Novo produto
        </Link>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="py-2">Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-3">{p.nome}</td>
              <td>R$ {p.preco.toFixed(2)}</td>
              <td>{p.estoque}</td>
              <td className="flex gap-2 py-3">
                <Link
                  href={`/produtos/${p.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <BotaoExcluir id={p.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
