<script setup>
import { computed, onMounted, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, numeric, minLength, maxLength, sameAs } from "@vuelidate/validators"
import axios from 'axios';
import { baseUrl } from '@/config'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const formData = ref({
    nama: "",
    telp: "",
})

const detailData = ref(null)

const registerForm = ref(null)

const isLoading = ref(false)

const validations = {

    nama: {
        required: helpers.withMessage('Nama Wajib diisi', required),
    },
    telp: {
        required: helpers.withMessage('Telp Wajib diisi', required),
        numeric: helpers.withMessage('Telp Wajib diisi dengan angka', numeric),
        min: helpers.withMessage('Telp Wajib diisi minimal 8 angka', minLength(8)),
        max: helpers.withMessage('Telp Wajib diisi maksimal 12 angka', maxLength(12))
    },

}
const v$ = useVuelidate(validations, formData);

const loadData = async () => {
    isLoading.value = true
    try {
        const response = await axios.get(`${baseUrl}users/${route.params.id}`)
        const hasil = response.data
        detailData.value = hasil.data
        formData.value.nama = detailData.value.nama
        formData.value.telp = detailData.value.telp
    } catch (error) {
        alert(error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => { loadData() })

const submitForm = async (e) => {
    e.preventDefault()

    const result = await v$.value.$validate();
    if (result) {
        console.log();
        try {
            const data = new FormData(registerForm.value)
            const response = await axios.post(`${baseUrl}users/${route.params.id}`, data)
            const hasil = response.data
            alert(hasil.pesan)
            if (hasil.sukses == 1) {

                router.push("/home")
            }
        } catch (error) {
            alert(error)
        } finally {
            isLoading.value = false
        }

    }
}
</script>

<template>
    <div v-if="isLoading || detailData == null">Loading...</div>
    <div v-else>
        <form @submit="submitForm" ref="registerForm">
            <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input type="text" class="form-control" id="nama" placeholder="Nama Anda" name="txt_nama"
                    v-model="formData.nama">
                <div v-for="(error, index) in v$.nama.$errors" :key="index">
                    <span class="text-danger fw-bold"> {{ error.$message }}</span>
                </div>
            </div>
            <div class="mb-3">
                <label for="telp" class="form-label">Telp</label>
                <input type="text" class="form-control" id="nama" placeholder="Telp Anda" name="txt_telp"
                    v-model="formData.telp">
                <div v-for="(error, index) in v$.telp.$errors" :key="index">
                    <span class="text-danger fw-bold"> {{ error.$message }}</span>
                </div>
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary">Ubah</button>
            </div>
        </form>
    </div>
</template>

<style  scoped></style>
