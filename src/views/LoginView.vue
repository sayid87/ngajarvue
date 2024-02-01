<script  setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from "@vuelidate/validators"
import { useRouter } from 'vue-router';
import axios from 'axios';
import { baseUrl } from '@/config';
import { useLoginStore } from '@/stores/login';
const formData = ref({
    email: "",
    password: "",
})

const loginForm = ref(null)

const isLoading = ref(false)

const router = useRouter()

const validations = {
    email: {
        required: helpers.withMessage('Email Wajib diisi', required),
        email: helpers.withMessage('Format Email tidak valid', email)
    },
    password: {
        required: helpers.withMessage('Password Wajib diisi', required),
    },
}
const v$ = useVuelidate(validations, formData);



const submitForm = async (e) => {
    e.preventDefault()

    const result = await v$.value.$validate();
    if (result) {
        isLoading.value = true
        try {
            const data = new FormData(loginForm.value)
            const response = await axios.post(`${baseUrl}login`, data)
            const hasil = response.data
            alert(hasil.pesan)
            if (hasil.sukses == 1) {
                //
                const loginStore = useLoginStore()
                localStorage.setItem("loginUser", JSON.stringify(hasil.data))
                loginStore.setLoginUser(hasil.data)
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
    <form @submit="submitForm" ref="loginForm">
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control" id="email" placeholder="Email Anda" v-model="formData.email"
                name="txt_email">
            <div v-for="(error, index) in v$.email.$errors" :key="index">
                <span class="text-danger fw-bold"> {{ error.$message }}</span>
            </div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password Anda"
                v-model="formData.password" name="txt_password">
            <div v-for="(error, index) in v$.password.$errors" :key="index">
                <span class="text-danger fw-bold"> {{ error.$message }}</span>
            </div>
        </div>
        <div class="mb-3">
            <div v-if="isLoading">Loading...</div>
            <div v-else>
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
        </div>
    </form>
</template>

<style  scoped></style>
