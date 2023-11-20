<template>
  <v-sheet class="custom-sheet">
    <h3 class="ml-1 mt-1 mb-5">Cadastro de Categorias</h3>
    <v-card class="custom-card">
      <v-col md="6">
        <v-text-field
          class="ma-2"
          v-model="categoriaModel.nome"
          :min="4"
          label="Nome da Categoria"
          ref="textField"
        ></v-text-field>
      </v-col>
      <br />
      <v-row justify="start" class="ml-2">
        <v-btn color="success" class="btn-style" @click="save"> Salvar </v-btn>
      </v-row>
      <br />
      <v-divider />
      <v-data-table :headers="headers" :items="categorias" class="mt-4">
      </v-data-table>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import Categoria from "~/types/categoria";
import axios from "axios";
const headers = [
  { title: "Nome", align: "center", key: "nome" },
  { title: "Id Categoria", align: "center", key: "idCategoria" },
];

const categoriaModel = ref<Categoria>(new Categoria());
const categorias = ref([]);

const save = async () => {
  try {
    const response = await axios.post(
      "https://localhost:7011/Categoria",
      categoriaModel.value
    );

    if (response.status === 200) {
      categoriaModel.value = new Categoria();
      await getCategorias();
    }
  } catch {
    alert("Erro ao salvar a Categoria.");
  }
};

const getCategorias = async () => {
  const responseGetCategorias = await axios.get(
    "https://localhost:7011/Categoria"
  );
  categorias.value = responseGetCategorias.data;
};

onMounted(async () => {
  await getCategorias();
});
</script>

<style scoped>
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

.custom-sheet {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: normal;
  background-color: #212121;
  color: #fff;
  border: 1px solid #323232;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
  margin: auto;
}
</style>
