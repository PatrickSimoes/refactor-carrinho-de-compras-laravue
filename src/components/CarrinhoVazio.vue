<template>
  <div className="flex flex-col items-center items-center gap-4 text-zinc-500">
    <span
      class="material-symbols-outlined mr-2 text-zinc-400"
      style="font-size: 150px;"
    >
      shopping_cart_off
    </span>

    <div>
      <h2 className="text-3xl">
        Seu carrinho está vazio
      </h2>

      <p>
        Volte a página inicial para selecionar os produtos! 
      </p>
    </div>

    <a href="/">
      <button class="bg-green-500 text-white rounded-sm px-4 py-2">
        Ver produtos
      </button>
    </a>
  </div>
</template>
