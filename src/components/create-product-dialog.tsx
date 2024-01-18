import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Product, createProduct } from '@/data/products';

const createProductSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number(),
})

type CreateProductData = z.infer<typeof createProductSchema>

export function CreateProductDialog() {
  const queryClient = useQueryClient()

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess({ id, name, price }) {
      queryClient.setQueryData<Product[]>(['products', id, name], data => {
        if (!data) {
          return
        }

        return [...data, {
          id,
          name,
          price,
        }]
      })
    },
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateProductData>({
    resolver: zodResolver(createProductSchema)
  })

  async function handleCreateProduct({ name, price }: CreateProductData) {
    try {
      await createProductFn({ name, price })

      reset()

      alert('Produto cadastrado com sucesso!')
    } catch (error) {
      alert('Erro ao cadastrar produto.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo produto</DialogTitle>
        <DialogDescription>Criar novo produto no sistema</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-6">
        <div className="grid grid-cols-4 gap-2 items-center text-right">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" className="col-span-3" {...register('name')} />
        </div>

        <div className="grid grid-cols-4 gap-2 items-center text-right">
          <Label htmlFor="price">Preço</Label>
          <Input id="price" className="col-span-3" {...register('price')} />
        </div>

        {(errors.name || errors.price) && (
          <div className="grid grid-cols-4 gap-2 revers">
            <span />
            <span className="col-span-3 w-full ml-auto text-sm text-red-500">Nome ou preço do produto estão inválidos</span>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}