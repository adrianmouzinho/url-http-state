export interface Product {
  id: string
  name: string
  price: number
}

interface GetProductsFilters {
  id: string | null
  name: string | null
}

export async function getProducts({ id, name }: GetProductsFilters) {
  // Delay de 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000))

  let products = [
    { id: '817ceed6-f8f3-4336-8b83-526e6dbeec23', name: 'Camiseta', price: 43 },
    { id: '86454120-7938-41c4-b3e5-4bcf2d0cc79f', name: 'Tênis', price: 160 },
    { id: 'c6a65141-1e24-4e4f-ace1-5ca49dc4dc64', name: 'Bolsa', price: 120 },
    { id: 'c833c703-ba8c-430a-96f0-b45bb64edb2b', name: 'Relógio', price: 85 },
    { id: '22ece681-121a-4817-a49e-c8fafb709c9d', name: 'Celular', price: 1820 },
    { id: 'b2eb3906-641a-420b-9fd4-7f1c38977ffe', name: 'Notebook', price: 2100 },
    { id: '23face04-08a4-4c73-8e82-85d34a4c2826', name: 'Óculos de Sol', price: 56 },
    { id: 'dc45b362-27ec-47ca-ae73-1b8315410c63', name: 'Cadeira', price: 204 },
    { id: '531a20f9-9cf6-464a-bec2-b66a25272e37', name: 'Mochila', price: 250 },
    { id: '045bd6e3-0bbd-475b-a4eb-1fba10eb577c', name: 'Fone de Ouvido', price: 88 }
  ];

  if (id) {
    products = products.filter(product => product.id.toLowerCase().includes(id.toLowerCase()))
  }

  if (name) {
    products = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
  }

  return products
}

interface CreateProductRequest {
  name: string
  price: number
}

export async function createProduct({ name, price }: CreateProductRequest) {
  // Delay de 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    id: crypto.randomUUID(),
    name,
    price,
  }
}