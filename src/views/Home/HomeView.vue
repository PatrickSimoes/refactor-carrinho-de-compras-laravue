<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
    <div 
      v-for="produto in itensProdutos" 
      :key="produto.id" 
      class="flex flex-col w-72 bg-zinc-900 mx-auto"
    >
      <div class="relative w-72 h-52">
        <img
          :src="produto.imagem"
          :alt="produto.nome"
          class="object-cover w-full h-full"
        >
      </div>
      <div class="flex-1 flex flex-col gap-4 p-5">
        <h2 class="text-xl font-bold text-zinc-400">
          {{ produto.nome }}
        </h2>
        <p class="flex-1 text-sm text-zinc-400">
          {{ produto.descricao }}
        </p>
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold mt-2 text-zinc-400">
            {{ formatCurrency(produto.preco) }}
          </span>
          <button
            class="border rounded-full px-5 py-1 text-sm text-zinc-400 hover:text-yellow-500"
            @click="adicionarAoCarrinho(produto)"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import produtos from '@/data/produtos.js'
import { useCarrinho } from '@/stores/carrinho'

const itensProdutos = produtos
const carrinhoStore = useCarrinho()

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const adicionarAoCarrinho = (produto) => {
  carrinhoStore.adicionarProduto(produto)
}
</script>