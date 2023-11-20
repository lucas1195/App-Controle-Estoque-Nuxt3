<template>
  <v-card class="custom-card">
    <v-form class="pa-2" ref="form">
      <h3 class="ml-1 mt-1 mb-5">Cadastro de Produtos</h3>
      <v-card class="custom-card">
        <v-row>
          <v-text-field
            class="ma-2"
            v-model="produtoModel.nome"
            :min="4"
            label="Nome Produto"
            ref="textField"
          ></v-text-field>

          <v-text-field
            class="ma-2"
            v-model="produtoModel.descricao"
            label="Descrição"
            required
          ></v-text-field>
        </v-row>

        <v-row>
          <v-text-field
            class="ma-2"
            v-model="produtoModel.preco"
            :min="1"
            :type="'number'"
            label="Preço"
          ></v-text-field>
          <v-text-field
            class="ma-2"
            v-model="produtoModel.quantidade"
            :min="1"
            :type="'number'"
            label="Quantidade"
          ></v-text-field>
        </v-row>
        <v-col md="6">
          <v-combobox
            v-model="produtoModel.idCategoria"
            label="Categorias"
            name="model_categoria"
            item-title="nome"
            item-value="idCategoria"
            :items="categorias"
            :return-object="false"
            class="mt-2"
          ></v-combobox>
        </v-col>
      </v-card>
    </v-form>
    <v-divider class="mb-3" />
    <v-row justify="start" class="ml-2">
      <v-btn
        v-if="produtoSelecionadoIndex == null"
        color="success"
        class="btn-style"
        @click="save"
      >
        Salvar
      </v-btn>

      <v-btn
        color="success"
        class="btn-style"
        @click="updateProduto"
        v-if="produtoSelecionadoIndex != null"
      >
        Salvar Alterações
      </v-btn>

      <v-btn color="error" class="btn-style" @click="reset">
        Limpar Formulário
      </v-btn>

      <!--<v-btn color="warning" class="btn-style" @click="recarregarGrid">
          Recarregar Grid
        </v-btn>-->
    </v-row>
    <br />

    <v-data-table :headers="headers" :items="produtos">
      <template v-slot:item.acoes="{ item, index }">
        <div>
          <v-btn
            color="error"
            variant="outlined"
            class="mr-2"
            density="comfortable"
            @click.prevent="deleteProduto(item)"
            >Excluir</v-btn
          >
          <v-btn
            color="success"
            variant="outlined"
            density="comfortable"
            @click.prevent="editProduto(item)"
            >Editar</v-btn
          >
        </div>
      </template>
      <template v-slot:item.preco="{ item, index }">
        <div>
          {{ `R$ ${item.preco}` }}
        </div>
      </template>
      <template v-slot:item.idCategoria="{ item, index }">
        <div>
          {{ getCategoriaById(item) }}
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import Produto from "~/types/produto";
const headers = [
  { title: "Nome", key: "nome" },
  { title: "Descrição", key: "descricao" },
  { title: "Preço", key: "preco", type: "number" },
  { title: "Quantidade", key: "quantidade" },
  { title: "Categoria", key: "idCategoria" },
  { title: "Ações", align: "center", key: "acoes" },
];

const produtos = ref([]);
const produtoSelecionadoIndex = ref(null);
const produtoModel = ref<Produto>(new Produto());
const categorias = ref([]);

const save = async () => {
  try {
    const response = await axios.post(
      "https://localhost:7011/Produto",
      produtoModel.value
    );

    if (response.status === 200) {
      await getProdutos();
    }
  } catch {
    alert("Erro ao salvar o Produto.");
  }
};

const deleteProduto = async (item: any) => {
  await axios.get(`https://localhost:7011/Produto/${item.id}`);
};

const editProduto = (item: any) => {
  produtoModel.value = item;
  produtoSelecionadoIndex.value = item.id;
};

const updateProduto = async () => {
  try {
    const index = produtoSelecionadoIndex.value;

    await axios.put(
      `https://localhost:7011/Produto/${index}`,
      produtoModel.value
    );

    produtoSelecionadoIndex.value = null;
    reset();
  } catch {
    alert("Erro ao Editar o Produto.");
  }
};

const reset = () => {
  produtoModel.value = new Produto();
};

const getCategoriaById = (item: any): string => {
  const idCategoria = item.idCategoria;

  switch (idCategoria) {
    case 3:
      return "Processadores";
    case 4:
      return "Placa Mãe";
    case 5:
      return "Memória RAM";
    case 6:
      return "SSD";
    case 7:
      return "Placa de Vídeo";
    case 8:
      return "Fontes";
    default:
      return "Categoria Desconhecida";
  }
};

const getProdutos = async () => {
  const responseGet = await axios.get("https://localhost:7011/Produto");
  produtos.value = responseGet.data;
};

onMounted(async () => {
  await getProdutos();

  const responseGetCategorias = await axios.get(
    "https://localhost:7011/Categoria"
  );
  categorias.value = responseGetCategorias.data;
});
</script>

<style scoped>
.btn-style {
  border-radius: 0.6rem;
  margin: 0.6rem;
}

.custom-card {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: normal;
  background-color: #212121;
  color: #fff;
  border: 1px solid #323232;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
}
</style>
