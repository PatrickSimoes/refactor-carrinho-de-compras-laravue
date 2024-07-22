import { defineStore } from 'pinia';

export const useCarrinho = defineStore('carrinho', {
  state: () => {
    // Carregar dados do localStorage
    const savedCarrinho = localStorage.getItem('carrinho');
    if (savedCarrinho) {
      return JSON.parse(savedCarrinho);
    }

    // Retornar estado inicial se não houver dados salvos
    return {
      quantidadeTotal: 0,
      items: []
    };
  },

  actions: {
    adicionarProduto(produto) {
      const itemExistente = this.items.find(item => item.id === produto.id);
      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        this.items.push({ ...produto, quantidade: 1 });
      }
      this.quantidadeTotal += 1;
      this.salvarNoLocalStorage();
    },

    removeUmProduto(produto) {
      const itemExistente = this.items.find(item => item.id === produto.id);
      if (itemExistente) {
        if (itemExistente.quantidade > 1) {
          // Se a quantidade for maior que 1, reduz a quantidade
          itemExistente.quantidade -= 1;
          this.quantidadeTotal -= 1;
        } else {
          // Caso contrário, remove o item do carrinho
          this.quantidadeTotal -= itemExistente.quantidade;
          this.items = this.items.filter(item => item.id !== produto.id);
        }
        this.salvarNoLocalStorage();
      }
    }, 

    removerProduto(produtoId) {
      const itemIndex = this.items.findIndex(item => item.id === produtoId);
      if (itemIndex !== -1) {
        const item = this.items[itemIndex];
        this.quantidadeTotal -= item.quantidade;
        this.items.splice(itemIndex, 1);
        this.salvarNoLocalStorage();
      }
    },

    limparCarrinho() {
      this.quantidadeTotal = 0;
      this.items = [];
      this.salvarNoLocalStorage();
    },

    salvarNoLocalStorage() {
      localStorage.setItem('carrinho', JSON.stringify({
        quantidadeTotal: this.quantidadeTotal,
        items: this.items
      }));
    }
  },

  getters: {
    valorTotal(state) {
      return state.items.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    }
  }
});