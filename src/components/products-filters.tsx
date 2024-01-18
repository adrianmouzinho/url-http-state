import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const productsFiltersSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
})

type ProductsFiltersData = z.infer<typeof productsFiltersSchema>

export function ProductsFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id')
  const name = searchParams.get('name')

  const { register, handleSubmit } = useForm<ProductsFiltersData>({
    resolver: zodResolver(productsFiltersSchema),
    values: {
      id: id ?? '',
      name: name ?? '',
    }
  })

  function handleFilterProducts({ id, name }: ProductsFiltersData) {
    setSearchParams(prev => {
      if (id) {
        prev.set('id', id)
      } else {
        prev.delete('id')
      }

      if (name) {
        prev.set('name', name)
      } else {
        prev.delete('name')
      }

      return prev
    })
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