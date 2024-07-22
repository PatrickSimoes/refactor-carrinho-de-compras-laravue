<template>
  <div
    v-if="carrinhoStore.quantidadeTotal > 0" 
    class="flex flex-col gap-5 p-5"
  >
    <div 
      v-for="item in carrinhoStore.items" 
      :key="item.id" 
      class="flex items-center gap-5 bg-zinc-900 rounded-md overflow-hidden p-4"
    >
      <div class="relative w-24 h-24">
        <img
          :src="item.imagem"
          :alt="item.nome"
          class="object-cover w-full h-full"
        >
      </div>
      <div class="flex flex-col flex-1 text-zinc-400">
        <span class="text-lg font-bold">
          {{ item.nome }}
        </span>
        <span class="text-sm">
          {{ item.descricao }}
        </span>
        <div class="flex items-center gap-2 mt-2 text-lg font-bold">
          <span>
            R$ {{ formatCurrency(item.preco) }}
          </span>
          <span class="text-yellow-500">
            R$ {{ formatCurrency(item.preco * item.quantidade) }}
          </span>
        </div>
        <div class="flex gap-2 items-center mt-2">
          <button
            class="text-orange-500 hover:text-orange-700"
            @click="removeUmProduto(item)"
          >
            Remover
          </button>

          <span class="px-4 py-2 rounded-md bg-black text-zinc-400">
            {{ item.quantidade }}
          </span>

          <button
            class="text-green-500 hover:text-green-700"
            @click="adicionarProduto(item)"
          >
            Adicionar
          </button>
          <div class="flex-grow" />
          <button
            class="flex items-center text-red-500 hover:text-red-700"
            @click="removerProduto(item.id)"
          >
            <i class="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-between bg-zinc-900 rounded-md p-7">
      <div class="flex flex-col justify-between">
        <span class="text-zinc-500">Total</span>
        <span class="text-3xl font-bold text-yellow-500">R$ {{ formatCurrency(carrinhoStore.valorTotal) }}</span>
      </div>
      <button
        class="bg-red-600 px-4 py-2 rounded-md text-xl hover:bg-red-700"
        @click="removerTodosItens"
      >
        Remover Todos
      </button>
    </div>

    <button
      class="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
      @click="payForm"
    >
      Finalizar
    </button>
  </div>
  <div v-else>
    <CarrinhoVazio />
  </div>
</template>

<script setup>
import { useCarrinho } from '@/stores/carrinho'
import CarrinhoVazio from '@/components/CarrinhoVazio.vue'

const carrinhoStore = useCarrinho()

const adicionarProduto = (produto) => {
  carrinhoStore.adicionarProduto(produto)
}

const removeUmProduto = (produto) => {
  carrinhoStore.removeUmProduto(produto)
}

const removerProduto = (produtoId) => {
  carrinhoStore.removerProduto(produtoId)
}

const removerTodosItens = () => {
  carrinhoStore.limparCarrinho()
}

const payForm = () => {
  alert('Por enquanto é isso! em breve estarei integrando com o STRIPE para doações.');
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>