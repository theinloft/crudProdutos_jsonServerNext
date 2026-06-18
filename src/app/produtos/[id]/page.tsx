import { Produto } from "@/types/produto";
import { FormProduto } from "../_components/FormProduto";

async function getProduto(id: string): Promise<Produto> {
  const res = await fetch(`http://localhost:3001/produtos/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function UpdateProdutoPage({
  params,
}: {
  params: { id: string };
}) {
  const produto = await getProduto(params.id);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Editar produto</h1>
      <FormProduto produto={produto} />
    </div>
  );
}
