<script setup>
import Orang from '@/components/Orang.vue';
import { ref } from 'vue';

const angka = ref(0)

const tambah = () => {
  angka.value = angka.value + 1
}

const kurang = () => {
  angka.value = angka.value - 1
}
</script>

<template>
  Angka: {{ angka }}
  <button class="btn btn-primary" @click="tambah">Tambah</button>
  <button class="btn btn-danger" @click="kurang">Kurang</button>
  <Orang nama="Andi" :umur="20" />
</template>
