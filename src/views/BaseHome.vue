<template>
  <v-app>
    <v-container>
      <h1>Produtos</h1>
      <v-row>
        <v-col
          v-for="(item, index) in hardwareItems"
          :key="index"
        >
          <v-card variant="outlined">
            <v-card-title>{{ item.nome }}</v-card-title>
            <v-card-subtitle>Preço: R$ {{ item.preco }}</v-card-subtitle>
            <v-card-actions>
              <v-btn
                variant="outlined"
                color="red"
                @click="remove(index)"
              >
                Remover
              </v-btn>

              <v-btn
                variant="outlined"
                color="blue"
                @click="add(index)"
              >
                Adicionar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <br><br>
      <hr>
      <br><br>
      <h1>Recibo</h1>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Produtos
            </th>
            <th class="text-left">
              Quantidade
            </th>
            <th class="text-left">
              SubTotal
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in carinho"
            :key="item.id"
          >
            <td>{{ item.nome }}</td>
            <td>{{ item.quantidade }}</td>
            <td>R$ {{ calcularSubtotal(item) }}</td>
          </tr>
          <v-divider />
          <v-row>
            <v-col class="text-right">
              <h3>Total: {{ calcularTotal() }}</h3>
            </v-col>
          </v-row>
        </tbody>
      </v-table>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';

const hardwareItems = ref([
  { id: 1, nome: 'Processador Intel i5', preco: '620.19', quantidade: 1 },
  { id: 2, nome: 'Placa de Vídeo NVIDIA RTX 1650', preco: '1300.50', quantidade: 1 },
  { id: 3, nome: 'SSD Samsung 1TB', preco: '359.50', quantidade: 1 },
  { id: 4, nome: 'Memória Ram 16GB 3666htz', preco: '300', quantidade: 1 },
]);

const carinho = ref([]);

function add(index) {
  const selectedItem = hardwareItems.value[index];
  const itemInCart = carinho.value.find((item) => item.id === selectedItem.id);

  if (itemInCart) {
    itemInCart.quantidade++;
  } else {
    carinho.value.push({ ...selectedItem });
  }
}

function remove(index) {
  const selectedItem = hardwareItems.value[index];
  const itemInCart = carinho.value.find((item) => item.id === selectedItem.id);

  if (itemInCart && itemInCart.quantidade > 1) {
    itemInCart.quantidade--;
  } else {
    const itemIndex = carinho.value.findIndex((item) => item.id === selectedItem.id);
    carinho.value.splice(itemIndex, 1);
  }
}

function calcularSubtotal(item) {
  const subtotal = item.quantidade * parseFloat(item.preco);
  return formatarNumero(subtotal);
}

function formatarNumero(numero) {
  return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcularTotal() {
  return formatarNumero(
    carinho.value.reduce((total, item) => {
      const subtotal = item.quantidade * parseFloat(item.preco);
      return total + subtotal;
    }, 0)
  );
}
</script>
