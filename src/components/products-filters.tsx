import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const productsFiltersSchema = z.object({
  id: z.string(),
  name: z.string(),
})

type ProductsFiltersData = z.infer<typeof productsFiltersSchema>

export function ProductsFilters() {
  const { register, handleSubmit } = useForm<ProductsFiltersData>({
    resolver: zodResolver(productsFiltersSchema)
  })

  function handleFilterProducts(data: ProductsFiltersData) {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFilterProducts)} className="flex items-center gap-2">
      <Input placeholder="ID do produto" {...register('id')} />
      <Input placeholder="Nome do produto" {...register('name')} />
      <Button type="submit" variant="outline">
        <Search className="size-4 mr-2" />
        Filtrar resultados
      </Button>
    </form>
  )
}