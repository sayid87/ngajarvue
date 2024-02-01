<script  setup>
import { computed, onMounted, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, numeric, minLength, maxLength, sameAs } from "@vuelidate/validators"
import axios from 'axios';
import { baseUrl } from '@/config'
import { useRouter } from 'vue-router';

const router = useRouter()

const formData = ref({
    email: "",
    password: "",
    ulangi: "",
    nama: "",
    telp: "",
})



const registerForm = ref(null)

const isLoading = ref(false)

const validations = {
    email: {
        required: helpers.withMessage('Email Wajib diisi', required),
        email: helpers.withMessage('Format Email tidak valid', email)
    },
    password: {
        required: helpers.withMessage('Password Wajib diisi', required),
    },
    nama: {
        required: helpers.withMessage('Nama Wajib diisi', required),
    },
    telp: {
        required: helpers.withMessage('Telp Wajib diisi', required),
        numeric: helpers.withMessage('Telp Wajib diisi dengan angka', numeric),
        min: helpers.withMessage('Telp Wajib diisi minimal 8 angka', minLength(8)),
        max: helpers.withMessage('Telp Wajib diisi maksimal 12 angka', maxLength(12))
    },
    ulangi: {
        required: helpers.withMessage('Ulangi Password Wajib diisi', required),
        sameAs: helpers.withMessage('Ulangi Password Wajib diisi sama dengan Password', sameAs(computed(() => formData.value.password)))
    },
}
const v$ = useVuelidate(validations, formData);


const submitForm = async (e) => {
    e.preventDefault()

    const result = await v$.value.$validate();
    if (result) {
        //console.log();
        try {
            const data = new FormData(registerForm.value)
            const response = await axios.post(`${baseUrl}register`, data)
            const hasil = response.data
            alert(hasil.pesan)
            if (hasil.sukses == 1) {

                router.push("/login")
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
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control" id="email" placeholder="Email Anda" name="txt_email"
                v-model="formData.email">
            <div v-for="(error, index) in v$.email.$errors" :key="index">
                <span class="text-danger fw-bold"> {{ error.$message }}</span>
            </div>
        </div>
        <div class="mb-3">

            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password Anda" name="txt_password"
                v-model="formData.password">
            <div v-for="(error, index) in v$.password.$errors" :key="index">
                <span class="text-danger fw-bold"> {{ error.$message }}</span>
            </div>
        </div>
        <div class="mb-3">

            <label for="ulangi" class="form-label">Ulangi Password</label>
            <input type="password" class="form-control" id="ulangi" placeholder="Ulangi Password Anda" name="txt_ulangi"
                v-model="formData.ulangi">
            <div v-for="(error, index) in v$.ulangi.$errors" :key="index">
                <span class="text-danger fw-bold"> {{ error.$message }}</span>
            </div>
        </div>
        <div class="mb-3">
            <div v-if="isLoading">Loading...</div>
            <div v-else>
                <button type="submit" class="btn btn-primary">Daftar</button>
            </div>

        </div>
    </form>
</template>

<style  scoped></style>
