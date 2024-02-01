import { defineStore } from "pinia";

export const useLoginStore = defineStore("loginUser", {
    state: () => {
        return {
            dataUser: {}
        }
    },
    actions: {
        setLoginUser(dataUser) {
            this.dataUser.value = dataUser
        },
        clearLoginUser() {
            this.dataUser.value = null
        }
    }
})