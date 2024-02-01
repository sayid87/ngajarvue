<script setup>
import { baseUrl } from '@/config';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const isLoading = ref(false)
const dataMember = ref(null)

const loadData = async () => {
    isLoading.value = true
    try {
        const response = await axios.get(`${baseUrl}users`)
        const hasil = response.data
        dataMember.value = hasil.data
    } catch (error) {
        alert(error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    loadData()
})

const hapus = async (id, nama) => {
    const yakin = confirm(`Apakah Anda yakin mau menghapus ${nama} ?`)
    if (yakin) {
        isLoading.value = true
        try {
            const response = await axios.delete(`${baseUrl}users/${id}`)
            const hasil = response.data
            alert(hasil.pesan)
            loadData()
        } catch (error) {
            alert(error)
        } finally {
            isLoading.value = false
        }
    }
}
</script>

<template>
    <div v-if="isLoading || dataMember == null">Loading...</div>
    <div v-else>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Telp</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dt, index) in dataMember">
                    <td>{{ index + 1 }}.</td>
                    <td>{{ dt.nama }}</td>
                    <td>{{ dt.email }}</td>
                    <td>{{ dt.telp }}</td>
                    <td>
                        <RouterLink :to="`/ubah/${dt.id}`" class="btn btn-info">Ubah</RouterLink> &nbsp;
                        <button class="btn btn-danger" @click="() => { hapus(dt.id, dt.nama) }">Hapus</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>
