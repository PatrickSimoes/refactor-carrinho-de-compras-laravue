<template>
  <header class="fixed top-0 left-0 w-full bg-zinc-800 h-20 px-10 z-50">
    <div class="flex justify-between items-center h-full">
      <div>
        <button
          class="flex flex-col items-center text-zinc-400"
          @click="navigateTo('/')"
        >
          <span class="material-icons text-zinc-400">storefront</span>
          CompraKi
        </button>
      </div>

      <div class="flex relative">
        <button @click="navigateTo('/carrinho')">
          <span class="material-icons mr-2 text-zinc-400">shopping_cart</span>
        </button>
        <div
          class="absolute -top-3 -right-2 w-6 h-6 bg-red-500 rounded-full flex justify-center items-center text-xs"
        >
          {{ carrinhoStore.quantidadeTotal }}
        </div>
      </div>
    </div>
  </header>

  <main class="pt-20 flex flex-col min-h-screen w-[1200px] mx-auto bg-zinc-900">
    <RouterView />
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCarrinho } from '@/stores/carrinho.js';

const router = useRouter()
const carrinhoStore = useCarrinho();

const navigateTo = (path) => {
  router.push(path)
}
</script>