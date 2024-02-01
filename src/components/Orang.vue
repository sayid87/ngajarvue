<template >
    <div> Halo, nama saya {{ nama }}, umur saya tahun depan adalah {{ umur + 1 }} Tahun</div>
</template>
<script setup>
defineProps({
    nama: "",
    umur: 0
})
</script>
<style scoped></style>


