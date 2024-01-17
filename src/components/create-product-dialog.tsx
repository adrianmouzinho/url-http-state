import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const createProductSchema = z.object({
  name: z.string().min(5, 'O nome precisa de no mínimo 5 caracteres'),
  price: z.coerce.number(),
})

type CreateProductData = z.infer<typeof createProductSchema>

export function CreateProductDialog() {
  const { register, handleSubmit } = useForm<CreateProductData>({
    resolver: zodResolver(createProductSchema)
  })

  function handleCreateProduct(data: CreateProductData) {
    console.log(data)
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